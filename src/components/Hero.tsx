
import { Button } from '@/components/ui/button';
import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background Image */}
      <img
        className="absolute inset-0 object-cover w-full h-full"
        src="/img/Fondo.png"
        alt="Yate de lujo"
      />

      {/* Content */}
      <div className="container mx-auto relative z-10 h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center pt-20">
          <div className="text-white space-y-6 px-6 md:px-0">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-[#152B3D] backdrop-blur-sm text-white text-sm font-medium mb-4 animate-fade-up">
                Chárters de Yates de Lujo
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold leading-tight text-shadow animate-fade-up delay-100 text-[#F5EEE7]">
              Explora el lujo en los <span className="text-[#599ACF]">mares abiertos</span>
            </h1>

            <p className="text-lg md:text-xl text-[#F5EEE7] max-w-lg animate-fade-up delay-200">
              Experimenta la libertad definitiva de los alquileres de yates a medida
              en los destinos más impresionantes del mundo. Tu viaje
              comienza con Abordo.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Button size="lg" className="bg-[#152B3D] hover:bg-[#599ACF] text-[#F5EEE7] font-medium">
                Explorar Nuestra Flota
              </Button>
              <Button size="lg" variant="outline" className="text-[#F5EEE7] border-[#F5EEE7] bg-transparent hover:bg-transparent">
                Como Reservar
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="rounded-2xl border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.70)] shadow-sm backdrop-blur-sm p-6 max-w-md mx-auto animate-fade-in delay-100">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Form */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 px-6 pb-8 z-20">
        <div className="glass-effect rounded-2xl p-6 shadow-xl animate-fade-up">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default Hero;
