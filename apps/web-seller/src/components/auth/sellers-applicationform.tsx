"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import BusinessTypeSelect from "../forms/bussiness-tyep-select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@seller/i18n/navigation";

const schema = z.object({
  businessName: z.string().min(2, "businessNameRequired"),
  businessTypes: z.array(z.string()).min(1, "chooseCategory"),
  region: z.string().min(2, "regionRequired"),
  district: z.string().min(2, "districtRequired"),
  street: z.string().min(2, "streetRequired"),
  landmark: z.string().optional(),

  facebook: z.string().url("urlInvalid").optional().or(z.literal("")),
  instagram: z.string().url("urlInvalid").optional().or(z.literal("")),
  tiktok: z.string().url("urlInvalid").optional().or(z.literal("")),
  whatsapp: z.string().url("urlInvalid").optional().or(z.literal("")),

  description: z.string().min(10, "descriptionMin"),
  documents: z.any().optional(),
  agree: z.boolean().refine((v) => v === true, { message: "termsRequired" }),
});

export default function SellerRegistration() {
  const t = useTranslations("sellerRegistration");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      businessName: "",
      businessTypes: [],
      region: "",
      district: "",
      street: "",
      landmark: "",
      facebook: "",
      instagram: "",
      tiktok: "",
      whatsapp: "",
      description: "",
      agree: false,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      console.log("SELLER REQUEST:", data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If form is successfully submitted, show success message
  if (isSubmitted) {
    return (
      <div className="container mx-auto max-w-3xl py-10 px-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold  mb-4">
            {t("success.title")}
          </h1>
          
          <p className="text-lg  mb-2">
            {t("success.message")}
          </p>
          
          <p className="text-gray-500 mb-8">
            {t("success.referenceId", { id: `SR-${Date.now().toString().slice(-6)}` })}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              {t("success.goHome")}
            </Link>
            
            <button 
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              {t("success.submitAnother")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl pt-6 pb-10 px-4">
      <h1 className="text-3xl font-bold mb-8">
        {t("title")}
      </h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Business Name */}
        <div>
          <label className="font-medium">{t("businessName")}</label>
          <Input 
            {...form.register("businessName")} 
            disabled={isSubmitting}
          />
          {form.formState.errors.businessName && (
            <p className="text-red-500 text-sm mt-1">
              {t(`validation.${form.formState.errors.businessName.message}`)}
            </p>
          )}
        </div>

        {/* Business Types */}
        <div>
          <label className="font-medium">{t("businessCategory")}</label>
          <BusinessTypeSelect
            value={form.watch("businessTypes")}
            onChange={(v) => form.setValue("businessTypes", v)}
          />
          {form.formState.errors.businessTypes && (
            <p className="text-red-500 text-sm mt-1">
              {t(`validation.${form.formState.errors.businessTypes.message}`)}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">{t("region")}</label>
            <Input 
              {...form.register("region")} 
              disabled={isSubmitting}
            />
            {form.formState.errors.region && (
              <p className="text-red-500 text-sm mt-1">
                {t(`validation.${form.formState.errors.region.message}`)}
              </p>
            )}
          </div>
          <div>
            <label className="font-medium">{t("district")}</label>
            <Input 
              {...form.register("district")} 
              disabled={isSubmitting}
            />
            {form.formState.errors.district && (
              <p className="text-red-500 text-sm mt-1">
                {t(`validation.${form.formState.errors.district.message}`)}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="font-medium">{t("street")}</label>
          <Input 
            {...form.register("street")} 
            disabled={isSubmitting}
          />
          {form.formState.errors.street && (
            <p className="text-red-500 text-sm mt-1">
              {t(`validation.${form.formState.errors.street.message}`)}
            </p>
          )}
        </div>

        <div>
          <label className="font-medium">{t("landmark")}</label>
          <Input 
            {...form.register("landmark")} 
            disabled={isSubmitting}
          />
        </div>

        {/* Social Proof */}
        <h2 className="text-xl font-semibold mt-8">{t("socialMedia.title")}</h2>

        <div className="space-y-4 mt-2">
          <Input 
            placeholder={t("socialMedia.facebook")} 
            {...form.register("facebook")} 
            disabled={isSubmitting}
          />
          <Input 
            placeholder={t("socialMedia.instagram")} 
            {...form.register("instagram")} 
            disabled={isSubmitting}
          />
          <Input 
            placeholder={t("socialMedia.tiktok")} 
            {...form.register("tiktok")} 
            disabled={isSubmitting}
          />
          <Input 
            placeholder={t("socialMedia.whatsapp")} 
            {...form.register("whatsapp")} 
            disabled={isSubmitting}
          />
        </div>

        {/* Documents */}
        <div>
          <label className="font-medium">{t("documents")}</label>
          <Input 
            type="file" 
            multiple 
            {...form.register("documents")} 
            disabled={isSubmitting}
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">{t("description")}</label>
          <Textarea 
            {...form.register("description")} 
            disabled={isSubmitting}
          />
          {form.formState.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {t(`validation.${form.formState.errors.description.message}`)}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            {...form.register("agree")} 
            disabled={isSubmitting}
          />
          <Link href="/terms" className={isSubmitting ? "text-gray-400" : ""}>
            {t("terms")}
          </Link>
        </div>
        {form.formState.errors.agree && (
          <p className="text-red-500 text-sm">
            {t(`validation.${form.formState.errors.agree.message}`)}
          </p>
        )}

        {/* Submit */}
        <Button 
          type="submit" 
          className="w-full h-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t("submitting")}
            </div>
          ) : (
            t("submit")
          )}
        </Button>
      </form>
    </div>
  );
}