'use client';

import { Footer } from '@/components/footer/footer';
import { HeaderUser } from '../header-user/header-user';
import { LogInIcon } from 'lucide-react';
import { AuthProvider, useUseAuth } from '@/hooks/useAuth';
import { ButtonRedirectLogin } from '@/components/ui/button/button-redirect-login';

export function LayoutUser({ children }: { children: React.ReactNode }) {
  const { handleLoginUser } = useUseAuth();

  return (
    <>
      <HeaderUser />
      <AuthProvider>
        <main className="container py-8 px-12 relative">
          {children}

          <ButtonRedirectLogin handleLoginUser={handleLoginUser} />
        </main>
      </AuthProvider>
      <Footer />
    </>
  );
}
