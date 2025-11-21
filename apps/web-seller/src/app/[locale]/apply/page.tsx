import SellerApplicationForm from "@seller/components/auth/sellers-applicationform";
import Header from "@seller/components/homepage/header";

export default function SellerApplyPage() {
  return (
    <main className="container mx-auto">
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <SellerApplicationForm />
        </div>
      </div>
    </main>
  );
}
