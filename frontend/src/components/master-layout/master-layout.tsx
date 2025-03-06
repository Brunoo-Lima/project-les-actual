"use client";

import { ButtonRedirectLogin } from "../ui/button/button-redirect-login";
import { Sidebar } from "../sidebar/sidebar";

export function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex bg-background">
        <Sidebar />

        <section className="h-screen flex-grow px-8 py-5 overflow-auto">
          {children}
          <ButtonRedirectLogin />
        </section>
      </main>
    </>
  );
}
