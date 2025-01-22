'use client';

import { useState } from 'react';
import { AdminLogin } from './admin-login/admin-login';
import { UserLogin } from './user-login/user-login';

export function Login() {
  const [option, setOption] = useState<'ADMIN' | 'USER'>('USER');

  const handleChangeOption = (option: 'ADMIN' | 'USER') => {
    setOption(option);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col border border-background-dark rounded-md p-4 h-[400px] w-[500px]">
        <div className="flex gap-4 mb-6">
          <button type="button" onClick={() => handleChangeOption('USER')}>
            Usuário
          </button>
          <button type="button" onClick={() => handleChangeOption('ADMIN')}>
            Administrador
          </button>
        </div>

        {option === 'ADMIN' ? <AdminLogin /> : <UserLogin />}
      </div>
    </section>
  );
}
