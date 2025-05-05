import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
};

const simulateEmailOTP = (email: string, otp: string) => {
  console.log(`[TEST ONLY] OTP for ${email}: ${otp}`);
};

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { userName, companyName, password, confirmPassword, phone, email } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + OTP_EXPIRY);

      const user = await storage.createUser({
        userName,
        companyName,
        email,
        phone,
        password: hashedPassword,
        isVerified: false,
        otp,
        otpExpires
      });

      simulateEmailOTP(email, otp);

      res.status(201).json({ message: "Registration successful. Please verify your email." });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "An error occurred during registration" });
    }
  });

  app.post("/api/auth/verify-otp", async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user = await storage.getUserByEmail(email);
      if (!user || !user.otp || !user.otpExpires) {
        return res.status(400).json({ message: "Invalid verification request" });
      }

      if (new Date() > new Date(user.otpExpires)) {
        return res.status(400).json({ message: "OTP has expired" });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      await storage.updateUser(user.id, {
        isVerified: true,
        otp: null,
        otpExpires: null
      });

      res.json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ message: "An error occurred during verification" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await storage.getUserByEmail(email);
      if (!user || !user.isVerified) {
        return res.status(401).json({ message: "Invalid credentials or account not verified" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user.id);

      await storage.updateUserLastLogin(user.id);

      res.json({
        token,
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          companyName: user.companyName
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  });

  app.post("/api/auth/forgot-password", async (req, res) => {
    try {
      const { email } = req.body;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + OTP_EXPIRY);

      await storage.updateUser(user.id, { otp, otpExpires });

      simulateEmailOTP(email, otp);

      res.json({ message: "Password reset OTP sent to your email" });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  });

  app.post("/api/auth/verify-forgot-otp", async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user = await storage.getUserByEmail(email);
      if (!user || !user.otp || !user.otpExpires) {
        return res.status(400).json({ message: "Invalid verification request" });
      }

      if (new Date() > new Date(user.otpExpires)) {
        return res.status(400).json({ message: "OTP has expired" });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      res.json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  });

  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { email, newPassword, confirmPassword, otp } = req.body;

      if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user || !user.otp || user.otp !== otp) {
        return res.status(400).json({ message: "Invalid reset request" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await storage.updateUser(user.id, {
        password: hashedPassword,
        otp: null,
        otpExpires: null
      });

      res.json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  });

  app.post("/api/auth/change-password", authenticateToken, async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.userId;

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid current password" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await storage.updateUser(userId, { password: hashedPassword });

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({ message: "An error occurred" });
    }
  });

  // Favorites routes
  app.get("/api/favorites", async (req, res) => {
    try {
      // In a real application, you would extract the user ID from the authenticated session
      const userId = 1; // Mock user ID

      const favorites = await storage.getFavorites(userId);

      res.json(favorites);
    } catch (error) {
      console.error("Get favorites error:", error);
      res.status(500).json({ message: "An error occurred while fetching favorites" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      // In a real application, you would extract the user ID from the authenticated session
      const userId = 1; // Mock user ID

      const validatedData = insertFavoriteSchema.parse({
        ...req.body,
        userId
      });

      const favorite = await storage.createFavorite(validatedData);

      res.status(201).json(favorite);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Create favorite error:", error);
      res.status(500).json({ message: "An error occurred while creating favorite" });
    }
  });

  app.delete("/api/favorites/:id", async (req, res) => {
    try {
      const favoriteId = parseInt(req.params.id);

      if (isNaN(favoriteId)) {
        return res.status(400).json({ message: "Invalid favorite ID" });
      }

      // In a real application, you would extract the user ID from the authenticated session
      const userId = 1; // Mock user ID

      await storage.deleteFavorite(favoriteId, userId);

      res.json({ message: "Favorite deleted successfully" });
    } catch (error) {
      console.error("Delete favorite error:", error);
      res.status(500).json({ message: "An error occurred while deleting favorite" });
    }
  });

  // Notifications routes
  app.get("/api/notifications", async (req, res) => {
    try {
      // In a real application, you would extract the user ID from the authenticated session
      const userId = 1; // Mock user ID

      const notifications = await storage.getNotifications(userId);

      res.json(notifications);
    } catch (error) {
      console.error("Get notifications error:", error);
      res.status(500).json({ message: "An error occurred while fetching notifications" });
    }
  });

  app.post("/api/notifications/mark-read", async (req, res) => {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids)) {
        return res.status(400).json({ message: "Invalid notification IDs" });
      }

      // In a real application, you would extract the user ID from the authenticated session
      const userId = 1; // Mock user ID

      await storage.markNotificationsAsRead(ids, userId);

      res.json({ message: "Notifications marked as read" });
    } catch (error) {
      console.error("Mark notifications as read error:", error);
      res.status(500).json({ message: "An error occurred while marking notifications as read" });
    }
  });

  app.post("/api/notifications/mark-all-read", async (req, res) => {
    try {
      // In a real application, you would extract the user ID from the authenticated session
      const userId = 1; // Mock user ID

      await storage.markAllNotificationsAsRead(userId);

      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Mark all notifications as read error:", error);
      res.status(500).json({ message: "An error occurred while marking all notifications as read" });
    }
  });

  // Company routes
  app.patch("/api/company", async (req, res) => {
    try {
      // In a real application, you would extract the user ID and company ID from the authenticated session
      const userId = 1; // Mock user ID
      const companyId = 1; // Mock company ID

      const { companyName, industry, address, taxId } = req.body;

      const updates: { [key: string]: any } = {};

      if (companyName) updates.name = companyName;
      if (industry) updates.industry = industry;
      if (address) updates.address = address;
      if (taxId) updates.taxId = taxId;

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }

      await storage.updateCompany(companyId, userId, updates);

      res.json({ message: "Company updated successfully" });
    } catch (error) {
      console.error("Company update error:", error);
      res.status(500).json({ message: "An error occurred while updating company" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}