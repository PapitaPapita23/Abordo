import { useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Phone, Wifi, ChefHat, BedDouble, Ship, Anchor, Wind, Coffee, Sun, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { allYachts } from '@/data/yachts';
import { cn } from '@/lib/utils';

const YachtDetails = () => {
  const { id } = useParams();
  const yacht = allYachts.find(y => y.id === id);

  if (!yacht) {
    return <div>Yacht not found</div>;
  }

  const amenities = [
    { icon: Wifi, label: 'Wi-Fi a bordo' },
    { icon: ChefHat, label: 'Chef profesional' },
    { icon: Coffee, label: 'Bar premium' },
    { icon: Anchor, label: 'Equipo de buceo' },
    { icon: Wind, label: 'Aire acondicionado' },
    { icon: Sun, label: 'Zona de bronceado' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      
      <main className="container mx-auto px-4 lg:px-8 pt-28 pb-16">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-6 hover:bg-white/50"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a los yates
        </Button>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-8">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <img
                src={yacht.image}
                alt={yacht.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-4 grid grid-rows-2 gap-4">
            {[yacht.image, yacht.image].map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden">
                <img
                  src={img}
                  alt={`${yacht.name} view ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#152B3D] mb-2">{yacht.name}</h1>
                  <div className="flex items-center gap-2 text-[#8CB7D8]">
                    <MapPin className="h-4 w-4" />
                    <span>Mangalya 71</span>
                  </div>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="h-5 w-5 fill-[#FBC646] text-[#FBC646]" />
                  <span className="ml-1 text-lg font-medium text-[#075985]">{yacht.rating}</span>
                  <span className="ml-1 text-sm text-[#8CB7D8]">({yacht.reviews} reseñas)</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <BedDouble className="h-6 w-6 text-[#152B3D] mb-3" />
                <div className="text-sm text-[#8CB7D8]">Cabinas</div>
                <div className="text-xl font-semibold text-[#152B3D]">{yacht.cabins}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <Ship className="h-6 w-6 text-[#152B3D] mb-3" />
                <div className="text-sm text-[#8CB7D8]">Longitud</div>
                <div className="text-xl font-semibold text-[#152B3D]">{yacht.length} ft</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <Users className="h-6 w-6 text-[#152B3D] mb-3" />
                <div className="text-sm text-[#8CB7D8]">Capacidad</div>
                <div className="text-xl font-semibold text-[#152B3D]">{yacht.capacity} personas</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <Sparkles className="h-6 w-6 text-[#152B3D] mb-3" />
                <div className="text-sm text-[#8CB7D8]">Categoría</div>
                <div className="text-xl font-semibold text-[#152B3D]">{yacht.category}</div>
              </div>
            </div>

            {/* Equipment */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold text-[#152B3D] mb-6">Equipamiento y servicios</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {amenities.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#F8FAFC]">
                        <Icon className="h-5 w-5 text-[#152B3D]" />
                      </div>
                      <span className="text-[#64748B]">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold text-[#152B3D] mb-4">Descripción</h2>
              <p className="text-[#64748B] leading-relaxed">
                Disfruta de una experiencia náutica incomparable a bordo de este lujoso yate. 
                Equipado con las últimas comodidades y tecnología de navegación, ofrece el equilibrio 
                perfecto entre rendimiento y lujo. Ideal para escapadas de fin de semana o vacaciones 
                prolongadas en el mar.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
              <div className="mb-6">
                <span className="text-sm text-[#8CB7D8]">Precio por día</span>
                <div className="text-3xl font-bold text-[#152B3D]">${yacht.pricePerDay}</div>
              </div>
              
              <Button className="w-full mb-4 bg-[#152B3D] hover:bg-[#0A1827] text-white">
                Reservar ahora
              </Button>

              <Button variant="outline" className="w-full border-[#152B3D] text-[#152B3D]">
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
