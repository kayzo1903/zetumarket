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
import { signUpSchema } from "@seller/lib/schemas/auth"


export default function SignUp() {
  const t = useTranslations("Auth")
  
  // 1. Define form
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      password: "",
    },
  })

  // 2. Handle Submit
  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values)
    // API Call here -> Then redirect to /verify
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 transition-colors duration-300">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t("signup")}</CardTitle>
          <CardDescription className="text-center">
           {t("signup_description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name_label")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Juma Hamisi" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.fullName && t(`errors.${form.formState.errors.fullName.message}`)}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone_label")}</FormLabel>
                    <FormControl>
                      <Input placeholder="0712 345 678" type="tel" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.phone && t(`errors.${form.formState.errors.phone.message}`)}</FormMessage>
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
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.password && t(`errors.${form.formState.errors.password.message}`)}</FormMessage>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                {t("signup")}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            {t("have_account")}{" "}
            <Link href={`/auth/signin`} className="text-primary font-medium hover:underline">
              {t("signin")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}