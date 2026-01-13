import { z } from "zod";

export const registerSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long"),
  email: z.string().email("Invalid email"),
  username: z.string().min(1, "Username is required"),
});

export type Tregister = z.infer<typeof registerSchema>;
