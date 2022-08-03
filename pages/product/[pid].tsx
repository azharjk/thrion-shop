import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import MainLayout from "@/components/layouts/MainLayout";
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

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { images, id, name, price, size, condition, minusInfo } = product;

  return (
    <>
      <Head>
        {/* FIXME: Is the title good to have the product name? */}
        <title>Product - Thrion Shop</title>
      </Head>
      <MainLayout>
        <div className="flex justify-center mb-8">
          <div className="w-100 max-w-[500px] sm:border sm:pb-4 md:mt-[50px]">
            <div>
              <div className="mb-3 px-4 pt-4">
                <Carousel showThumbs={false}>
                  {images.map(({ url }) => (
                    <div
                      key={id}
                      className="w-100 h-[400px] md:h-[500px] relative"
                    >
                      {/* FIXME: The image size need some work */}
                      <Image
                        loader={() =>
                          `${process.env["NEXT_PUBLIC_API_HOST"]}${url}`
                        }
                        unoptimized
                        src={`${process.env["NEXT_PUBLIC_API_HOST"]}${url}`}
                        width={500}
                        height={700}
                        alt="Thrion product"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="mt-4 px-4">
              <h1 className="font-semibold">{name}</h1>
              <div className="mt-2">
                <p>
                  Size: <span className="font-semibold">{size}</span>
                </p>
                <p>
                  Condition:{" "}
                  <span className="font-semibold">{condition}/10</span>
                </p>
                <p>
                  Minus Info:{" "}
                  <span className="font-semibold">
                    {minusInfo ? minusInfo : "-"}
                  </span>
                </p>
              </div>
              <div className="mt-2">
                <span className="font-semibold text-2xl">{price}</span>
              </div>
              <Link href={`/checkout/${id}`}>
                <a
                  className="block text-center w-full border mt-4 py-2 uppercase font-semibold"
                  href={`/checkout/${id}`}
                >
                  Buy now
                </a>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
