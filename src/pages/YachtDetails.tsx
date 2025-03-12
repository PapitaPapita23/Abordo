
import { useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Wifi, ChefHat, BedDouble, Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { allYachts } from '@/data/yachts';

const YachtDetails = () => {
  const { id } = useParams();
  const yacht = allYachts.find(y => y.id === id);

  if (!yacht) {
    return <div>Yacht not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="container mx-auto px-4 lg:px-8 pt-28 pb-16">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a los yates
        </Button>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="col-span-2 row-span-2">
            <img
              src={yacht.image}
              alt={yacht.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {[yacht.image, yacht.image, yacht.image].map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg">
              <img
                src={img}
                alt={`${yacht.name} view ${i + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-[#152B3D] mb-2">{yacht.name}</h1>
                  <div className="flex items-center gap-2 text-[#8CB7D8]">
                    <MapPin className="h-4 w-4" />
                    <span>Mangalya 71</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-gold text-gold" />
                  <span className="ml-1 text-lg font-medium text-[#075985]">{yacht.rating}</span>
                  <span className="ml-1 text-sm text-[#8CB7D8]">({yacht.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <BedDouble className="h-5 w-5 text-[#152B3D] mb-2" />
                <div className="text-sm text-[#8CB7D8]">Cabinas</div>
                <div className="font-semibold text-[#152B3D]">{yacht.cabins}</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <Ship className="h-5 w-5 text-[#152B3D] mb-2" />
                <div className="text-sm text-[#8CB7D8]">Longitud</div>
                <div className="font-semibold text-[#152B3D]">{yacht.length} ft</div>
              </div>
              {/* Add more specs */}
            </div>

            {/* Equipment */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-[#152B3D] mb-4">Equipamiento</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-[#152B3D]" />
                  <span>Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-[#152B3D]" />
                  <span>Chef a bordo</span>
                </div>
                {/* Add more equipment */}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-[#152B3D] mb-4">Descripción</h2>
              <p className="text-[#64748B] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <span className="text-sm text-[#8CB7D8]">Precio por día</span>
                <div className="text-3xl font-bold text-[#152B3D]">${yacht.pricePerDay}</div>
              </div>
              
              <Button className="w-full mb-4">
                Reservar ahora
              </Button>

              <Button variant="outline" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Contactar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default YachtDetails;
