
import { Button } from '@/components/ui/button';
import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[700px] w-full overflow-hidden bg-navy-dark">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/lovable-uploads/f5ed8457-2f92-40ff-90a0-4bb9988b0b89.png')" }}
      >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center pt-20">
          <div className="text-white space-y-6 px-6 md:px-0">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4 animate-fade-up">
                Chárters de Yates de Lujo
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-shadow animate-fade-up delay-100">
              Navega con <span className="text-gold">Lujo</span>,<br className="hidden md:block" />
              Explora con <span className="text-gold">Estilo</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-lg animate-fade-up delay-200">
              Experimenta la máxima libertad y privacidad en nuestros chárters de yates premium.
              Descubre calas escondidas y playas vírgenes con nuestro servicio de clase mundial.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-navy-dark font-medium">
                Explorar Nuestra Flota
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Ver Destinos
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="glass-effect rounded-2xl p-6 shadow-xl max-w-md mx-auto animate-fade-in delay-100">
              <h3 className="text-white text-xl font-semibold mb-6">Encuentra Tu Yate Perfecto</h3>
              <SearchForm />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Form */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 px-6 pb-8 z-20">
        <div className="glass-effect rounded-2xl p-6 shadow-xl animate-fade-up">
          <h3 className="text-white text-xl font-semibold mb-4">Encuentra Tu Yate Perfecto</h3>
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default Hero;
