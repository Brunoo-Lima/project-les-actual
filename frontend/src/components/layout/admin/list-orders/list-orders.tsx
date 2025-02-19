"use client";

import { useState } from "react";
import { TitlePage } from "@/components/ui/title/title-page/title-page";
import { TabActions } from "./tab-actions/tab-actions";
import { ListProgress } from "./list-progress";
import { ListComplete } from "./list-complete";
import { ListReplacement } from "./list-replacement";

type Tab = "COMPLETE" | "PROGRESS" | "REPLACEMENT";

export function ListOrders() {
  const [option, setOption] = useState<Tab>("PROGRESS");

  const handleChangeOption = (option: Tab) => {
    setOption(option);
  };

  return (
    <section className="py-4">
      <TitlePage title="Lista de pedidos" />

      <div className="flex gap-2 items-center mb-6">
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
          textButton="Troca"
          active={option === "REPLACEMENT"}
          onClick={() => handleChangeOption("REPLACEMENT")}
        />
      </div>

      {option === "PROGRESS" && <ListProgress />}

      {option === "COMPLETE" && <ListComplete />}

      {option === "REPLACEMENT" && <ListReplacement />}
    </section>
  );
}

