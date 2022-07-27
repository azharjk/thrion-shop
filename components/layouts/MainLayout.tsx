import Contact from "@/components/Contact";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      {children}
      <Contact />
      <footer className="px-4 py-6 text-center bg-black">
        <a
          className="text-sm text-white"
          href="https://www.flaticon.com/free-icons/code"
          title="code icons"
        >
          Code icons created by Freepik - Flaticon
        </a>
      </footer>
    </>
  );
}
