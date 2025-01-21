import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';

export function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container py-8 px-12">{children}</main>
      <Footer />
    </>
  );
}
