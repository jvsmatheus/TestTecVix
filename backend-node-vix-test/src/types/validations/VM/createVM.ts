import { z } from "zod";

const EVMStatus = z.enum(["RUNNING", "STOPPED", "PAUSED"]);
const ETaskLocation = z.enum(["bre_barueri", "usa_miami"]);
// Password validation regex
export const passwordRegex = {
  numbers: /(?=.*\d.*\d)/,
  lowercase: /(?=.*[a-z].*[a-z])/,
  uppercase: /(?=.*[A-Z].*[A-Z])/,
  special:
    /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
};

export const vMCreatedSchema = z.object({
  vmName: z.string().optional(),
  vCPU: z.number().min(1, "vCPU must be at least 1"),
  ram: z.number().min(1, "RAM must be at least 1 GB"),
  disk: z.number().min(20, "Disk must be at least 20 GBs"),
  hasBackup: z.boolean().optional().default(false),
  pass: z
    .string()
    .regex(passwordRegex.numbers, "At least two numbers required")
    .regex(passwordRegex.lowercase, "At least two lowercase letters required")
    .regex(passwordRegex.uppercase, "At least two uppercase letters required")
    .regex(passwordRegex.special, "At least two special characters required")
    .min(8, "Password must be at least 8 characters long"),
  location: ETaskLocation.optional(),
  idBrandMaster: z.number().nullable().optional(),
  status: EVMStatus.optional(),
  os: z.string().optional(),
});

export type TVMCreate = z.infer<typeof vMCreatedSchema>;
