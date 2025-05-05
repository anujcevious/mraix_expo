import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertFavoriteSchema, insertNotificationSchema } from "@shared/schema";
import { createHash } from "crypto";

// Helper function to hash passwords
const hashPassword = (password: string): string => {
  return createHash("sha256").update(password).digest("hex");
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      const hashedPassword = hashPassword(password);
      if (user.password !== hashedPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Update last login
      await storage.updateUserLastLogin(user.id);
      
      // Create a token (this is simplified - in a real app use JWT)
      const token = `token_${user.id}_${Date.now()}`;
      
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  });
  
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      // Hash the password
      const hashedPassword = hashPassword(validatedData.password);
      
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword
      });
      
      // For testing purposes, generate a "random" OTP
      const testOTP = '123456';
      console.log(`[TEST ONLY] OTP for ${validatedData.email}: ${testOTP}`);
      
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Registration error:", error);
      res.status(500).json({ message: "An error occurred during registration" });
    }
  });
  
  app.post("/api/auth/verify-otp", async (req, res) => {
    try {
      const { email, otp } = req.body;
      
      if (!otp || otp.length !== 6) {
        return res.status(400).json({ message: "Invalid OTP format" });
      }
      
      console.log(`[TEST ONLY] Verifying OTP for ${email}: ${otp}`);
      
      // This is a testing implementation - accept any 6-digit OTP
      // In a real application, you would validate the OTP against what was sent
      if (/^\d{6}$/.test(otp)) {
        console.log(`[TEST ONLY] OTP verification successful`);
        return res.json({ message: "OTP verified successfully" });
      } else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ message: "An error occurred during verification" });
    }
  });
  
  app.post("/api/auth/resend-otp", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      // For testing purposes, generate a fixed OTP
      const testOTP = '123456';
      console.log(`[TEST ONLY] New OTP for ${email}: ${testOTP}`);
      
      res.json({ message: "New OTP sent successfully" });
    } catch (error) {
      console.error("Resend OTP error:", error);
      res.status(500).json({ message: "An error occurred while resending OTP" });
    }
  });
  
  app.post("/api/auth/reset-password", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      
      const user = await storage.getUserByEmail(email);
      
      if (!user) {
        // Don't reveal that the email doesn't exist for security reasons
        return res.json({ message: "If your email exists in our system, you will receive a password reset link" });
      }
      
      // In a real application, you would generate a reset token and send an email
      
      res.json({ message: "If your email exists in our system, you will receive a password reset link" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "An error occurred during password reset" });
    }
  });
  
  app.patch("/api/auth/profile", async (req, res) => {
    try {
      // In a real application, you would extract the user ID from the authenticated session
      const userId = 1; // Mock user ID
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { name, email, bio, phone } = req.body;
      
      const updates: Partial<typeof user> = {};
      
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (bio) updates.bio = bio;
      if (phone) updates.phone = phone;
      
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }
      
      const updatedUser = await storage.updateUser(userId, updates);
      
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = updatedUser;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "An error occurred while updating profile" });
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
