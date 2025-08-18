import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Box } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isAuthenticated ? [
    { href: "/", label: "Home" },
    { href: "/topup", label: "Top-Up" },
    { href: "/history", label: "History" },
  ] : [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-3 no-underline">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Box className="text-white text-xl" size={24} />
              </div>
              <span className="text-2xl font-bold text-blue-500">RobStore</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-gray-700 hover:text-blue-500 transition-colors duration-200 font-medium ${
                    location === link.href ? 'text-blue-500' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <Button
                  onClick={() => window.location.href = '/api/logout'}
                  variant="outline"
                  className="hover:bg-blue-500 hover:text-white transition-all duration-200"
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => window.location.href = '/api/login'}
                    variant="ghost"
                    className="text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/api/login'}
                    className="bg-blue-500 hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 hover:text-blue-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t space-y-2">
            {isAuthenticated ? (
              <Button
                onClick={() => window.location.href = '/api/logout'}
                variant="outline"
                className="w-full hover:bg-blue-500 hover:text-white transition-all"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => window.location.href = '/api/login'}
                  variant="ghost"
                  className="w-full text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                >
                  Login
                </Button>
                <Button
                  onClick={() => window.location.href = '/api/login'}
                  className="w-full bg-blue-500 hover:bg-blue-700 transition-all"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
