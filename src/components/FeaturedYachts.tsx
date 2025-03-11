
import { useState } from 'react';
import YachtCard from './YachtCard';
import { Button } from '@/components/ui/button';
import { Yacht } from '@/types';

const featuredYachts: Yacht[] = [
  {
    id: '1',
    name: 'Serenity Sail',
    category: 'Yate de Vela',
    image: 'https://images.unsplash.com/photo-1599772335946-23f8573a49c3?q=80&w=1000',
    rating: 4.8,
    reviews: 12,
    capacity: 6,
    cabins: 3,
    length: 42,
    pricePerDay: 1250
  },
  {
    id: '2',
    name: 'Ocean Explorer',
    category: 'Catamarán',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1000',
    rating: 4.9,
    reviews: 31,
    capacity: 8,
    cabins: 4,
    length: 50,
    pricePerDay: 1800
  },
  {
    id: '3',
    name: 'Velocity',
    category: 'Yate a Motor',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=1000',
    rating: 4.7,
    reviews: 25,
    capacity: 10,
    cabins: 5,
    length: 62,
    pricePerDay: 2300
  },
  {
    id: '4',
    name: 'Luxury Wave',
    category: 'Mega Yate',
    image: 'https://images.unsplash.com/photo-1621406775527-76ace47159ce?q=80&w=1000',
    rating: 4.9,
    reviews: 19,
    capacity: 12,
    cabins: 6,
    length: 78,
    pricePerDay: 4500
  }
];

const FeaturedYachts = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredYachts = filter === 'all' 
    ? featuredYachts 
    : featuredYachts.filter(yacht => yacht.category.toLowerCase().includes(filter));
  
  return (
    <section id="yachts" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3 mb-6 md:mb-0">
            <span className="inline-block text-sm font-medium text-blue-600">Nuestra Colección</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark">Yates Destacados</h2>
            <p className="text-gray-600 max-w-lg">
              Selecciona entre nuestra flota premium de yates meticulosamente mantenidos para una experiencia inolvidable en el agua.
            </p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className="whitespace-nowrap"
            >
              Todos los Tipos
            </Button>
            <Button
              variant={filter === 'vela' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('vela')}
              className="whitespace-nowrap"
            >
              Vela
            </Button>
            <Button
              variant={filter === 'motor' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('motor')}
              className="whitespace-nowrap"
            >
              Motor
            </Button>
            <Button
              variant={filter === 'catamaran' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('catamaran')}
              className="whitespace-nowrap"
            >
              Catamarán
            </Button>
            <Button
              variant={filter === 'mega' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('mega')}
              className="whitespace-nowrap"
            >
              Mega
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredYachts.map((yacht) => (
            <YachtCard key={yacht.id} yacht={yacht} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="border-navy-dark text-navy-dark hover:bg-navy-dark hover:text-white"
          >
            Ver Todos los Yates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedYachts;
