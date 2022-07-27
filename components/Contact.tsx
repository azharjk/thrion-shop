import Image from "next/image";

export default function Contact() {
  const iconSize = 28;

  return (
    <section className="bg-slate-100 w-full px-4 py-10">
      <h3 className="text-xs text-center uppercase font-bold mb-6">Contact</h3>
      <p className="text-center my-6 font-light text-[18px]">
        Contact us by WhatsApp, and Instagram to ask anything or place an order
      </p>
      <div className="flex justify-center gap-6">
        <a href="#">
          <div>
            <Image
              src="/assets/whatsapp.png"
              width={iconSize}
              height={iconSize}
              alt="WhatsApp icon"
            />
          </div>
        </a>
        <a
          href="https://www.instagram.com/thrion.co/"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <Image
              src="/assets/instagram.png"
              width={iconSize}
              height={iconSize}
              alt="Instagram icon"
            />
          </div>
        </a>
        <a href="#">
          <div>
            <Image
              src="/assets/tik-tok-bold.png"
              width={iconSize}
              height={iconSize}
              alt="TikTok icon"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
