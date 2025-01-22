import { LayoutUser } from '@/components/layout/user/layout-user/layout-user';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutUser>{children}</LayoutUser>;
}
