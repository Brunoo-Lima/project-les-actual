import { GlobeIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-backround-light text-white py-8 px-12 border-t border-primary-dark">
      <div className="flex gap-12">
        <div className="w-96">
          <GlobeIcon size={32} color="#0d9488" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl">Início</h2>
          <ul className="flex gap-4 *:text-textColor-dark *:text-sm">
            <li></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl">Sobre</h2>
          <ul className="*:text-textColor-dark *:text-sm">
            <li></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl">Contato</h2>
          <ul className="*:text-textColor-dark *:text-sm">
            <li>11 9123-4567</li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl">Endereço</h2>
          <ul className="*:text-textColor-dark *:text-sm">
            <li>Rua Aquela lá, 152</li>
            <li>São Paulo</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
