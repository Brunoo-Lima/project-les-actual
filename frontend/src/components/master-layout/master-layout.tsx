import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';

export function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen min-h-screen">
      <Header />
      <main className="container py-8 px-12">{children}</main>
      <Footer />
    </div>
  );
}
