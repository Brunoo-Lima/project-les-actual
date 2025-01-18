import Link from 'next/link';

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-background border-b border-primary-dark text-white">
      <h1>Action Figure</h1>

      <nav className="flex gap-4">
        <Link href={'/inicio'}>Início</Link>
        <Link href={'/produto'}>Produtos</Link>
        <Link href={'/vendas'}>Vendas</Link>
        <Link href={'/carrinho'}>Carrinho</Link>
      </nav>
    </header>
  );
}
