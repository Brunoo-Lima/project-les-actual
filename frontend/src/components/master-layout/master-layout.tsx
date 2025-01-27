'use client';

import { ButtonRedirectLogin } from '../ui/button/button-redirect-login';
import { AuthProvider, useUseAuth } from '@/hooks/useAuth';
import { Sidebar } from '../sidebar/sidebar';

export function MasterLayout({ children }: { children: React.ReactNode }) {
  const { handleLoginUser } = useUseAuth();

  return (
    <>
      <main className="flex bg-background">
        <AuthProvider>
          <Sidebar />

          <section className="h-screen flex-grow px-8 py-5 overflow-auto">
            {children}
            <ButtonRedirectLogin handleLoginUser={handleLoginUser} />
          </section>
        </AuthProvider>
      </main>
    </>
  );
}
