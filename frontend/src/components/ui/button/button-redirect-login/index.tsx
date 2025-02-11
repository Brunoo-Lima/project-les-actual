import { LogInIcon } from 'lucide-react';

interface IButtonRedirectLoginProps {
  handleChangeUser: () => void;
}

export function ButtonRedirectLogin({
  handleChangeUser,
}: IButtonRedirectLoginProps) {
  return (
    <div className="fixed bottom-4 right-4 rounded-full bg-primary p-3 cursor-pointer shadow-sm shadow-primary transition duration-300 hover:bg-primary-dark hover:scale-105">
      <LogInIcon onClick={handleChangeUser} size={24} color="#000000" />
    </div>
  );
}
