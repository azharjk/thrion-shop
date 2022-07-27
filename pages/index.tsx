import Link from "next/link";
import Head from "next/head";

import MainLayout from "@/components/layouts/MainLayout";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Thrion Shop</title>
      </Head>
      <MainLayout>
        <Header />
        <main className="mt-[80px] mb-10 sm:flex sm:justify-center">
          <ul className="grid gap-6 sm:grid-cols-3 sm:w-full sm:max-w-5xl"></ul>
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
