"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@seller/components/ui/form"
import { Input } from "@seller/components/ui/input"
import { Button } from "@seller/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@seller/components/ui/card"
import { Link } from "@seller/i18n/navigation"
import { useState } from "react"
import { forgotPasswordSchema } from "@seller/lib/schemas/auth"

// Reset Password schema (for the second step)
const resetPasswordSchema = z.object({
  otp: z.string().min(6, "otp_required").max(6, "otp_required"),
  newPassword: z.string().min(8, "min_8_chars"),
  confirmPassword: z.string().min(8, "min_8_chars"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "passwords_mismatch",
  path: ["confirmPassword"],
})

type ForgotPasswordStep = "request" | "verify" | "success"

export default function ForgotPassword() {
  const t = useTranslations("Auth")
  const [step, setStep] = useState<ForgotPasswordStep>("request")
  const [loginValue, setLoginValue] = useState("")

  // 1. Forgot Password Form (Request OTP)
  const forgotForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      login: "",
    },
  })

  // 2. Reset Password Form (Verify OTP and set new password)
  const resetForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Handle OTP Request
  function handleRequestOTP(values: z.infer<typeof forgotPasswordSchema>) {
    console.log("Request OTP for:", values.login)
    setLoginValue(values.login)
    // API Call to send OTP
    setStep("verify")
  }

  // Handle Password Reset
  function handleResetPassword(values: z.infer<typeof resetPasswordSchema>) {
    console.log("Reset password for:", loginValue, "with OTP:", values.otp)
    // API Call to verify OTP and reset password
    setStep("success")
  }

  // Resend OTP
  function handleResendOTP() {
    console.log("Resend OTP to:", loginValue)
    // API Call to resend OTP
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 transition-colors duration-300">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {step === "request" && t("forgot_password")}
            {step === "verify" && t("reset_password")}
            {step === "success" && t("password_reset_success")}
          </CardTitle>
          <CardDescription className="text-center">
            {step === "request" && t("forgot_password_description")}
            {step === "verify" && t("reset_password_description")}
            {step === "success" && t("password_reset_success_description")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Step 1: Request OTP */}
          {step === "request" && (
            <Form {...forgotForm}>
              <form onSubmit={forgotForm.handleSubmit(handleRequestOTP)} className="space-y-4">
                <FormField
                  control={forgotForm.control}
                  name="login"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("login_label")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Username or 0712 345 678" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage>
                        {forgotForm.formState.errors.login && t(`errors.${forgotForm.formState.errors.login.message}`)}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                  {t("send_otp")}
                </Button>
              </form>
            </Form>
          )}

          {/* Step 2: Verify OTP and Set New Password */}
          {step === "verify" && (
            <Form {...resetForm}>
              <form onSubmit={resetForm.handleSubmit(handleResetPassword)} className="space-y-4">
                {/* OTP Field */}
                <FormField
                  control={resetForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("otp_label")}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="123456" 
                          maxLength={6}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage>
                        {resetForm.formState.errors.otp && t(`errors.${resetForm.formState.errors.otp.message}`)}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={resetForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("new_password_label")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="******" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage>
                        {resetForm.formState.errors.newPassword && t(`errors.${resetForm.formState.errors.newPassword.message}`)}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={resetForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("confirm_password_label")}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="******" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage>
                        {resetForm.formState.errors.confirmPassword && t(`errors.${resetForm.formState.errors.confirmPassword.message}`)}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <div className="flex flex-col space-y-3">
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                    {t("reset_password_button")}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleResendOTP}
                    className="w-full"
                  >
                    {t("resend_otp")}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {/* Step 3: Success Message */}
          {step === "success" && (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("password_reset_success_message")}
              </p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Link href="/auth//signin">
                  {t("back_to_signin")}
                </Link>
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-center">
          {step !== "success" && (
            <p className="text-sm text-muted-foreground">
              {t("remember_password")}{" "}
              <Link href="/auth/signin" className="text-primary font-medium hover:underline">
                {t("signin")}
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}