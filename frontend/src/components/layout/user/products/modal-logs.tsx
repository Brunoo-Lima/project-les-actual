import { Modal } from "@/components/modal";

interface IModalLogsProps {
  onClose: () => void;
}

export function ModalLogs({ onClose }: IModalLogsProps) {
  return (
    <Modal.Root className="w-[400px] h-[400px] space-y-6 p-4 rounded-md">
      <Modal.Header title="Logs" onClick={onClose} />

      <Modal.Content>logs de pesquisas aparecerão aqui</Modal.Content>
    </Modal.Root>
  );
}
