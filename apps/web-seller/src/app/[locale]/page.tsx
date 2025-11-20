// src/app/[locale]/page.tsx

import Features from "@seller/components/homepage/features";
import Header from "@seller/components/homepage/header";
import HeroSection from "@seller/components/homepage/hero";
import HowItWorks from "@seller/components/homepage/howitwork";
import PlatformPreview from "@seller/components/homepage/platformpreview";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 md:px-6">
        <HeroSection />
        <PlatformPreview />
        <Features />
        <HowItWorks />
      </main>
    </div>
  );
}
