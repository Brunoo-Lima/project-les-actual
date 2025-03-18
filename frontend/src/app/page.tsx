import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center gap-4 min-h-screen">
      <Link
        href="/produtos"
        className="text-white text-2xl hover:text-primary-dark transition duration-300 "
      >
        Produtos
      </Link>
      <Link
        href="/clientes"
        className="text-white text-2xl hover:text-primary-dark transition duration-300 "
      >
        Clientes
      </Link>
    </div>
  );
}
