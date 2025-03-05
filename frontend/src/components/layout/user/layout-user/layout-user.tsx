"use client";

import { Footer } from "@/components/footer/footer";
import { HeaderUser } from "../header-user/header-user";
import { AuthProvider } from "@/hooks/useAuth";
import { ButtonRedirectLogin } from "@/components/ui/button/button-redirect-login";
import { ButtonChatbot } from "@/components/chatbot/button-chatbot";
import { Chatbot } from "@/components/chatbot/chatbot";
import { useState } from "react";
import { DataProvider } from "@/hooks/useData";

export function LayoutUser({ children }: { children: React.ReactNode }) {
  const [isOpenChatbot, setIsOpenChatbot] = useState<boolean>(false);

  return (
    <>
      <AuthProvider>
        <DataProvider>
          <HeaderUser />
          <main className="container mx-auto py-8 px-12 relative">
            {children}

            <ButtonRedirectLogin />

            {isOpenChatbot && <Chatbot />}

            <ButtonChatbot onClick={() => setIsOpenChatbot(!isOpenChatbot)} />
          </main>
          <Footer />
        </DataProvider>
      </AuthProvider>
    </>
  );
}
