import Link from "next/link";
import Head from "next/head";
import { GetServerSideProps } from "next";

import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/products/ProductCard";
import Header from "@/components/Header";
import { DisplayProduct } from "@/interfaces/display-product";
import { getDisplayProducts } from "@/services/display-product";

export const getServerSideProps: GetServerSideProps = async () => {
  const displayProducts = await getDisplayProducts();

  return {
    props: {
      displayProducts,
    },
  };
};

interface HomePageProps {
  displayProducts: DisplayProduct[];
}

export default function HomePage({ displayProducts }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Home - Thrion Shop</title>
      </Head>
      <MainLayout>
        <Header />
        <main className="mt-[80px] mb-10 sm:flex sm:justify-center">
          <ul className="grid gap-6 sm:grid-cols-3 sm:w-full sm:max-w-5xl">
            {displayProducts.map(({ id, name, thumbnailUrl, price }) => (
              <li key={id}>
                <Link href={`/product/${id}`}>
                  <a href={`/product/${id}`}>
                    <ProductCard
                      src={`http://localhost:4567/${thumbnailUrl}`}
                      alt="Thrion product"
                      name={name}
                      // FIXME: This should be a human readable price
                      price={price.toString()}
                    />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </main>
        <div className="flex justify-center my-8">
          <Link href="/product">
            <a
              href="/product"
              className="border mt-2 px-4 py-2 uppercase font-semibold"
            >
              See all products
            </a>
          </Link>
        </div>
      </MainLayout>
    </>
  );
}
