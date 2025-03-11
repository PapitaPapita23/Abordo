
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { CalendarIcon, Users } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const SearchForm = () => {
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold text-[#152B3D] mb-2">Encuentra Tu Yate Perfecto</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-[#152B3D] mb-1.5 block">Tu Nombre</Label>
          <Input 
            id="name" 
            placeholder="Juan Pérez" 
            className="bg-white/20 border-white/20 text-[#152B3D] placeholder:text-[#274257] focus:border-white/50" 
          />
        </div>
        
        <div>
          <Label htmlFor="date" className="text-[#152B3D] mb-1.5 block">Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className={cn(
                  "w-full justify-start text-left bg-white/20 border-white/20 text-[#152B3D] hover:bg-white/30",
                  !date && "text-white/50"
                )}
              >
                <CalendarIcon className="text-[#274257] mr-2 h-4 w-4" />
                {date ? <span className="text-[#274257]">{format(date, "PPP")}</span> : <span className="text-[#274257]">Selecciona una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label htmlFor="guests" className="text-[#152B3D] mb-1.5 block">Número de Pasajeros</Label>
          <div className="relative">
            <Select>
              <SelectTrigger id="guests" className="w-full bg-white/20 border-white/20 text-[#152B3D] focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Seleccionar pasajeros" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1-2">1-2 Pasajeros</SelectItem>
                  <SelectItem value="3-4">3-4 Pasajeros</SelectItem>
                  <SelectItem value="5-8">5-8 Pasajeros</SelectItem>
                  <SelectItem value="9-12">9-12 Pasajeros</SelectItem>
                  <SelectItem value="13+">13+ Pasajeros</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-[#274257]">
              <Users size={16} />
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="type" className="text-[#152B3D] mb-1.5 block">Tipo de Yate</Label>
          <Select>
            <SelectTrigger id="type" className="w-full bg-white/20 border-white/20 text-[#152B3D] focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="sail">Yate de Vela</SelectItem>
                <SelectItem value="motor">Yate a Motor</SelectItem>
                <SelectItem value="catamaran">Catamarán</SelectItem>
                <SelectItem value="luxury">Yate de Lujo</SelectItem>
                <SelectItem value="mega">Mega Yate</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full bg-[#152B3D] hover:bg-[#599ACF] text-white" size="lg">
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
