'use client';

import { useState } from 'react';
import { AdminLogin } from './admin-login/admin-login';
import { UserLogin } from './user-login/user-login';
import { ButtonOptionLogin } from '../ui/button/button-option-login';
import { useUseAuth } from '@/hooks/useAuth';

export function Login() {
  const { setUser, user } = useUseAuth();

  const [option, setOption] = useState<'ADMIN' | 'USER'>('USER');

  const handleChangeOption = (option: 'ADMIN' | 'USER') => {
    setOption(option);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col border border-background-dark rounded-md h-[400px] w-[500px]">
        <div className="flex mb-6">
          <ButtonOptionLogin
            type="button"
            onClick={() => handleChangeOption('USER')}
            text="Usuário"
            className={` ${
              option === 'USER' &&
              'bg-primary text-background rounded-tl-md font-bold'
            }`}
          />

          <ButtonOptionLogin
            type="button"
            onClick={() => handleChangeOption('ADMIN')}
            text="Administrador"
            className={`${
              option === 'ADMIN' && 'bg-primary text-background font-bold'
            }`}
          />
        </div>

        <div className="p-4">
          {option === 'ADMIN' ? <AdminLogin /> : <UserLogin />}
        </div>
      </div>
    </section>
  );
}
