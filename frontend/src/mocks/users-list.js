export const usersList = [
  {
    id: 1,
    name: 'Bruno Lima',
    email: 'Jpj4A@example.com',
    created_at: '15/02/2025',
    updated_at: '15/02/2025',
    orders: [
      {
        id: 1,
        status: 'Pendente',
        created_at: '15/02/2025',
        updated_at: '15/02/2025',
        items: [
          {
            id: 1,
            name: 'Naruto Uzumaki - Naruto',
            price: 200,
            quantity: 1,
          },
          {
            id: 2,
            name: 'Luffy - One Piece',
            price: 350,
            quantity: 1,
          },
        ],
      },
      {
        id: 2,
        status: 'Cancelado',
        created_at: '01/01/2025',
        updated_at: '10/02/2025',
        items: [
          {
            id: 1,
            name: 'Dragon Ball - Goku',
            price: 500,
            quantity: 1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Teste Souza',
    email: 'teste@example.com',
    created_at: '10/01/2025',
    updated_at: '28/01/2025',
    orders: [
      {
        id: 1,
        status: 'Finalizado',
        created_at: '15/02/2025',
        updated_at: '15/02/2025',
        items: [
          {
            id: 1,
            name: 'Luffy - One Piece',
            price: 350,
            quantity: 1,
          },
        ],
      },
    ],
  },
];
