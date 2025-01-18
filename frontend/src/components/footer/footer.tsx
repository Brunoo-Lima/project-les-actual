export function Footer() {
  return (
    <footer className="bg-backround-light text-white p-8 border-t border-primary-dark">
      <div className="flex gap-12">
        <div className="w-96">
          <p>Logo</p>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl">Início</h2>
          <ul className="flex gap-4">
            <li></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl">Sobre</h2>
          <ul>
            <li></li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl">Contato</h2>
          <ul>
            <li>11 9123-4567</li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h2 className="text-xl">Endereço</h2>
          <ul>
            <li>Rua Aquela lá, 152</li>
            <li>São Paulo</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
