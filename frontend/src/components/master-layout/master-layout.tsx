'use client';

import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { ButtonRedirectLogin } from '../ui/button/button-redirect-login';
import { AuthProvider, useUseAuth } from '@/hooks/useAuth';

export function MasterLayout({ children }: { children: React.ReactNode }) {
  const { handleLoginUser } = useUseAuth();

  return (
    <>
      <Header />
      <main className="container py-8 px-12">
        <AuthProvider>
          {children}

          <ButtonRedirectLogin handleLoginUser={handleLoginUser} />
        </AuthProvider>
      </main>
      <Footer />
    </>
  );
}
