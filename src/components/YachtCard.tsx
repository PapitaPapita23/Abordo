
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Yacht } from '@/types';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface YachtCardProps {
  yacht: Yacht;
}

const YachtCard = ({ yacht }: YachtCardProps) => {
  const navigate = useNavigate();

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
          <span className="inline-flex h-6 px-2 items-center justify-center gap-2 rounded-full bg-white bg-opacity-90 backdrop-blur-md text-xs font-medium text-navy-dark">
            {yacht.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-4 font-inter">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-[#152B3D]">{yacht.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-gold text-gold" />
            <span className="ml-1 text-sm font-medium text-[#075985] ">{yacht.rating}</span>
            <span className="ml-1 text-xs text-[#8CB7D8]">({yacht.reviews})</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex space-x-3">
            <div>
              <span className="block text-xs text-[#8CB7D8]">Invitados</span>
              <span className="font-medium text-[#8CB7D8]">{yacht.capacity}</span>
            </div>
            <div>
              <span className="block text-xs text-[#8CB7D8]">Cabinas</span>
              <span className="font-medium text-[#8CB7D8]">{yacht.cabins}</span>
            </div>
            <div>
              <span className="block text-xs text-[#8CB7D8]">Longitud</span>
              <span className="font-medium text-[#8CB7D8]">{yacht.length} ft</span>
            </div>
          </div>
        </div>
        
        <div className="pt-2 flex items-center justify-between border-t border-gray-100">
          <div>
            <span className="text-xs text-[#8CB7D8]">Precio por día</span>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-[[#152B3D]]">${yacht.pricePerDay}</span>
            </div>
          </div>
          
          <Button 
            size="sm" 
            className={cn(
              "transition-all duration-300",
              "bg-[#152B3D] text-[#F5EEE7] border border-navy-dark/20 hover:bg-navy-dark hover:text-white"
            )}
            onClick={() => navigate(`/yates/${yacht.id}`)}
          >
            Ver Detalles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YachtCard;
