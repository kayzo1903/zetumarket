"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-slate-900 dark:bg-slate-900/50 text-slate-200 py-12 ">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-white">
              <span>muuza</span>
            </div>
            <p className="text-sm text-slate-400">
              {t("description")}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">{t("platform")}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/features" className="hover:text-blue-400 transition-colors">{t("features")}</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">{t("pricing")}</Link></li>
              <li><Link href="/support" className="hover:text-blue-400 transition-colors">{t("support")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">{t("resources")}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">{t("blog")}</Link></li>
              <li><Link href="/community" className="hover:text-blue-400 transition-colors">{t("community")}</Link></li>
              <li><Link href="/help" className="hover:text-blue-400 transition-colors">{t("helpCenter")}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">{t("legal")}</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">{t("privacy")}</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">{t("terms")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
         {` © ${new Date().getFullYear()} zetuTech Ltd. ${t("rights")}`}
        </div>
      </div>
    </footer>
  );
};
