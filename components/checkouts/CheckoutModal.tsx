import Link from "next/link";
import ReactModal from "react-modal";
import { NextPage } from "next";
import { gql } from "@apollo/client";
import { useState } from "react";

import client from "@/services/apollo-client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Checkout } from "@/interfaces/checkout";

interface CreateEWalletCharge {
  createEWalletCharge: {
    actions: {
      desktop_web_checkout_url: string;
    };
    charge_amount: number;
    id: string;
    reference_id: string;
    status: string;
  };
}

// FIXME: Now just handle the e-wallet payment
const CREATE_PAYMENT = gql`
  mutation CreatePayment($data: CreateEWalletChargeInput!) {
    createEWalletCharge(data: $data) {
      id
      reference_id
      status
      charge_amount
      actions {
        desktop_web_checkout_url
      }
    }
  }
`;

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

  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    let url: string | undefined;

    try {
      setIsLoading(true);

      const response = await client.mutate<CreateEWalletCharge>({
        mutation: CREATE_PAYMENT,
        variables: {
          data: {
            orderID: id,
            referenceID: `ref-${id}:${name}`,
            currency: "IDR",
            amount: product.price,
            checkoutMethod: "ONE_TIME_PAYMENT",
            channelCode: "ID_DANA",
            channelProperties: {
              successRedirectURL: "https://google.com",
            },
          },
        },
      });

      url = response.data?.createEWalletCharge.actions.desktop_web_checkout_url;
    } catch (err) {
      console.log("ERROR: @handlePayment: ", err);
    } finally {
      setIsLoading(false);
    }

    location.href = url!;
  };

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
          <button
            onClick={handlePayment}
            className="relative block w-full border mt-2 py-2 uppercase font-semibold rounded-sm"
          >
            {isLoading ? (
              <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-10 flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : (
              <span>Pay with DANA</span>
            )}
          </button>
          <Link href="/">See other products</Link>
        </div>
      </div>
    </ReactModal>
  );
};

export default CheckoutModal;
