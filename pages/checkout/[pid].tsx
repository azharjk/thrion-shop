import Head from "next/head";
import { SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetServerSideProps } from "next";

import MainLayout from "@/components/layouts/MainLayout";
import HorizontalProductCard from "@/components/products/HorizontalProductCard";
import { getProduct } from "@/services/product";
import { Product } from "@/interfaces/product";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const product = await getProduct(Number(params?.pid));
  if (product === null) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

// enum PaymentMethod {
//   COD = "COD",
//   TRANSFER = "TRANSFER",
//   DANA = "DANA",
// }

interface CheckoutForm {
  name: string;
  whatsAppNumber: string;
  address: string;
  paymentMethod: string;
}

interface CheckoutPageProps {
  product: Product;
}

export default function CheckoutPage({ product }: CheckoutPageProps) {
  const { images, name, price } = product;

  const { handleSubmit, register } = useForm<CheckoutForm>();
  const [whatsAppNumber, setWhatsAppNumber] = useState("");

  const onWhatsAppNumberChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const regex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

    if (value.length === 0) {
      setWhatsAppNumber(value);
      return;
    }

    if (!regex.test(value)) {
      return;
    }

    setWhatsAppNumber(e.currentTarget.value);
  };

  // FIXME: Implement checkout
  const onSubmit: SubmitHandler<CheckoutForm> = ({
    name,
    address,
    paymentMethod,
  }) => {
    console.log(name);
    console.log(address);
    console.log(whatsAppNumber);
    console.log(paymentMethod);
  };

  return (
    <>
      <Head>
        <title>{name} - Checkout - Thrion Shop</title>
      </Head>
      <MainLayout>
        <div className="flex justify-center w-full mb-8">
          <div className="p-4 w-full max-w-[550px] sm:border sm:mt-[50px] relative">
            <header className="mb-4">
              <h1>
                <span className="uppercase font-semibold">Checkout</span> -{" "}
                {name}
              </h1>
            </header>
            <HorizontalProductCard
              src={images[0].url}
              title={name}
              price_html={price.toString()}
            />
            <div className="mt-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col">
                  <label htmlFor="name">Name</label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="wa-number">WhatsApp number</label>
                  <input
                    {...register("whatsAppNumber", {
                      required: true,
                    })}
                    onChange={onWhatsAppNumberChange}
                    value={whatsAppNumber}
                    type="text"
                    id="wa-number"
                    placeholder="Enter your WhatsApp number"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address">Address</label>
                  <textarea
                    {...register("address", { required: true })}
                    className="resize-none h-[100px]"
                    placeholder="Enter your address"
                    id="address"
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  <label
                    className="uppercase font-semibold mt-3 mb-2"
                    htmlFor="payment-method"
                  >
                    Payment method
                  </label>
                  <select id="payment-method" {...register("paymentMethod")}>
                    <option value="COD">Cash On Delivery (COD)</option>
                    <option value="TRANSFER">Transfer</option>
                    <option value="DANA">DANA</option>
                  </select>
                </div>
                <div className="mt-2 border p-2">
                  <ul className="flex flex-col gap-2">
                    {/* {prices.map((price, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{price.title}</span>
                      <span className="font-semibold">{price.amountHtml}</span>
                    </li>
                  ))} */}
                  </ul>
                </div>
                <div className="border p-2 flex justify-between items-center">
                  <span>Total price</span>
                  <span className="font-semibold">
                    {/* {toRupiah(sumTotalPrice())} */}
                  </span>
                </div>
                <button className="w-full border mt-2 py-2 uppercase font-semibold">
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
