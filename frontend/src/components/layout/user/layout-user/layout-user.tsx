'use client';

import { Footer } from '@/components/footer/footer';
import { HeaderUser } from '../header-user/header-user';
import { LogInIcon } from 'lucide-react';
import { AuthProvider, useUseAuth } from '@/hooks/useAuth';
import { ButtonRedirectLogin } from '@/components/ui/button/button-redirect-login';

export function LayoutUser({ children }: { children: React.ReactNode }) {
  const { handleChangeUser } = useUseAuth();

  return (
    <>
      <HeaderUser />
      <AuthProvider>
        <main className="container mx-auto py-8 px-12 relative">
          {children}

          <ButtonRedirectLogin
            handleChangeUser={() => handleChangeUser('ADMIN')}
          />
        </main>
      </AuthProvider>
      <Footer />
    </>
  );
}
