import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  href?: string;
}

export default function Logo({ className = "", href }: LogoProps) {
  const imageElement = (
    <Image
      src="/img/thawwafi-logofull.png"
      alt="Thawwafi Tour"
      width={176}
      height={53}
      className={`h-10 w-auto object-contain ${className}`}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center hover:opacity-90 transition-opacity">
        {imageElement}
      </Link>
    );
  }

  return imageElement;
}


