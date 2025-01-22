import { MasterLayout } from '@/components/master-layout/master-layout';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MasterLayout>{children}</MasterLayout>;
}
