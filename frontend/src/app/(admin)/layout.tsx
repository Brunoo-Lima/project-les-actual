import { MasterLayout } from "@/components/master-layout/master-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MasterLayout>{children}</MasterLayout>;
}
