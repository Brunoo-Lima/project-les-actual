// "use client";

// import { useState } from "react";
// import { Tag } from "@phosphor-icons/react";
// import Item from "./item/item";
// import {
//   House,
//   LibraryIcon,
//   LogOut,
//   ShoppingBagIcon,
//   UsersRoundIcon,
// } from "lucide-react";
// import { Tooltip } from "../ui/tooltip/tooltip";

// export function Sidebar() {
//   const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

//   const handleMouseEnter = (tooltip: string) => {
//     setActiveTooltip(tooltip);
//   };

//   const handleMouseLeave = () => {
//     setActiveTooltip(null);
//   };

//   return (
//     <div className="h-screen bg-background w-16 min-w-16 py-4 pl-2">
//       <div className="flex flex-col gap-y-3 pb-4 w-16 relative shadow-md py-8 h-full  border border-primary-dark rounded-lg">
//         <div className="p-4 block text-primary-dark">logo</div>

//         <div className="flex-1 my-10">
//           <nav className="flex flex-col items-center gap-y-6">
//             <Item
//               activeTooltip={activeTooltip}
//               href="/"
//               icon={<House size={24} color="#2DD4BF" />}
//               text="Início"
//               handleMouseEnter={() => handleMouseEnter("home")}
//               handleMouseLeave={handleMouseLeave}
//               tooltip="home"
//             />

//             <Item
//               activeTooltip={activeTooltip}
//               href="/clientes"
//               icon={<UsersRoundIcon size={24} color="#2DD4BF" />}
//               text="Cliente"
//               handleMouseEnter={() => handleMouseEnter("client")}
//               handleMouseLeave={handleMouseLeave}
//               tooltip="client"
//             />

//             <Item
//               activeTooltip={activeTooltip}
//               href="/livros"
//               icon={<LibraryIcon size={24} color="#2DD4BF" />}
//               text="Livros"
//               handleMouseEnter={() => handleMouseEnter("book")}
//               handleMouseLeave={handleMouseLeave}
//               tooltip="book"
//             />

//             <Item
//               activeTooltip={activeTooltip}
//               href="/vendas"
//               icon={<Tag size={24} color="#2DD4BF" weight="bold" />}
//               text="Vendas"
//               handleMouseEnter={() => handleMouseEnter("sale")}
//               handleMouseLeave={handleMouseLeave}
//               tooltip="sale"
//             />

//             <Item
//               activeTooltip={activeTooltip}
//               href="/carrinho"
//               icon={<ShoppingBagIcon size={24} color="#2DD4BF" />}
//               text="Carrinho"
//               handleMouseEnter={() => handleMouseEnter("cart")}
//               handleMouseLeave={handleMouseLeave}
//               tooltip="cart"
//             />
//           </nav>
//         </div>

//         <div
//           className="relative flex flex-col items-center"
//           onMouseEnter={() => handleMouseEnter("logout")}
//           onMouseLeave={handleMouseLeave}
//         >
//           <button type="button" className="m-auto w-max">
//             <LogOut size={24} color="#2DD4BF" />
//           </button>
//           {activeTooltip === "logout" && <Tooltip text="Sair" />}
//         </div>
//       </div>
//     </div>
//   );
// }
