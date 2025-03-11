
import { PremiumFeature } from '@/types';
import { Shield, Users, Calendar, ChefHat, GlassWater, MapPin } from 'lucide-react';

const features: PremiumFeature[] = [
  {
    id: '1',
    title: 'Privacidad y Exclusividad',
    description: 'Disfruta de total privacidad y acceso exclusivo a tu yate, lejos de destinos turísticos concurridos.',
    icon: 'Shield'
  },
  {
    id: '2',
    title: 'Tripulación Profesional',
    description: 'Nuestra tripulación experimentada y atenta garantizará que tu viaje sea cómodo, seguro y memorable.',
    icon: 'Users'
  },
  {
    id: '3',
    title: 'Itinerarios a Medida',
    description: 'Personaliza tu viaje según tus preferencias, visitando destinos soñados a tu propio ritmo.',
    icon: 'Calendar'
  },
  {
    id: '4',
    title: 'Cocina Gourmet',
    description: 'Disfruta de exquisitas comidas preparadas por chefs profesionales utilizando los ingredientes locales más frescos.',
    icon: 'ChefHat'
  },
  {
    id: '5',
    title: 'Actividades Acuáticas',
    description: 'Organiza celebraciones inolvidables, desde reuniones íntimas hasta eventos corporativos.',
    icon: 'GlassWater'
  },
];

const getIconComponent = (iconName: string, colorClass: string = "text-[#599ACF]") => {
  switch (iconName) {
    case 'Shield': return <Shield className={`h-6 w-6 ${colorClass}`} />;
    case 'Users': return <Users className={`h-6 w-6 ${colorClass}`} />;
    case 'Calendar': return <Calendar className={`h-6 w-6 ${colorClass}`} />;
    case 'ChefHat': return <ChefHat className={`h-6 w-6 ${colorClass}`} />;
    case 'GlassWater': return <GlassWater className={`h-6 w-6 ${colorClass}`} />;
    case 'MapPin': return <MapPin className={`h-6 w-6 ${colorClass}`} />;
    default: return <Shield className={`h-6 w-6 ${colorClass}`} />;
  }
};


const PremiumExperience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex h-7 px-[3.78px] py-[3px] justify-center items-center text-sm font-medium rounded-full bg-blue-100 text-[#599ACF]">
          ¿Por qué elegir Abordo?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#152B3D] mt-2 mb-4">
          La experiencia de charter premium
          </h2>
          <p className="text-gray-600">
          Descubre las ventajas únicas de alquilar un yate de lujo con Abordo, donde cada detalle se adapta a tus preferencias.          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-lg border border-gray-100 shadow-subtle hover:shadow-md transition-all duration-300 animate-fade-up self-center flex flex-col items-center"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-5">
                {getIconComponent(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold text-[#152B3D] mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumExperience;
