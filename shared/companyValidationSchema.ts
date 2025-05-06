
import { z } from "zod";

// Step 1: Business Type Validation
export const businessTypeSchema = z.object({
  typeOfBusiness: z.string().min(1, "Business type is required"),
  businessLocation: z.string().min(1, "Business location is required"),
});

// Step 2: Business Details Validation
export const businessDetailsSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  gstRegistrationType: z.string().min(1, "GST registration type is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  businessPAN: z.string().min(10, "Valid PAN number is required"),
  businessTAN: z.string().min(10, "Valid TAN number is required"),
  address: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
});

// Step 3: Representative Validation
export const representativeSchema = z.object({
  representativeName: z.string().min(2, "Representative name is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
});

// Step 4: Public Details Validation
export const publicDetailsSchema = z.object({
  website: z.string().url("Invalid website URL").optional(),
  supportEmail: z.string().email("Invalid support email").optional(),
  supportPhone: z.string().min(10, "Valid support phone number is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});
