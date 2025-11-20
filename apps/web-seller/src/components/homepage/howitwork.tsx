"use client";

import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HowItWorks() {
  const t = useTranslations("steps");

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t("title")}</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-none flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 text-blue-600 font-bold text-lg">1</div>
                <div>
                  <h3 className="font-bold text-xl">{t("s1_t")}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{t("s1_d")}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-600 text-blue-600 font-bold text-lg">2</div>
                <div>
                  <h3 className="font-bold text-xl">{t("s2_t")}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{t("s2_d")}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-none flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">3</div>
                <div>
                  <h3 className="font-bold text-xl">{t("s3_t")}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">{t("s3_d")}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image Display */}
          <div className="w-full md:w-1/2">
             <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="relative w-full h-full aspect-[4/3]">
                  <Image 
                    src="/mobile-money.jpg"
                    alt="Customer paying via mobile"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                   <div className="text-white">
                      <div className="flex items-center gap-2 mb-1">
                         <CheckCircle className="text-green-400 w-5 h-5" />
                         <span className="font-bold">Payment Verified</span>
                      </div>
                      <p className="text-sm opacity-90">Seamless transactions for you and your customers.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};