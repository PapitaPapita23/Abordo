
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Destination } from '@/types';

const destinations: Destination[] = [
  { id: '1', name: 'Mediterráneo', url: '#' },
  { id: '2', name: 'Caribe', url: '#' },
  { id: '3', name: 'Costa Azul', url: '#' },
  { id: '4', name: 'Bahamas', url: '#' },
  { id: '5', name: 'Grecia', url: '#' },
  { id: '6', name: 'Croacia', url: '#' }
];

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-5">Yachtify</h3>
            <p className="text-gray-300 mb-6">
              Experimenta lo mejor en chárters de yates de lujo. Ofreciendo embarcaciones premium, tripulaciones expertas y destinos inolvidables.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-5">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Nuestros Yates</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Por Qué Elegirnos</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">El Proceso de Reserva</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Galería</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Preguntas Frecuentes</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-5">Destinos Populares</h3>
            <ul className="space-y-3">
              {destinations.map((destination) => (
                <li key={destination.id}>
                  <a href={destination.url} className="text-gray-300 hover:text-white transition-colors">
                    {destination.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-5">Contáctanos</h3>
            <ul className="space-y-3">
              <li className="flex">
                <Phone size={18} className="mr-3 text-gray-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex">
                <Mail size={18} className="mr-3 text-gray-400 flex-shrink-0 mt-1" />
                <a href="mailto:info@yachtify.com" className="text-gray-300 hover:text-white transition-colors">
                  info@yachtify.com
                </a>
              </li>
              <li className="flex">
                <MapPin size={18} className="mr-3 text-gray-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  123 Marina Boulevard,<br />
                  Miami, FL 33139
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:justify-between md:items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Yachtify. Todos los derechos reservados.
          </p>
          
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            <a href="#" className="hover:text-white transition-colors">Política de Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
