
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
                Premium Yacht Rentals
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-shadow animate-fade-up delay-100">
              Explore luxury <br className="hidden md:block" />
              on the open seas
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-md animate-fade-up delay-200">
              Experience unparalleled comfort and adventure as you sail through crystal clear waters with our premium yacht charters.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up delay-300">
              <Button size="lg" className="bg-white text-navy-dark hover:bg-white/90">
                View Fleet
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="glass-effect rounded-2xl p-6 shadow-xl max-w-md mx-auto animate-fade-in delay-100">
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
