// src/app/[locale]/page.tsx
import Header from "@seller/components/homepage/header";
import HeroSection from "@seller/components/homepage/hero";

export default function Home() {
  return (
    <div className="w-7xl mx-auto px-ar">
      <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto">
        <HeroSection />
      </main>
    </div>
    </div>
  );
}
