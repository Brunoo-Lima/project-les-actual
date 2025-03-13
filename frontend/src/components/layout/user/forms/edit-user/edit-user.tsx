"use client";

import { useEffect, useState } from "react";
import { ButtonCancel } from "@/components/ui/button/button-cancel/button-cancel";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { TitlePage } from "@/components/ui/title/title-page/title-page";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { formatPhone } from "@/utils/mask/format-phone";
import { detailClient } from "@/services/client";
import { PersonalUser } from "./personal-user";
import { AddressFormUserEdit } from "./address-form-user-edit";
import { CreditCardFormUserEdit } from "./credit-card-form-user-edit";
import { IUser } from "@/@types/IUser";
import { PhoneFormUserEdit } from "./phone-form-user-edit";

export type SectionType =
  | "addresses"
  | "phones"
  | "creditCards"
  | "personal"
  | null;

export function EditUser() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [editSection, setEditSection] = useState<SectionType>(null);
  const [client, setClient] = useState<IUser | null>(null);

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const data = await detailClient(id as string);

          setClient(data);
        } catch (error) {
          toast.error("Erro ao buscar dados do usuário");
        } finally {
          setLoading(false);
        }
      };
      fetchClient();
    }
  }, [id]);

  const startEditingSection = (section: typeof editSection) => {
    setEditSection(section);
  };

  const stopEditingSection = () => setEditSection(null);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!client) {
    return <div>Usuário nao encontrado</div>;
  }

  return (
    <section className="min-h-screen py-8">
      <TitlePage title="Editar meus dados" />

      <PersonalUser
        clientData={client}
        editSection={editSection}
        startEditingSection={startEditingSection}
        stopEditingSection={stopEditingSection}
      />

      <div className="w-[900px] flex flex-col gap-y-4">
        {/* Telefones */}
        <PhoneFormUserEdit
          phones={client.phones || []}
          userId={client.id}
          editSection={editSection}
          startEditingSection={startEditingSection}
          stopEditingSection={stopEditingSection}
        />

        {/* Endereços */}
        <AddressFormUserEdit
          addresses={client.addresses || []}
          editSection={editSection}
          startEditingSection={startEditingSection}
          stopEditingSection={stopEditingSection}
        />

        {/* Cartões de Crédito */}
        <CreditCardFormUserEdit
          creditCards={client.creditCards || []}
          editSection={editSection}
          startEditingSection={startEditingSection}
          stopEditingSection={stopEditingSection}
        />

        <div className="flex gap-4 mt-4">
          <ButtonGeneral
            text="Salvar"
            type="button"
            className="w-full"
            onClick={() => toast.success("Dados salvos com sucesso!")}
          />
          <ButtonCancel
            text="Cancelar"
            className="w-full"
            onClick={() => router.push("/produtos")}
          />
        </div>
      </div>
    </section>
  );
}
