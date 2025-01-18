import Link from 'next/link';

interface IItemNavProps {
  href: string;
  text: string;
  cart?: boolean;
  cartCount?: number;
  isActive: boolean;
}

export function LinkNav({
  href,
  text,
  cart,
  cartCount,
  isActive,
}: IItemNavProps) {
  return (
    <Link
      href={href}
      className={`relative inline-block text-base ${
        isActive
          ? 'text-primary-dark hover:text-primary-dark font-semibold'
          : 'hover:text-primary-dark transition duration-300'
      } `}
    >
      {text}

      {cart && (
        <>
          <span className="absolute -top-2 -right-5 bg-primary text-primary-light text-base font-semibold rounded-full size-5 flex items-center justify-center">
            {cartCount}
          </span>
        </>
      )}
    </Link>
  );
}
