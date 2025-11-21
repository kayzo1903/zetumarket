"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@seller/components/ui/form"
import { Input } from "@seller/components/ui/input"
import { Button } from "@seller/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@seller/components/ui/card"
import { Link, useRouter } from "@seller/i18n/navigation"
import { useState, useEffect } from "react"
import { verifySchema } from "@seller/lib/schemas/auth"


export default function VerifyAccount() {
  const t = useTranslations("Auth")
  const router = useRouter()
  const [countdown, setCountdown] = useState(60)
  const [isVerifying, setIsVerifying] = useState(false)

  // FIX: Derive 'canResend' directly from countdown instead of using useEffect to set state
  const canResend = countdown === 0

  // 1. Define form
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      otp: "",
    },
  })

  // FIX: Simplified Timer Logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
    // No else block needed here anymore
  }, [countdown])

  // 2. Handle Verification
  function onSubmit(values: z.infer<typeof verifySchema>) {
    setIsVerifying(true)
    console.log("Verifying OTP:", values.otp)
    
    // Simulate API call
    setTimeout(() => {
      setIsVerifying(false)
      router.push("/dashboard")
    }, 2000)
  }

  // Handle Resend OTP
  function handleResendOTP() {
    console.log("Resending OTP...")
    // API Call to resend OTP would go here
    
    // FIX: Just reset countdown. 'canResend' automatically becomes false because countdown is not 0
    setCountdown(60) 
  }

  // Auto-focus next input
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const value = e.target.value
    const formValues = form.getValues().otp.split('')
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
    
    // Update form value
    formValues[index] = value
    form.setValue('otp', formValues.join(''))
  }

  // Handle paste event
  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="text"]')
    
    pastedData.split('').forEach((char, index) => {
      if (inputs[index]) {
        inputs[index].value = char
      }
    })
    
    form.setValue('otp', pastedData)
    
    // Focus last input
    if (pastedData.length === 6) {
      inputs[5]?.focus()
    } else if (pastedData.length > 0) {
      inputs[pastedData.length]?.focus()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 transition-colors duration-300">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("verify_account")}</CardTitle>
          <CardDescription className="text-center">
            {t("verify_description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* OTP Input Fields */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-center block">{t("otp_label")}</FormLabel>
                    <FormControl>
                      <div className="flex justify-center space-x-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <Input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-lg font-semibold"
                            onChange={(e) => handleInputChange(e, index)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            onFocus={(e) => e.target.select()}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage className="text-center">
                      {form.formState.errors.otp && t(`errors.${form.formState.errors.otp.message}`)}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Resend OTP Section */}
              <div className="text-center">
                {canResend ? (
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleResendOTP}
                    className="text-green-600 hover:text-green-700"
                  >
                    {t("resend_otp")}
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("resend_in")} <span className="font-semibold">{countdown}s</span>
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isVerifying}
              >
                {isVerifying ? t("verifying") : t("verify_account")}
              </Button>
            </form>
          </Form>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              {t("otp_help")}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            {t("having_trouble")}{" "}
            <Link href="/support" className="text-primary font-medium hover:underline">
              {t("contact_support")}
            </Link>
          </p>
          
          <div className="text-center">
            <Link 
              href="/auth/signin" 
              className="text-sm text-primary hover:underline"
            >
              {t("back_to_signin")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}