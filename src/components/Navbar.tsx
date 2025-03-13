
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Menu, LogOut, UserCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Effect to handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to disable scrolling when a modal is open
  useEffect(() => {
    if (isLoginModalOpen || isRegisterModalOpen || mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isLoginModalOpen, isRegisterModalOpen, mobileMenuOpen]);

  // Effect to close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  // Functions to open modals
  const openLoginModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12",
        scrolled ? "bg-white shadow-subtle" : "navbar-gradient"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 148 95"
              fill="none"
              className="w-8 h-8 mr-2"
            >
              <path
                d="M35.3766 94.0849C34.0731 94.0849 32.8297 93.3626 32.218 92.1185L1.10253 28.4006C-0.301328 26.2536 -0.371521 23.5849 0.932059 21.3476C2.2958 19.0099 4.80269 17.7358 7.50009 18.0368L95.6522 27.8789C97.5774 28.0896 98.9613 29.8353 98.7507 31.7615C98.5401 33.6878 96.7953 35.0723 94.87 34.8617L7.28952 25.0898L38.5153 89.0385C39.3676 90.7841 38.6456 92.881 36.9008 93.7338C36.4095 93.9746 35.878 94.0949 35.3666 94.0949L35.3766 94.0849Z"
                fill="#2D3E54"
              />
              <path
                d="M41.303 27.6182C40.5509 27.6182 39.7888 27.3775 39.147 26.8758C37.6229 25.6819 37.3521 23.4747 38.5454 21.9497L51.6213 5.24523C55.2412 1.3124 60.5558 -0.58379 65.8404 0.158633L121.373 8.69649C123.288 8.98744 124.602 10.7833 124.311 12.6996C124.02 14.6158 122.225 15.9301 120.31 15.6391L64.8175 7.11132C61.8995 6.69998 58.9214 7.74338 56.8657 9.91046L44.0605 26.2839C43.3686 27.1668 42.3358 27.6283 41.2929 27.6283L41.303 27.6182Z"
                fill="#2D3E54"
              />
              <path
                d="M35.4068 94.1753C33.6921 94.1753 32.1879 92.9111 31.9372 91.1654C31.6565 89.2492 32.9901 87.4634 34.9054 87.1925C35.4569 87.1122 71.8569 81.3936 84.4214 52.9106C98.1491 21.8091 112.97 2.95761 144.266 5.07451C146.201 5.20494 147.665 6.88041 147.535 8.81672C147.404 10.753 145.73 12.2178 143.794 12.0874C116.439 10.2414 103.664 26.7051 90.839 55.7599C76.65 87.9048 37.5627 93.9144 35.8981 94.1452C35.7276 94.1652 35.5572 94.1853 35.3867 94.1853L35.4068 94.1753Z"
                fill="#599ACF"
              />
              <path
                d="M87.9009 94.9879C86.5572 94.9879 85.2837 94.2154 84.7021 92.9112C83.91 91.1454 84.6921 89.0786 86.4469 88.276C87.0486 87.9951 100.516 81.524 107.184 59.8633C116.901 28.2702 143.734 27.6281 144.005 27.6281C145.96 27.6081 147.535 29.1631 147.555 31.0995C147.575 33.0358 146.021 34.631 144.085 34.651C143.203 34.6711 122.065 35.3834 113.902 61.9301C106.241 86.8313 90.0368 94.3659 89.3449 94.6769C88.8736 94.8876 88.3923 94.9879 87.9109 94.9879H87.9009Z"
                fill="#599ACF"
              />
              <path
                d="M118.485 94.1754C117.231 94.1754 116.018 93.5032 115.386 92.3194C114.484 90.6238 115.115 88.517 116.79 87.5839C117.141 87.3833 123.519 83.5407 125.925 70.8393C129.926 49.7404 142.922 47.3928 143.473 47.3025C145.379 46.9915 147.194 48.2857 147.504 50.2019C147.815 52.1182 146.522 53.9241 144.606 54.2351C144.316 54.2953 135.852 56.1915 132.824 72.1536C129.736 88.4768 120.52 93.5634 120.139 93.7641C119.618 94.045 119.046 94.1754 118.485 94.1754Z"
                fill="#599ACF"
              />
            </svg>
            <span
              className={cn(
                "font-sans font-semibold text-2xl transition-colors duration-300",
                scrolled ? "text-[#2D3E54]" : "text-white"
              )}
            >
              Abordo
            </span>
          </Link>

          {/* Links and buttons */}
          <div className="flex items-center space-x-4 justify-end">
            <div className="flex justify-end items-center space-x-8">
              <NavLinks scrolled={scrolled} />
            </div>
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2 relative" ref={userMenuRef}>
                <button
                  className={cn(
                    "flex items-center space-x-2 px-2 py-1 rounded transition-colors",
                    scrolled ? "hover:bg-gray-100" : "hover:bg-white/10",
                    "focus:outline-none"
                  )}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <Avatar className="h-8 w-8">
                    {user?.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.name || ""} />
                    ) : (
                      <AvatarFallback className="bg-[#599ACF] text-white">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span
                    className={cn(
                      "hidden lg:block transition-colors duration-300",
                      scrolled ? "text-navy-dark" : "text-white"
                    )}
                  >
                    {user?.name}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 transition-transform",
                      userMenuOpen ? "transform rotate-180" : "",
                      scrolled ? "text-navy-dark" : "text-white"
                    )} 
                  />
                </button>
                
                {/* User dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className={cn(
                    "hidden md:flex transition-colors duration-300",
                    scrolled
                      ? "text-navy-dark hover:bg-navy-dark/10"
                      : "text-white hover:bg-white/10"
                  )}
                  onClick={openLoginModal}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "hidden md:flex transition-colors duration-300",
                    scrolled
                      ? "text-navy-dark hover:bg-navy-dark/10"
                      : "text-white hover:bg-white/10"
                  )}
                  onClick={openRegisterModal}
                >
                  Registrarse
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden transition-colors duration-300",
                scrolled ? "text-navy-dark" : "text-white"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white p-6 pt-20">
          <div className="flex flex-col space-y-6">
            <Link to="/" onClick={closeMobileMenu} className="text-navy-dark hover:text-[#599ACF] transition-colors">
              Publica tu barco
            </Link>
            <Link to="/" onClick={closeMobileMenu} className="text-navy-dark hover:text-[#599ACF] transition-colors">
              Centro de ayuda
            </Link>
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 py-2">
                  <Avatar className="h-10 w-10">
                    {user?.photoURL ? (
                      <AvatarImage src={user.photoURL} alt={user.name || ""} />
                    ) : (
                      <AvatarFallback className="bg-[#599ACF] text-white">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-navy-dark font-medium">{user?.name}</span>
                </div>
                <Button 
                  onClick={handleLogout}
                  className="bg-[#599ACF] hover:bg-[#4785BB] text-white w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={openLoginModal}
                  className="bg-[#599ACF] hover:bg-[#4785BB] text-white w-full"
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  onClick={openRegisterModal}
                  variant="outline"
                  className="border-[#599ACF] text-[#599ACF] hover:bg-[#599ACF]/10 w-full"
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div>
            <Login
              onClose={() => setLoginModalOpen(false)}
              onSwitchToRegister={openRegisterModal}
            />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div>
            <Register
              onClose={() => setRegisterModalOpen(false)}
              onSwitchToLogin={openLoginModal}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ scrolled }: { scrolled: boolean }) => {
  return (
    <div className="hidden md:flex justify-end">
      <Link
        to="/"
        className={cn(
          "font-inter transition-colors duration-300 hover:opacity-80",
          scrolled ? "text-navy-dark" : "text-white"
        )}
      >
        Publica tu barco
      </Link>
      <Link
        to="/"
        className={cn(
          "font-inter transition-colors duration-300 hover:opacity-80 ml-4",
          scrolled ? "text-navy-dark" : "text-white"
        )}
      >
        Centro de ayuda
      </Link>
    </div>
  );
};

export default Navbar;
