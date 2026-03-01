import { Component, createSignal, onMount } from 'solid-js';

const Header: Component = () => {
  const [isExpanded, setIsExpanded] = createSignal(false);
  const [isLocked, setIsLocked] = createSignal(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);
  const [activeSection, setActiveSection] = createSignal('home');

  // Track active section based on scroll
  onMount(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'experience', 'projects'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleLogoClick = (e: MouseEvent) => {
    e.preventDefault();
    if (isLocked()) {
      // Collapse when clicking logo while expanded
      setIsLocked(false);
      setIsExpanded(false);
    } else {
      // Navigate to home
      window.location.hash = '#home';
      setActiveSection('home');
    }
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsLocked(true); // Lock expanded state when clicking menu
    setIsMobileMenuOpen(false);
  };

  const handleMouseEnter = () => {
    if (!isLocked()) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isLocked()) {
      setIsExpanded(false);
    }
  };

  return (
    <header class="fixed top-12 left-0 right-0 z-50 flex justify-center px-4">
      {/* Desktop Dynamic Island */}
      <div 
        class="hidden md:block relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <nav 
          class="bg-black rounded-full shadow-2xl relative overflow-hidden"
          style={{
            width: isExpanded() || isLocked() ? '580px' : '56px',
            height: '56px',
            padding: isExpanded() || isLocked() ? '8px 16px' : '0',
            transition: isExpanded() || isLocked()
              ? 'all 0.7s ease-in-out'
              : 'all 0.5s ease-in-out'
          }}
        >
          <div class="flex items-center h-full relative">
            {/* Logo - Bergeser ke kiri saat expand */}
            <button
              onClick={handleLogoClick}
              class="absolute flex items-center justify-center rounded-full transition-all duration-700 ease-in-out flex-shrink-0"
              style={{
                width: isExpanded() || isLocked() ? '40px' : '56px',
                height: isExpanded() || isLocked() ? '40px' : '56px',
                left: isExpanded() || isLocked() ? '8px' : '0',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            >
              <img 
                src="/Logo-svg.svg" 
                alt="Logo" 
                class="transition-all duration-700 ease-in-out"
                style={{
                  width: isExpanded() || isLocked() ? '20px' : '28px',
                  height: isExpanded() || isLocked() ? '20px' : '28px'
                }}
              />
            </button>

            {/* Menu Items - Muncul dari kanan (dari dalam logo) */}
            <div 
              class="absolute flex items-center gap-1 whitespace-nowrap"
              style={{
                left: '64px',
                opacity: isExpanded() || isLocked() ? '1' : '0',
                transform: isExpanded() || isLocked() ? 'translateX(0)' : 'translateX(-80px)',
                'pointer-events': isExpanded() || isLocked() ? 'auto' : 'none',
                transition: isExpanded() || isLocked() 
                  ? 'opacity 0.3s ease-in-out 0.2s, transform 0.7s ease-in-out' 
                  : 'opacity 0.2s ease-in-out, transform 0.5s ease-in-out'
              }}
            >
              <a 
                href="#home"
                onClick={() => handleNavClick('home')}
                class={`px-4 py-1.5 rounded-full text-sm transition-colors duration-300 ${
                  activeSection() === 'home' 
                    ? 'bg-[#AAEE00] text-black' 
                    : 'text-white hover:text-[#AAEE00]'
                }`}
              >
                Home
              </a>
              <a 
                href="#about"
                onClick={() => handleNavClick('about')}
                class={`px-4 py-1.5 rounded-full text-sm transition-colors duration-300 ${
                  activeSection() === 'about' 
                    ? 'bg-[#AAEE00] text-black' 
                    : 'text-white hover:text-[#AAEE00]'
                }`}
              >
                About
              </a>
              <a 
                href="#services"
                onClick={() => handleNavClick('services')}
                class={`px-4 py-1.5 rounded-full text-sm transition-colors duration-300 ${
                  activeSection() === 'services' 
                    ? 'bg-[#AAEE00] text-black' 
                    : 'text-white hover:text-[#AAEE00]'
                }`}
              >
                Services
              </a>
              <a 
                href="#experience"
                onClick={() => handleNavClick('experience')}
                class={`px-4 py-1.5 rounded-full text-sm transition-colors duration-300 ${
                  activeSection() === 'experience' 
                    ? 'bg-[#AAEE00] text-black' 
                    : 'text-white hover:text-[#AAEE00]'
                }`}
              >
                Experience
              </a>
              <a 
                href="#projects"
                onClick={() => handleNavClick('projects')}
                class={`px-4 py-1.5 rounded-full text-sm transition-colors duration-300 ${
                  activeSection() === 'projects' 
                    ? 'bg-[#AAEE00] text-black' 
                    : 'text-white hover:text-[#AAEE00]'
                }`}
              >
                Projects
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div class="md:hidden w-full max-w-sm">
        <div class="flex items-center justify-between bg-black rounded-full px-5 py-2.5 shadow-2xl">
          {/* Logo */}
          <a href="#home" class="flex items-center">
            <img 
              src="/Logo-svg.svg" 
              alt="Logo" 
              class="w-7 h-7"
            />
          </a>

          {/* Mobile Menu Button */}
          <button 
            class="text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen())}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen() ? (
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen() && (
          <nav class="mt-3 bg-black rounded-3xl px-4 py-3 shadow-2xl animate-slideUp">
            <div class="flex flex-col space-y-1">
              <a 
                href="#home" 
                onClick={() => handleNavClick('home')}
                class={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeSection() === 'home' 
                    ? 'bg-[#AAEE00] text-black' 
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                Home
              </a>
              <a 
                href="#about" 
                onClick={() => handleNavClick('about')}
                class={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeSection() === 'about' 
                    ? 'bg-[#AAEE00] text-black' 
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                About
              </a>
              <a 
                href="#services" 
                onClick={() => handleNavClick('services')}
                class={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeSection() === 'services' 
                    ? 'bg-[#AAEE00] text-black' 
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                Services
              </a>
              <a 
                href="#experience" 
                onClick={() => handleNavClick('experience')}
                class={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeSection() === 'experience' 
                    ? 'bg-[#AAEE00] text-black' 
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                Experience
              </a>
              <a 
                href="#projects" 
                onClick={() => handleNavClick('projects')}
                class={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeSection() === 'projects' 
                    ? 'bg-[#AAEE00] text-black' 
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                Projects
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
