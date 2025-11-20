"use client";

import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@seller/i18n/navigation";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative pt-12 pb-20 overflow-hidden lg:pt-24 lg:pb-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px] dark:bg-blue-900"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left">
            <Badge>{t("badge")}</Badge>
            <h1 className="mt-8 max-w-2xl text-4xl font-extrabold tracking-tight lg:text-6xl leading-tight">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-600 dark:text-slate-400">
              {t("subtitle")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="h-12 px-8 text-base">
                <Link
                  href={"/register"}
                  className="flex items-center flex-nowrap"
                >
                  {t("ctaPrimary")} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
              >
                <Link href="/demo">{t("ctaSecondary")}</Link>
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
              <div className="flex -space-x-2">
                <div className="relative h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-950">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                    alt="User avatar 1"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="relative h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-950">
                  <Image
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64"
                    alt="User avatar 2"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="relative h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-950">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64"
                    alt="User avatar 3"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 ring-2 ring-white dark:ring-slate-950 text-xs font-bold">
                  +2k
                </div>
              </div>
              <div>Trusted by 15,000+ sellers</div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 aspect-[4/3] lg:aspect-square">
            <div className="relative w-full h-full">
              <Image
                src="/techStore.jpg"
                alt="shopping in a store"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {t("stat2")}
                </div>
                <div className="text-xl font-bold text-green-600 flex items-center gap-1">
                  <TrendingUp size={16} /> +124%
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {t("stat1")}
                </div>
                <div className="text-xl font-bold text-blue-600">15.2k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
