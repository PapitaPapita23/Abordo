
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12',
        scrolled ? 'bg-white shadow-subtle' : 'navbar-gradient'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <span className={cn(
              'font-semibold text-2xl transition-colors duration-300',
              scrolled ? 'text-navy-dark' : 'text-white'
            )}>
              Yachtify
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks scrolled={scrolled} />
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className={cn(
                'hidden md:flex transition-colors duration-300',
                scrolled ? 'text-navy-dark hover:bg-navy-dark/10' : 'text-white hover:bg-white/10'
              )}
            >
              Sign In
            </Button>
            
            <Button 
              variant={scrolled ? "default" : "outline"} 
              className={cn(
                'hidden md:flex',
                !scrolled && 'text-white border-white hover:bg-white/20'
              )}
            >
              Book Now
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                'md:hidden transition-colors duration-300',
                scrolled ? 'text-navy-dark' : 'text-white'
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-md animate-fade-in">
            <div className="flex flex-col space-y-3 px-4">
              <a href="#" className="py-2 text-navy-dark hover:text-navy-light transition-colors">Home</a>
              <a href="#yachts" className="py-2 text-navy-dark hover:text-navy-light transition-colors">Our Fleet</a>
              <a href="#experience" className="py-2 text-navy-dark hover:text-navy-light transition-colors">Experience</a>
              <a href="#booking" className="py-2 text-navy-dark hover:text-navy-light transition-colors">How to Book</a>
              <a href="#faq" className="py-2 text-navy-dark hover:text-navy-light transition-colors">FAQ</a>
              <div className="pt-2 flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start">Sign In</Button>
                <Button>Book Now</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLinks = ({ scrolled }: { scrolled: boolean }) => {
  return (
    <>
      <a href="#" className={cn(
        'transition-colors duration-300 hover:opacity-80',
        scrolled ? 'text-navy-dark' : 'text-white'
      )}>
        Home
      </a>
      <a href="#yachts" className={cn(
        'transition-colors duration-300 hover:opacity-80',
        scrolled ? 'text-navy-dark' : 'text-white'
      )}>
        Our Fleet
      </a>
      <a href="#experience" className={cn(
        'transition-colors duration-300 hover:opacity-80',
        scrolled ? 'text-navy-dark' : 'text-white'
      )}>
        Experience
      </a>
      <a href="#booking" className={cn(
        'transition-colors duration-300 hover:opacity-80',
        scrolled ? 'text-navy-dark' : 'text-white'
      )}>
        How to Book
      </a>
      <a href="#faq" className={cn(
        'transition-colors duration-300 hover:opacity-80',
        scrolled ? 'text-navy-dark' : 'text-white'
      )}>
        FAQ
      </a>
    </>
  );
};

export default Navbar;
