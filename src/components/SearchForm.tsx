
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
      <h3 className="text-xl font-semibold text-white mb-2">Find Your Perfect Yacht</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-white mb-1.5 block">Your Name</Label>
          <Input 
            id="name" 
            placeholder="John Doe" 
            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus:border-white/50" 
          />
        </div>
        
        <div>
          <Label htmlFor="date" className="text-white mb-1.5 block">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className={cn(
                  "w-full justify-start text-left bg-white/20 border-white/20 text-white hover:bg-white/30",
                  !date && "text-white/50"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Select a date</span>}
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
          <Label htmlFor="guests" className="text-white mb-1.5 block">Number of Passengers</Label>
          <div className="relative">
            <Select>
              <SelectTrigger id="guests" className="w-full bg-white/20 border-white/20 text-white focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1-2">1-2 Passengers</SelectItem>
                  <SelectItem value="3-4">3-4 Passengers</SelectItem>
                  <SelectItem value="5-8">5-8 Passengers</SelectItem>
                  <SelectItem value="9-12">9-12 Passengers</SelectItem>
                  <SelectItem value="13+">13+ Passengers</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white/50">
              <Users size={16} />
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="type" className="text-white mb-1.5 block">Type of Yacht</Label>
          <Select>
            <SelectTrigger id="type" className="w-full bg-white/20 border-white/20 text-white focus:ring-0 focus:ring-offset-0">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="sail">Sailing Yacht</SelectItem>
                <SelectItem value="motor">Motor Yacht</SelectItem>
                <SelectItem value="catamaran">Catamaran</SelectItem>
                <SelectItem value="luxury">Luxury Yacht</SelectItem>
                <SelectItem value="mega">Mega Yacht</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full bg-gold hover:bg-gold/90 text-navy-dark" size="lg">
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
