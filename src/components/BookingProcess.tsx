
import { BookingStep } from '@/types';
import { Button } from '@/components/ui/button';
import { Ship, Calendar, Settings, CheckCircle } from 'lucide-react';

const steps: BookingStep[] = [
  {
    id: 1,
    title: 'Select your Yacht',
    description: 'Explore our elite fleet and select the yacht that matches your needs based on size, amenities, and preferences.',
    icon: 'Ship'
  },
  {
    id: 2,
    title: 'Choose your Dates',
    description: 'Select your preferred dates for the charter and confirm availability for your chosen yacht.',
    icon: 'Calendar'
  },
  {
    id: 3,
    title: 'Personalize your Trip',
    description: 'Customize your journey with meal preferences, activities, destinations, and additional services.',
    icon: 'Settings'
  },
  {
    id: 4,
    title: 'Confirm your Booking',
    description: 'Complete your reservation with secure payment options and receive detailed confirmation.',
    icon: 'CheckCircle'
  }
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Ship': return <Ship className="h-6 w-6" />;
    case 'Calendar': return <Calendar className="h-6 w-6" />;
    case 'Settings': return <Settings className="h-6 w-6" />;
    case 'CheckCircle': return <CheckCircle className="h-6 w-6" />;
    default: return null;
  }
};

const BookingProcess = () => {
  return (
    <section id="booking" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block text-sm font-medium text-blue-600">Booking Guide</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mt-2 mb-4">
            How to Book your Yacht Charter
          </h2>
          <p className="text-gray-600">
            Secure your perfect yacht experience in four simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
          
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative z-10 bg-white p-6 rounded-lg border border-gray-100 shadow-subtle text-center animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="relative">
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-full bg-navy-dark text-white flex items-center justify-center text-sm font-bold">
                  {step.id}
                </span>
                
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-5 mx-auto">
                  {getIconComponent(step.icon)}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-navy-dark mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy-dark">
            Start Your Booking
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;
