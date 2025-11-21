import z from "zod";

export const settingsSchema = z.object({
  businessName: z.string().min(2, "businessNameRequired"),
  businessTypes: z.array(z.string()).min(1, "chooseCategory"),
  region: z.string().min(2, "regionRequired"),
  district: z.string().min(2, "districtRequired"),
  street: z.string().min(2, "streetRequired"),
  landmark: z.string().optional(),
  phone: z.string().regex(/^(?:\+255|0)[67]\d{8}$/, "invalid_phone"),
  
  // Social media (optional)
  facebook: z.string().url("urlInvalid").optional().or(z.literal("")),
  instagram: z.string().url("urlInvalid").optional().or(z.literal("")),
  tiktok: z.string().url("urlInvalid").optional().or(z.literal("")),
  whatsapp: z.string().url("urlInvalid").optional().or(z.literal("")),

  description: z.string().min(10, "descriptionMin"),
  tinNumber: z.string().length(9, "tinRequired"),
  
  // Store images
  storeLogo: z.string().optional(),
  storeFrontImage: z.string().optional(),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>
