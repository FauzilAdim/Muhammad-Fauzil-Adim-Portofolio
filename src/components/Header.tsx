import { Component, createSignal } from 'solid-js';

const Header: Component = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  return (
    <header class="fixed top-0 w-full z-50 glass-effect">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          {/* Logo */}
          <div class="flex items-center space-x-2">
            <span class="text-black font-bold text-xl">Portofolio</span>
          </div>

          {/* Navigation */}
          <nav class="hidden md:flex items-center space-x-8">
            <a href="#home" class="text-black hover:text-gray-600 transition-colors font-medium">Home</a>
            <a href="#about" class="text-black hover:text-gray-600 transition-colors font-medium">About</a>
            <a href="#services" class="text-black hover:text-gray-600 transition-colors font-medium">Services</a>
            <a href="#experience" class="text-black hover:text-gray-600 transition-colors font-medium">Experience</a>
            <a href="#projects" class="text-black hover:text-gray-600 transition-colors font-medium">Projects</a>
          </nav>

          {/* Logo Button */}
          <div class="hidden md:flex items-center space-x-4"> 
            <a href="#" class="flex items-center">
              <img 
                src="public/logo.png" 
                alt="Logo" 
                class="h-8 w-auto transition-transform duration-300 hover:scale-110"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            class="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen())}
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
