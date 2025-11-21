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
import { signInSchema } from "@seller/lib/schemas/auth"



export default function SignIn() {
  const t = useTranslations("Auth")
  
  // 1. Define form
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  // 2. Handle Submit
  function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values)
    // API Call here -> Then redirect to dashboard
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 transition-colors duration-300">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("signin")}</CardTitle>
          <CardDescription className="text-center">
{t("signin_description")}          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Username or Phone Number */}
              <FormField
                control={form.control}
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
                      {form.formState.errors.login && t(`errors.${form.formState.errors.login.message}`)}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("pass_label")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="******" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.password && t(`errors.${form.formState.errors.password.message}`)}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  href="/auth/reset-password" 
                  className="text-sm text-primary hover:underline"
                >
                  {t("forgot_password")}
                </Link>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                {t("signin")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            {t("no_account")}{" "}
            <Link href="/auth/signup" className="text-primary font-medium hover:underline">
              {t("signup")}
            </Link>
          </p>
          
          {/* Optional: Demo login hints */}
          <div className="text-xs text-muted-foreground text-center border-t pt-4">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p>Username: <span className="font-mono">demo_user</span> or Phone: <span className="font-mono">0712000000</span></p>
            <p>Password: <span className="font-mono">demo123</span></p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}