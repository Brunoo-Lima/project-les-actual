import { Footer } from '@/components/footer/footer';
import { HeaderUser } from '../header-user/header-user';

export function LayoutUser({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderUser />
      <main className="container py-8 px-12">{children}</main>
      <Footer />
    </>
  );
}
