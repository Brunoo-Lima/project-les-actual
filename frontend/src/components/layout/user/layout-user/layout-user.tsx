"use client";

import { Footer } from "@/components/footer/footer";
import { HeaderUser } from "../header-user/header-user";
import { AuthProvider, useUseAuth } from "@/hooks/useAuth";
import { ButtonRedirectLogin } from "@/components/ui/button/button-redirect-login";
import { ButtonChatbot } from "@/components/chatbot/button-chatbot";
import { Chatbot } from "@/components/chatbot/chatbot";

export function LayoutUser({ children }: { children: React.ReactNode }) {
  const { handleChangeUser, isOpenChatbot, setIsOpenChatbot } = useUseAuth();

  return (
    <>
      <HeaderUser />
      <AuthProvider>
        <main className="container mx-auto py-8 px-12 relative">
          {children}

          <ButtonRedirectLogin
            handleChangeUser={() => handleChangeUser("ADMIN")}
          />

          {isOpenChatbot && <Chatbot />}

          <ButtonChatbot onClick={() => setIsOpenChatbot(!isOpenChatbot)} />
        </main>
      </AuthProvider>
      <Footer />
    </>
  );
}
