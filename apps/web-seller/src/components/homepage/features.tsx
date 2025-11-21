"use client";

import React from 'react';
import { Globe, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '../ui/card';



export default function Features() {
  const t = useTranslations("features");
  const icons = [Globe, ShieldCheck, TrendingUp, Users];
  
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 md:text-lg">{t("sub")}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {icons.map((Icon, index) => (
            <Card key={index} className="p-6 flex flex-col items-start hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800">
              <CardContent className="p-0 w-full">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">{t(`list.${index}.title`)}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {t(`list.${index}.desc`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};