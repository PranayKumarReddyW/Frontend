import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  branch: z.string().min(1, "Branch is required"),
  passedOutYear: z.string().min(1, "Passout year is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
