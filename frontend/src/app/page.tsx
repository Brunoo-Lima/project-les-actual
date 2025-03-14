import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center gap-4 min-h-screen">
      <Link
        href="/produtos"
        className="text-white text-2xl hover:text-primary-dark transition duration-300 "
      >
        produtos
      </Link>
      <Link
        href="/usuarios"
        className="text-white text-2xl hover:text-primary-dark transition duration-300 "
      >
        usuarios
      </Link>
    </div>
  );
}
