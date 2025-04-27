interface ITabActionsProps {
  active: boolean;
  textButton: string;
  onClick: () => void;
}

export function TabActions({ active, textButton, onClick }: ITabActionsProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        active ? "border-b-2 border-primary-dark" : ""
      } min-w-max w-max h-8 px-8`}
    >
      {textButton}
    </button>
  );
}
