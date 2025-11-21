import SellerApplicationForm from "@seller/components/auth/sellers-applicationform";

export default function SellerApplyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <SellerApplicationForm />
      </div>
    </div>
  );
}
