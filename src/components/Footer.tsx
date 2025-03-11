
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Destination } from '@/types';

const destinations: Destination[] = [
  { id: '1', name: 'Mediterranean', url: '#' },
  { id: '2', name: 'Caribbean', url: '#' },
  { id: '3', name: 'French Riviera', url: '#' },
  { id: '4', name: 'Bahamas', url: '#' },
  { id: '5', name: 'Greece', url: '#' },
  { id: '6', name: 'Croatia', url: '#' }
];

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-5">Yachtify</h3>
            <p className="text-gray-300 mb-6">
              Experience the ultimate in luxury yacht charters. Offering premium vessels, expert crews, and unforgettable destinations.
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
            <h3 className="text-xl font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Our Yachts</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">The Booking Process</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-5">Popular Destinations</h3>
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
            <h3 className="text-xl font-semibold mb-5">Contact Us</h3>
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
            © {new Date().getFullYear()} Yachtify. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
