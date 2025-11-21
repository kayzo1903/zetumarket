"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { UploadCloud, X } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@seller/components/ui/form"
import { Input } from "@seller/components/ui/input"
import { Textarea } from "@seller/components/ui/textarea"
import { Button } from "@seller/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@seller/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@seller/components/ui/select"

import { businessTypes, ProductConditionsList, productBrands } from "@seller/lib/productsList"
import { ProductFormValues, productSchema } from "@seller/lib/schemas/product"

// LOCAL UPLOADED TERMS FILE (deployment pipeline should convert to served URL)
const TERMS_LOCAL_PATH = "/mnt/data/muuza terms and conditions.docx"
const MAX_IMAGES = 4

export default function AddProduct() {
  const t = useTranslations("Products")
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<{ id: string | number; name: string; slug: string }[]>([])

  // FIX: Explicitly type useForm with ProductFormValues
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: "",
      product_type: "",
      product_brand: "",
      price: 100,
      stock: 1,
      description: "",
      product_images: [],
      condition: "",
    },
  })

  // Example: fetch categories (optional). If your product types are dynamic, fetch them here.
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
        if (!res.ok) return
        const data = await res.json()
        setCategories(data)
      } catch (e) {
        // ignore: fallback to businessTypes
      }
    }
    loadCategories()
  }, [])

  // Keep form field in sync with images state
  useEffect(() => {
    form.setValue("product_images", images)
  }, [images, form])

  // FIX: Remove the explicit type annotation since it's now inferred from useForm
  async function onSubmit(values: ProductFormValues) {
    setLoading(true)
    try {
      // Prepare payload. In production you should upload files to storage first then send urls.
      const payload = {
        ...values,
        // ensure condition uses canonical lower-case values (option B)
        condition: values.condition,
      }

      // Example POST to product-service
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        // handle error
        console.error("Failed to create product", await res.text())
        return
      }

      // success
      form.reset()
      setImages([])
      // optionally navigate / show toast
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    // Calculate how many more images we can add
    const remainingSlots = MAX_IMAGES - images.length
    if (remainingSlots <= 0) return

    // Take only the number of files that fit within the limit
    const filesToAdd = Array.from(files).slice(0, remainingSlots)

    // In dev, createObjectURL is OK for preview. In production upload to S3/Cloudinary/Supabase and store real URLs.
    const newPreviewUrls = filesToAdd.map((f) => URL.createObjectURL(f))
    setImages((prev) => [...prev, ...newPreviewUrls])

    // Clear the input so the same file can be selected again
    event.target.value = ''
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const getErrorMessage = (fieldName?: keyof ProductFormValues) => {
    if (!fieldName) return undefined
    const error = form.formState.errors[fieldName]
    if (!error?.message) return undefined
    // msg is the key from zod messages; we translate if available
    return t(`errors.${error.message}`)
  }

  const canAddMoreImages = images.length < MAX_IMAGES

  return (
    <div className="flex min-h-screen items-center justify-center p-4 transition-colors duration-300">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("add_product")}</CardTitle>
          <CardDescription className="text-center">{t("add_product_description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Product Name */}
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("product_name_label")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("product_name_placeholder")} {...field} />
                    </FormControl>
                    <FormMessage>{getErrorMessage("product_name")}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Type / Brand / Condition */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Product Type: prefer dynamic categories if available */}
                <FormField
                  control={form.control}
                  name="product_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("product_type_label")}</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("product_type_placeholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.length > 0
                            ? categories.map((c) => (
                                <SelectItem key={c.id} value={c.slug}>
                                  {c.name}
                                </SelectItem>
                              ))
                            : businessTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>{getErrorMessage("product_type")}</FormMessage>
                    </FormItem>
                  )}
                />

                {/* Brand */}
                <FormField
                  control={form.control}
                  name="product_brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("product_brand_label")}</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("product_brand_placeholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productBrands.map((brand) => (
                            <SelectItem key={brand} value={brand}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>{getErrorMessage("product_brand")}</FormMessage>
                    </FormItem>
                  )}
                />

                {/* Condition (Option B canonical values) */}
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("condition_label")}</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("condition_placeholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ProductConditionsList.map(({ value, label }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage>{getErrorMessage("condition")}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("price_label")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder={t("price_placeholder")} 
                          {...field} 
                          onChange={e => field.onChange(e.target.valueAsNumber)}
                        />
                      </FormControl>
                      <FormMessage>{getErrorMessage("price")}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("stock_label")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder={t("stock_placeholder")} 
                          {...field} 
                          onChange={e => field.onChange(e.target.valueAsNumber)}
                        />
                      </FormControl>
                      <FormMessage>{getErrorMessage("stock")}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              {/* Images */}
              <FormField
                control={form.control}
                name="product_images"
                render={() => (
                  <FormItem>
                    <FormLabel>{t("images_label")}</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          canAddMoreImages 
                            ? "border-gray-300 hover:border-gray-400 cursor-pointer" 
                            : "border-gray-200 cursor-not-allowed"
                        }`}>
                          <UploadCloud className={`mx-auto h-8 w-8 ${
                            canAddMoreImages ? "text-gray-400" : "text-gray-300"
                          }`} />
                          <div className="mt-2">
                            {canAddMoreImages ? (
                              <label htmlFor="image-upload" className="cursor-pointer">
                                <span className="text-sm font-medium text-primary hover:underline">
                                  {t("upload_images")}
                                </span>
                                <input
                                  id="image-upload"
                                  type="file"
                                  multiple
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleImageUpload}
                                />
                              </label>
                            ) : (
                              <span className="text-sm font-medium text-gray-500">
                                {t("max_images_reached")}
                              </span>
                            )}
                            <p className="text-xs text-muted-foreground mt-1">
                              {t("upload_images_description", { max: MAX_IMAGES })}
                              {images.length > 0 && (
                                <span className="block mt-1">
                                  {t("images_uploaded", { current: images.length, max: MAX_IMAGES })}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>

                        {images.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {images.map((src, idx) => (
                              <div key={src + idx} className="relative group rounded-lg overflow-hidden">
                                <div className="w-full h-28 relative bg-gray-100">
                                  <Image
                                    src={src}
                                    alt={`preview-${idx}`}
                                    fill
                                    sizes="(max-width: 640px) 50vw, 25vw"
                                    style={{ objectFit: "cover" }}
                                  />
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeImage(idx)}
                                  aria-label={t("remove_image")}
                                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow opacity-90 hover:opacity-100 transition-opacity"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage>{getErrorMessage("product_images")}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("description_label")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("description_placeholder")} className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormDescription>{t("description_help")}</FormDescription>
                    <FormMessage>{getErrorMessage("description")}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loading}>
                  {loading ? t("loading") : t("publish_button")}
                </Button>

                {/* Link to local uploaded Terms & Conditions file (transform path to served URL in deployment) */}
                <div className="text-xs text-muted-foreground text-center">
                  <a href={TERMS_LOCAL_PATH} target="_blank" rel="noreferrer" className="underline">
                    {t("view_terms")}
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}