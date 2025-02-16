export const usersList = [
  {
    id: 1,
    name: "Bruno Lima",
    email: "Jpj4A@example.com",
    cpf: "123.456.789-00",
    dateOfBirth: "01/01/2000",
    created_at: "15/02/2025",
    updated_at: "15/02/2025",
    gender: "Masculino",
    status: "Ativo",
    phones: [
      {
        id: 1,
        typePhone: "Fixo",
        numberPhone: "1234567890",
      },
    ],
    addresses: [
      {
        id: 1,
        identifier: "Casa",
        street: "Rua A",
        number: "123",
        neighborhood: "Bairro A",
        city: "Suzano",
        state: "SP",
        country: "Brasil",
        zipCode: "08695065",
        typeResidence: "Casa",
        typePublicPlace: "Rua",
        delivery: true,
        charge: true,
        observation: "Observação",
        identifierDelivery: "Casa",
      },
    ],
    creditCards: [
      {
        id: 1,
        number: "1234567890123456",
        expirationDate: "12/2025",
        cvv: "123",
        namePrinted: "Bruno Lima",
        flag: "Visa",
      },
    ],
    orders: [
      {
        id: 1,
        status: "Pendente",
        created_at: "15/02/2025",
        updated_at: "15/02/2025",
        items: [
          {
            id: 1,
            name: "Naruto Uzumaki - Naruto",
            price: 200,
            quantity: 1,
          },
          {
            id: 2,
            name: "Luffy - One Piece",
            price: 350,
            quantity: 1,
          },
        ],
      },
      {
        id: 2,
        status: "Cancelado",
        created_at: "01/01/2025",
        updated_at: "10/02/2025",
        items: [
          {
            id: 1,
            name: "Dragon Ball - Goku",
            price: 500,
            quantity: 1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Teste Souza",
    email: "teste@example.com",
    dateOfBirth: "01/01/2000",
    created_at: "10/01/2025",
    updated_at: "28/01/2025",
    gender: "Masculino",
    cpf: "123.456.789-00",
    status: "Inativo",
    phones: [
      {
        id: 1,
        typePhone: "Fixo",
        numberPhone: "1234567890",
      },
    ],
    addresses: [
      {
        id: 1,
        identifier: "Tia",
        street: "Rua A",
        number: "123",
        neighborhood: "Bairro A",
        city: "Suzano",
        state: "SP",
        country: "Brasil",
        zipCode: "08695035",
        typeResidence: "Casa",
        typePublicPlace: "Rua",
        delivery: true,
        charge: false,
        observation: "",
        identifierDelivery: "Tia",
      },
    ],
    creditCards: [
      {
        id: 1,
        number: "1234567890123456",
        expirationDate: "12/2025",
        cvv: "123",
        namePrinted: "Bruno Lima",
        flag: "Visa",
      },
    ],

    orders: [
      {
        id: 1,
        status: "Finalizado",
        created_at: "15/02/2025",
        updated_at: "15/02/2025",
        items: [
          {
            id: 1,
            name: "Luffy - One Piece",
            price: 350,
            quantity: 1,
          },
        ],
      },
    ],
  },
];
