
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed w-full z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12',
        scrolled ? 'bg-white shadow-subtle' : 'navbar-gradient'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className={cn(
              'font-semibold text-2xl transition-colors duration-300',
              scrolled ? 'text-navy-dark' : 'text-white'
            )}>
              Yachtify
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks scrolled={scrolled} />
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className={cn(
                  'hidden md:block transition-colors duration-300',
                  scrolled ? 'text-navy-dark' : 'text-white'
                )}>
                  <span className="mr-2">Hola, {user?.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  className={cn(
                    'hidden md:flex transition-colors duration-300',
                    scrolled ? 'text-navy-dark hover:bg-navy-dark/10' : 'text-white hover:bg-white/10'
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className={cn(
                    'hidden md:flex transition-colors duration-300',
                    scrolled ? 'text-navy-dark hover:bg-navy-dark/10' : 'text-white hover:bg-white/10'
                  )}
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </Button>
                
                <Button 
                  variant={scrolled ? "default" : "outline"} 
                  className={cn(
                    'hidden md:flex',
                    !scrolled && 'text-white border-white hover:bg-white/20'
                  )}
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </Button>
              </>
            )}
            
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
              <Link to="/" className="py-2 text-navy-dark hover:text-navy-light transition-colors">Inicio</Link>
              <a href="#yachts" className="py-2 text-navy-dark hover:text-navy-light transition-colors">Nuestra Flota</a>
              <a href="#experience" className="py-2 text-navy-dark hover:text-navy-light transition-colors">Experiencia</a>
              <a href="#booking" className="py-2 text-navy-dark hover:text-navy-light transition-colors">Cómo Reservar</a>
              <a href="#faq" className="py-2 text-navy-dark hover:text-navy-light transition-colors">Preguntas Frecuentes</a>
              <div className="pt-2 flex flex-col space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="text-navy-dark">Hola, {user?.name}</div>
                    <Button variant="ghost" className="justify-start" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="justify-start" onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}>
                      Iniciar Sesión
                    </Button>
                    <Button onClick={() => {
                      navigate('/register');
                      setMobileMenuOpen(false);
                    }}>
                      Registrarse
                    </Button>
                  </>
                )}
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
      <Link to="/" className={cn(
        'transition-colors duration-300 hover:opacity-80',
        scrolled ? 'text-navy-dark' : 'text-white'
      )}>
        Inicio
      </Link>
      <a href="#yachts" className={cn(
        'transition-colors duration-300 hover:opacity-80',
        scrolled ? 'text-navy-dark' : 'text-white'
      )}>
        Nuestra Flota
      </a>
      <a href="#experience" className={cn(
        'transition-colors duration-300 hover:opacity-80',
        scrolled ? 'text-navy-dark' : 'text-white'
      )}>
        Experiencia
      </a>
      <a href="#booking" className={cn(
        'transition-colors duration-300 hover:opacity-80',
        scrolled ? 'text-navy-dark' : 'text-white'
      )}>
        Cómo Reservar
      </a>
      <a href="#faq" className={cn(
        'transition-colors duration-300 hover:opacity-80',
        scrolled ? 'text-navy-dark' : 'text-white'
      )}>
        Preguntas Frecuentes
      </a>
    </>
  );
};

export default Navbar;
