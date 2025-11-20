"use client";

import { BarChart3, Store, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function PlatformPreview() {
  const t = useTranslations("preview");

  return (
    <section id="platform" className="py-20 border-y border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
         <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
               <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                  <div className="absolute top-0 w-full h-8 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 px-4">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="relative w-full h-auto pt-8">
                    <Image 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" 
                      alt="Analytics Dashboard" 
                      width={1000}
                      height={600}
                      className="w-full h-auto opacity-90"
                    />
                  </div>
               </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t("title")}</h2>
               <p className="text-slate-500 dark:text-slate-400 text-lg">{t("subtitle")}</p>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                     <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        <BarChart3 size={20} />
                     </div>
                     <span className="font-medium">{t("f1")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <div className="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        <Store size={20} />
                     </div>
                     <span className="font-medium">{t("f2")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <div className="p-2 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                        <Smartphone size={20} />
                     </div>
                     <span className="font-medium">{t("f3")}</span>
                  </li>
               </ul>
               <Button variant="outline" className="mt-4">
                 <Link href="/demo">{t("ctaSecondary")}</Link>
               </Button>
            </div>
         </div>
      </div>
    </section>
  );
};
