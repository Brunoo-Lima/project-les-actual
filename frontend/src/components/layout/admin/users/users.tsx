'use client';

import { TitlePage } from '@/components/ui/title/title-page/title-page';
import { TableUser } from './table/table-user';
import { IUser } from '@/@types/IUser';
import { useState } from 'react';
import { usersList } from './../../../../mocks/users-list';

export function Users() {
  const [users, setUsers] = useState<IUser[]>(usersList);

  const handleDeleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <section className="h-screen">
      <TitlePage title="Usuários" />

      <TableUser data={users} onDeleteUser={handleDeleteUser} />
    </section>
  );
}
