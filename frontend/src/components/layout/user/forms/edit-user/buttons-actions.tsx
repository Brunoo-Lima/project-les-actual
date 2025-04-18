import { ButtonGeneral } from "@/components/ui/button/button-general";
import { SectionType } from "./edit-user";
import { CheckIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";

interface IButtonsActionsProps {
  editSection: SectionType;
  startEditingSection: (section: SectionType) => void;
  stopEditingSection: () => void;
  section: SectionType;
  textButtonSection: string;
}

export function ButtonsActions({
  editSection,
  startEditingSection,
  stopEditingSection,
  section,
  textButtonSection,
}: IButtonsActionsProps) {
  return (
    <div className="flex gap-2">
      {editSection === section ? (
        <Button
          text="Salvar"
          type="button"
          className="bg-blue-700 hover:bg-blue-700/80 w-28 text-white"
          onClick={stopEditingSection}
          icon={<CheckIcon size={20} />}
        />
      ) : (
        <Button
          text="Editar"
          type="button"
          className="bg-blue-700 hover:bg-blue-700/80 w-28 text-white "
          onClick={() => startEditingSection(section)}
          icon={<PencilIcon size={16} />}
        />
      )}

      <Button
        className="bg-emerald-800 hover:bg-emerald-800/80 text-white w-44"
        text={textButtonSection}
        type="button"
      />
    </div>
  );
}
