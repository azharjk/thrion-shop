import Link from "next/link";
import ReactModal from "react-modal";
import { NextPage } from "next";

import { Checkout } from "@/interfaces/checkout";

interface CheckoutModalProps {
  isOpen: boolean;
  closeHandler: () => void;
  // FIXME: This fix the typescript parser
  checkoutResponse: Checkout | undefined;
}

ReactModal.setAppElement("#__next");

const CheckoutModal: NextPage<CheckoutModalProps> = ({
  isOpen,
  closeHandler,
  checkoutResponse,
}) => {
  const { id, name, product } = checkoutResponse!;

  return (
    <ReactModal
      className="absolute p-4 top-0 bottom-0 left-0 right-0"
      isOpen={isOpen}
    >
      <div className="bg-slate-700 p-4 w-full max-w-[420px] text-white rounded-sm shadow-md mx-auto mt-16">
        <header>
          <h1 className="text-white text-lg text-center">
            Yeay, successfully purchased product:{" "}
            <span className="font-semibold">{product.name}</span>
          </h1>
        </header>
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="uppercase">Checkout ID</span>
            <span className="font-semibold">{id}</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase">Product</span>
            <span className="font-semibold">{product.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase">Name</span>
            <span className="font-semibold">{name}</span>
          </div>
          <div className="flex justify-between">
            <span className="uppercase">Total price</span>
            <span className="font-semibold">{product.price}</span>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={closeHandler}
            className="block w-full border mt-2 py-2 uppercase font-semibold rounded-sm"
          >
            Okay
          </button>
          <Link href="/">See other products</Link>
        </div>
      </div>
    </ReactModal>
  );
};

export default CheckoutModal;
