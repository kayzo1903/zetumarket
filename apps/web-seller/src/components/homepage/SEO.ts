export const heroSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Muuza Seller Portal",
  description:
    "Launch your online store and reach thousands of buyers using Muuza’s powerful seller tools.",
  url: "https://muuza.co.tz",
  publisher: {
    "@type": "Organization",
    name: "Muuza",
    logo: {
      "@type": "ImageObject",
      url: "https://muuza.co.tz/logo.png",
    },
  },
};

export const platformPreviewSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Muuza Seller Platform",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Preview the Muuza platform including analytics, product management, store customization, and order tracking.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/OnlineOnly",
  },
  screenshot: "https://muuza.co.tz/platform-preview.jpg",
};

export const featuresSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Muuza Seller Features",
  description:
    "Explore the top features of Muuza such as product listing, sales analytics, secure payments, and store customization.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Product Management",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Store Customization",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Sales Analytics",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Order Tracking",
    },
  ],
};

export const howItWorksSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Muuza Works",
  description:
    "Learn how to start selling on Muuza in three simple steps: register, set up your store, and start receiving orders.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Sign Up & Create Account",
      text: "Register using your email or phone number.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Set Up Your Store",
      text: "Add your business details and upload your products.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Start Selling",
      text: "Share your store link and receive orders instantly.",
    },
  ],
};
