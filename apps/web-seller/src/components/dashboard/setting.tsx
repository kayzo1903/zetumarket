"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Button } from "@seller/components/ui/button"
import { Input } from "@seller/components/ui/input"
import { Textarea } from "@seller/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@seller/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@seller/components/ui/form"
import {  X, Store, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import BusinessTypeSelect from "@seller/components/forms/bussiness-tyep-select"
import { SettingsFormValues, settingsSchema } from "@seller/lib/schemas/storeSetting"

// Validation schema matching your business registration form



export default function StoreSettings() {
  const t = useTranslations("sellerRegistration")
  const [storeLogo, setStoreLogo] = useState<string>("")
  const [storeFrontImage, setStoreFrontImage] = useState<string>("")
  const [loading, setLoading] = useState(false)
  
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      businessName: "Kariakoo Electronics",
      businessTypes: ["Electronics"],
      region: "Dar es Salaam",
      district: "Ilala",
      street: "Msimbazi Street",
      landmark: "Near Kariakoo Market",
      phone: "0712345678",
      facebook: "",
      instagram: "",
      tiktok: "",
      whatsapp: "",
      description: "We sell quality electronics and gadgets with warranty",
      tinNumber: "123456789",
      storeLogo: "",
      storeFrontImage: "",
    }
  })

  function onSubmit(values: SettingsFormValues) {
    setLoading(true)
    console.log("Updating Seller Profile Service:", {
      ...values,
      storeLogo,
      storeFrontImage
    })
    // Simulate API call
    setTimeout(() => setLoading(false), 2000)
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setStoreLogo(previewUrl)
    form.setValue("storeLogo", previewUrl)
  }

  const handleStoreFrontUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    setStoreFrontImage(previewUrl)
    form.setValue("storeFrontImage", previewUrl)
  }

  const removeLogo = () => {
    setStoreLogo("")
    form.setValue("storeLogo", "")
  }

  const removeStoreFrontImage = () => {
    setStoreFrontImage("")
    form.setValue("storeFrontImage", "")
  }

  const getErrorMessage = (fieldName: keyof SettingsFormValues) => {
    const error = form.formState.errors[fieldName]
    if (!error?.message) return undefined
    return t(`validation.${error.message}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>Manage your store profile and branding</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Store Branding Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Store Logo */}
                <div className="space-y-4">
                  <FormLabel>Store Logo</FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {storeLogo ? (
                      <div className="relative group">
                        <div className="w-32 h-32 mx-auto relative bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={storeLogo}
                            alt="Store logo preview"
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-lg"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow opacity-90 hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Store className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="mt-2">
                          <label htmlFor="logo-upload" className="cursor-pointer">
                            <span className="text-sm font-medium text-primary hover:underline">
                              Upload Logo
                            </span>
                            <input
                              id="logo-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleLogoUpload}
                            />
                          </label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Recommended: 200x200px PNG
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Store Front Image */}
                <div className="space-y-4">
                  <FormLabel>Store Front Image</FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {storeFrontImage ? (
                      <div className="relative group">
                        <div className="w-full h-32 mx-auto relative bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={storeFrontImage}
                            alt="Store front preview"
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-lg"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={removeStoreFrontImage}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow opacity-90 hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="mt-2">
                          <label htmlFor="store-front-upload" className="cursor-pointer">
                            <span className="text-sm font-medium text-primary hover:underline">
                              Upload Store Image
                            </span>
                            <input
                              id="store-front-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleStoreFrontUpload}
                            />
                          </label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Recommended: 800x400px JPG
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Name */}
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("businessName")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage>{getErrorMessage("businessName")}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Business Types */}
              <FormField
                control={form.control}
                name="businessTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("businessCategory")}</FormLabel>
                    <FormControl>
                      <BusinessTypeSelect
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage>{getErrorMessage("businessTypes")}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Address Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("region")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{getErrorMessage("region")}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("district")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{getErrorMessage("district")}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("street")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage>{getErrorMessage("street")}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("landmark")}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage>{getErrorMessage("landmark")}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage>{getErrorMessage("phone")}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tinNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TIN Number</FormLabel>
                      <FormControl>
                        <Input placeholder="123456789" {...field} />
                      </FormControl>
                      <FormMessage>{getErrorMessage("tinNumber")}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-medium mb-4">{t("socialMedia.title")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("socialMedia.facebook")}</FormLabel>
                        <FormControl>
                          <Input placeholder="https://facebook.com/yourpage" {...field} />
                        </FormControl>
                        <FormMessage>{getErrorMessage("facebook")}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("socialMedia.instagram")}</FormLabel>
                        <FormControl>
                          <Input placeholder="https://instagram.com/yourprofile" {...field} />
                        </FormControl>
                        <FormMessage>{getErrorMessage("instagram")}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tiktok"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("socialMedia.tiktok")}</FormLabel>
                        <FormControl>
                          <Input placeholder="https://tiktok.com/@yourprofile" {...field} />
                        </FormControl>
                        <FormMessage>{getErrorMessage("tiktok")}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("socialMedia.whatsapp")}</FormLabel>
                        <FormControl>
                          <Input placeholder="https://wa.me/255712345678" {...field} />
                        </FormControl>
                        <FormMessage>{getErrorMessage("whatsapp")}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Business Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("description")}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("description")}
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage>{getErrorMessage("description")}</FormMessage>
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Store Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Verification Status Section */}
      <Card className="border-yellow-400 bg-yellow-50 dark:bg-yellow-900/10">
        <CardHeader>
          <CardTitle className="text-yellow-700 dark:text-yellow-500">
            Verification Status: Pending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            We are currently reviewing your Business License and TIN. You will be notified via SMS once approved.
          </p>
          <Button size="sm" variant="outline">
            Upload Missing Documents
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}