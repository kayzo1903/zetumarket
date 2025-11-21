// src/app/[locale]/page.tsx

import Features from "@seller/components/homepage/features";
import Header from "@seller/components/homepage/header";
import HeroSection from "@seller/components/homepage/hero";
import HowItWorks from "@seller/components/homepage/howitwork";
import PlatformPreview from "@seller/components/homepage/platformpreview";
import {
  featuresSchema,
  heroSchema,
  howItWorksSchema,
  platformPreviewSchema,
} from "@seller/components/homepage/SEO";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            heroSchema,
            platformPreviewSchema,
            featuresSchema,
            howItWorksSchema,
          ]),
        }}
      />

      <main className="container mx-auto px-4 md:px-6">
        <Header />
        <HeroSection />
        <PlatformPreview />
        <Features />
        <HowItWorks />
      </main>
    </div>
  );
}
