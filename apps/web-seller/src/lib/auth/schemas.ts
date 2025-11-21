import * as z from "zod"

// Regex for Tanzania: Starts with +255 or 0, followed by 6 or 7, then 8 digits
// Examples: 0712345678 or +255612345678
const tzPhoneRegex = /^(?:\+255|0)[67]\d{8}$/;

export const signUpSchema = z.object({
  fullName: z.string().min(2, { message: "min_2_chars" }),
  phone: z.string().regex(tzPhoneRegex, { message: "invalid_phone" }),
  password: z.string().min(8, { message: "min_8_chars" }),
})

export const signInSchema = z.object({
  login: z.string().min(1, { message: "login_required" }),
  password: z.string().min(1, { message: "password_required" }),
})

export const verifySchema = z.object({
  otp: z.string().length(6, { message: "otp_required" }),
})

export const forgotPasswordSchema = z.object({
  login: z.string().min(1, { message: "login_required" }),
})

export const resetPasswordSchema = z.object({
  otp: z.string().length(6, { message: "otp_required" }),
  newPassword: z.string().min(8, { message: "min_8_chars" }),
  confirmPassword: z.string().min(8, { message: "min_8_chars" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "passwords_mismatch",
  path: ["confirmPassword"],
})