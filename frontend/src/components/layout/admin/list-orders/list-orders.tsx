"use client";

import { useState } from "react";
import { TitlePage } from "@/components/ui/title/title-page/title-page";
import { TabActions } from "./tab-actions/tab-actions";
import { ListProgress } from "./list-progress";
import { ListComplete } from "./list-complete";
import { ListReplacement } from "./list-replacement";
import { ListWaitingApproval } from "./list-waiting-approval";
import { ListReplacementRequest } from "./list-replacement-request";
import { ListReplacementReturned } from "./list-replacement-returned";

type Tab =
  | "COMPLETE"
  | "PROGRESS"
  | "REPLACEMENT"
  | "WAITING_APPROVAL"
  | "REPLACEMENT_PROGRESS"
  | "REPLACEMENT_RETURNED";

export function ListOrders() {
  const [option, setOption] = useState<Tab>("WAITING_APPROVAL");

  const handleChangeOption = (option: Tab) => {
    setOption(option);
  };

  return (
    <section className="py-4">
      <TitlePage title="Lista de pedidos" />

      <div className="flex gap-2 items-center mb-6">
        <TabActions
          textButton="Aguardando aprovação"
          active={option === "WAITING_APPROVAL"}
          onClick={() => handleChangeOption("WAITING_APPROVAL")}
        />
        <TabActions
          textButton="Em andamento"
          active={option === "PROGRESS"}
          onClick={() => handleChangeOption("PROGRESS")}
        />
        <TabActions
          textButton="Completo"
          active={option === "COMPLETE"}
          onClick={() => handleChangeOption("COMPLETE")}
        />
        <TabActions
          textButton="Troca/Devolução"
          active={option === "REPLACEMENT"}
          onClick={() => handleChangeOption("REPLACEMENT")}
        />

        <TabActions
          textButton="Trocas/devoluções em andamento"
          active={option === "REPLACEMENT_PROGRESS"}
          onClick={() => handleChangeOption("REPLACEMENT_PROGRESS")}
        />

        <TabActions
          textButton="Trocas/devoluções finalizadas"
          active={option === "REPLACEMENT_RETURNED"}
          onClick={() => handleChangeOption("REPLACEMENT_RETURNED")}
        />
      </div>

      {option === "WAITING_APPROVAL" && <ListWaitingApproval />}

      {option === "PROGRESS" && <ListProgress />}

      {option === "COMPLETE" && <ListComplete />}

      {option === "REPLACEMENT" && <ListReplacement />}

      {option === "REPLACEMENT_PROGRESS" && <ListReplacementRequest />}

      {option === "REPLACEMENT_RETURNED" && <ListReplacementReturned />}
    </section>
  );
}
