
import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  identifier: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  token: z.string(),
  email: z.string(),
  action: z.object({
    ispartner: z.boolean(),
    isverified: z.boolean(),
    issuperadmin: z.boolean(),
    issuspended: z.boolean(),
  }),
  userid: z.string(),
});

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

// OTP Verification Schema
export const otpVerificationSchema = z.object({
  verificationcode: z.string().length(6, "OTP must be 6 digits"),
});

// Register Schema
export const registerSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyname: z.string().min(2, "Company name is required"),
  ispartner: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type OTPVerificationInput = z.infer<typeof otpVerificationSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
