
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Yacht } from '@/types';
import { cn } from '@/lib/utils';

interface YachtCardProps {
  yacht: Yacht;
}

const YachtCard = ({ yacht }: YachtCardProps) => {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="aspect-[4/3] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-dark/20 z-10"></div>
        <img 
          src={yacht.image} 
          alt={yacht.name} 
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-block py-1 px-2 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-navy-dark">
            {yacht.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-navy-dark">{yacht.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="ml-1 text-sm font-medium">{yacht.rating}</span>
            <span className="ml-1 text-xs text-gray-500">({yacht.reviews})</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex space-x-3">
            <div>
              <span className="block text-xs">Invitados</span>
              <span className="font-medium text-navy-dark">{yacht.capacity}</span>
            </div>
            <div>
              <span className="block text-xs">Cabinas</span>
              <span className="font-medium text-navy-dark">{yacht.cabins}</span>
            </div>
            <div>
              <span className="block text-xs">Longitud</span>
              <span className="font-medium text-navy-dark">{yacht.length} ft</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2 flex items-center justify-between border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500">Precio por día</span>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-navy-dark">${yacht.pricePerDay}</span>
            </div>
          </div>
          
          <Button 
            size="sm" 
            className={cn(
              "transition-all duration-300",
              "bg-white text-navy-dark border border-navy-dark/20 hover:bg-navy-dark hover:text-white"
            )}
          >
            Ver Detalles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YachtCard;
