import Image from "next/image";

interface ProductCardProps {
  src: string;
  alt: string;
  name: string;
  price: string;
}

export default function ProductCard({
  src,
  alt,
  name,
  price,
}: ProductCardProps) {
  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="w-full px-4 max-w-sm flex justify-center">
          <Image
            loader={() => src}
            src={src}
            width={300}
            height={300}
            // layout="responsive"
            priority
            unoptimized
            alt={alt}
          />
        </div>
      </div>
      <div className="px-4">
        <h3 className="text-center truncate text-lg mt-4">{name}</h3>
        <p className="text-center truncate text-sm mt-2">{price}</p>
      </div>
    </div>
  );
}
