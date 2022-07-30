import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoadingCheckoutReceipt() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-10 flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
};
