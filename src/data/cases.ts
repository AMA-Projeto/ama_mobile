export type AnimalCase = {
  id: string;
  title: string;
  location: string;
  distance: string;
  status: string;
  animalType: string;
  age: string;
  tags: string[];
  description: string;
  images: string[];
  author: {
    name: string;
    imageUri: string;
  };
};

export const initialCases: AnimalCase[] = [
  {
    id: '1',
    title: 'Cachorro ferido',
    location: 'Centro, Anápolis - GO',
    distance: '0,8 km de você',
    status: 'Urgente',
    animalType: 'Cachorro',
    age: 'Adulto',
    tags: ['Cachorro', 'Urgente'],
    description:
      'Encontrei este cachorro próximo à praça do centro. Ele aparenta estar machucado em uma das patas e precisa de atendimento. Está assustado e não consegui verificar se possui tutor. Precisamos de ajuda para garantir que ele receba os cuidados necessários. Se alguém puder ajudar com transporte ou atendimento veterinário, entre em contato.',
    images: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=900',
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=900',
    ],
    author: {
      name: 'Ana Oliveira',
      imageUri:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    },
  },
  {
    id: '2',
    title: 'Gato abandonado',
    location: 'Jundiaí, Anápolis - GO',
    distance: '1,2 km de você',
    status: 'Urgente',
    animalType: 'Gato',
    age: 'Adulto',
    tags: ['Gato', 'Urgente'],
    description:
      'Este gato foi encontrado sozinho e precisa de ajuda. É importante verificar suas condições de saúde e se possui tutor. Quem puder ajudar com acolhimento ou avaliação veterinária pode entrar em contato.',
    images: [
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900',
    ],
    author: {
      name: 'Ana Oliveira',
      imageUri:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    },
  },
  {
    id: '3',
    title: 'Cão procurando abrigo',
    location: 'Próximo a uma praça, Anápolis - GO',
    distance: '0,8 km de você',
    status: 'Urgente',
    animalType: 'Cachorro',
    age: 'Adulto',
    tags: ['Cachorro', 'Urgente'],
    description:
      'Animal encontrado próximo a uma praça e aparentemente sem abrigo. Precisa de avaliação e de alguém que possa ajudar a encontrar um local seguro.',
    images: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=900',
    ],
    author: {
      name: 'Ana Oliveira',
      imageUri:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    },
  },
  {
    id: '4',
    title: 'Gatinho para resgate',
    location: 'Anápolis - GO',
    distance: '1,4 km de você',
    status: 'Em busca de ajuda',
    animalType: 'Gato',
    age: 'Filhote',
    tags: ['Gato', 'Filhote'],
    description:
      'Este gatinho precisa de ajuda e avaliação. Uma pessoa que possa acolhê-lo temporariamente ou auxiliar no atendimento veterinário fará diferença.',
    images: [
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900',
    ],
    author: {
      name: 'Ana Oliveira',
      imageUri:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    },
  },
];