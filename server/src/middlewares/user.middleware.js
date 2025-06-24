import { z } from 'zod';

export const signupSchema = z.object({
  username: z
    .string().trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be no more than 20 characters" })
    .regex(/^[A-Za-z]+$/, { message: "Username must only contain letters" }),

  email: z
    .string()
    .email({ message: "Invalid email format" })
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, {
      message: "Invalid email structure"
    }),

  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(20, { message: "Password must be no more than 20 characters" })
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, {
      message: "Invalid email structure"
    }),

  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" })
    .max(20, { message: "Password must be no more than 20 characters" })
});

