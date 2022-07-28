import Image from "next/image";

interface HorizontalProductCardProps {
  src: string;
  title: string;
  price_html: string;
}

export default function HorizontalProductCard({
  src,
  title,
  price_html,
}: HorizontalProductCardProps) {
  return (
    <div className="flex gap-3">
      <div>
        <Image
          loader={() => src}
          unoptimized
          src={`${process.env["NEXT_PUBLIC_API_HOST"]}${src}`}
          width={100}
          height={100}
          alt="Thrion product"
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <span>{title}</span>
        <div className="flex justify-end items-center gap-2">
          <span className="font-semibold text-lg">{price_html}</span>
          <span>&times;1</span>
        </div>
      </div>
    </div>
  );
}
