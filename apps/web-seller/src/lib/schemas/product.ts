// src/lib/schemas/product.ts
import * as z from "zod"

export const productSchema = z.object({
  product_name: z.string().min(5, { message: "product_name_min_5" }),
  product_type: z.string().min(1, { message: "product_type_required" }),
  product_brand: z.string().min(1, { message: "product_brand_required" }),
  price: z.number().min(1000, { message: "price_min_1000" }),
  stock: z.number().min(1, { message: "stock_min_1" }),
  description: z.string().min(20, { message: "description_min_20" }),
  product_images: z.array(z.string()).min(1, { message: "product_images_required" }),
  condition: z.string().min(1, { message: "condition_required" }),
})

export type ProductFormValues = z.infer<typeof productSchema>