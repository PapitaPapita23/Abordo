
import { PremiumFeature } from '@/types';
import { Shield, Users, Calendar, ChefHat, GlassWater, MapPin } from 'lucide-react';

const features: PremiumFeature[] = [
  {
    id: '1',
    title: 'Privacidad y Exclusividad',
    description: 'Disfruta de la libertad de un chárter de yate privado, con acceso exclusivo a destinos apartados e itinerarios personalizados.',
    icon: 'Shield'
  },
  {
    id: '2',
    title: 'Tripulación Profesional',
    description: 'Nuestros experimentados capitanes, mayordomos y marineros garantizan tu seguridad mientras brindan un servicio atento y personalizado.',
    icon: 'Users'
  },
  {
    id: '3',
    title: 'Itinerarios a Medida',
    description: 'Personaliza cada aspecto de tu viaje con rutas hechas a medida que se adapten a tus preferencias e intereses.',
    icon: 'Calendar'
  },
  {
    id: '4',
    title: 'Cocina Gourmet',
    description: 'Chefs expertos preparan exquisitas comidas con ingredientes frescos y locales adaptadas a tus preferencias dietéticas.',
    icon: 'ChefHat'
  },
  {
    id: '5',
    title: 'Actividades Acuáticas',
    description: 'Accede a equipos de deportes acuáticos premium que incluyen motos acuáticas, paddleboards, equipo de snorkel y scooters submarinos.',
    icon: 'GlassWater'
  },
  {
    id: '6',
    title: 'Destinos Exclusivos',
    description: 'Visita joyas escondidas y ubicaciones exclusivas solo accesibles en yate privado, lejos de las multitudes.',
    icon: 'MapPin'
  }
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Shield': return <Shield className="h-6 w-6" />;
    case 'Users': return <Users className="h-6 w-6" />;
    case 'Calendar': return <Calendar className="h-6 w-6" />;
    case 'ChefHat': return <ChefHat className="h-6 w-6" />;
    case 'GlassWater': return <GlassWater className="h-6 w-6" />;
    case 'MapPin': return <MapPin className="h-6 w-6" />;
    default: return <Shield className="h-6 w-6" />;
  }
};

const PremiumExperience = () => {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-sm font-medium text-blue-600">Por Qué Elegirnos</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mt-2 mb-4">
            La Experiencia Premium de Chárter
          </h2>
          <p className="text-gray-600">
            Descubre las ventajas de explorar los mares con Yachtify, donde cada chárter está adaptado para superar tus expectativas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-lg border border-gray-100 shadow-subtle hover:shadow-md transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-5">
                {getIconComponent(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold text-navy-dark mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumExperience;
