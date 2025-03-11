
import { PremiumFeature } from '@/types';
import { Shield, Users, Calendar, ChefHat, GlassWater, MapPin } from 'lucide-react';

const features: PremiumFeature[] = [
  {
    id: '1',
    title: 'Privacy & Exclusivity',
    description: 'Enjoy the freedom of a private yacht charter, with exclusive access to secluded destinations and personalized itineraries.',
    icon: 'Shield'
  },
  {
    id: '2',
    title: 'Professional Crew',
    description: 'Our experienced captains, stewards, and deckhands ensure your safety while providing attentive and personalized service.',
    icon: 'Users'
  },
  {
    id: '3',
    title: 'Tailored Itineraries',
    description: 'Customize every aspect of your journey with bespoke routes that match your preferences and interests.',
    icon: 'Calendar'
  },
  {
    id: '4',
    title: 'Gourmet Cuisine',
    description: 'Expert chefs prepare exquisite meals using fresh, locally-sourced ingredients catered to your dietary preferences.',
    icon: 'ChefHat'
  },
  {
    id: '5',
    title: 'Water Activities',
    description: 'Access premium water sports equipment including jet skis, paddleboards, snorkeling gear, and underwater scooters.',
    icon: 'GlassWater'
  },
  {
    id: '6',
    title: 'Exclusive Destinations',
    description: 'Visit hidden gems and exclusive locations only accessible by private yacht, away from the crowds.',
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
          <span className="inline-block text-sm font-medium text-blue-600">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mt-2 mb-4">
            The Premium Charter Experience
          </h2>
          <p className="text-gray-600">
            Discover the advantages of exploring the seas with Yachtify, where every charter is tailored to exceed your expectations.
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
