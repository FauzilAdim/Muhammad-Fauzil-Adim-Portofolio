import { Component } from 'solid-js';
import { Github, Linkedin, Mail, Heart } from 'lucide-solid';

const Footer: Component = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="relative bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      {/* Background Effects */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-10 -left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div class="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* About Section */}
          <div class="animate-slideUp">
            <h3 class="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">Portofolio</h3>
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
              Full Stack Developer dengan passion dalam menciptakan solusi digital yang inovatif dan user-friendly.
            </p>
            <div class="flex gap-3 sm:gap-4">
              <a 
                href="https://github.com" 
                target="_blank"
                class="w-9 h-9 sm:w-10 sm:h-10 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Github size={18} class="sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                class="w-9 h-9 sm:w-10 sm:h-10 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={18} class="sm:w-5 sm:h-5" />
              </a>
              <a 
                href="mailto:your.email@example.com"
                class="w-9 h-9 sm:w-10 sm:h-10 bg-black hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Mail size={18} class="sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div class="animate-slideUp" style="animation-delay: 0.1s">
            <h3 class="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Quick Links</h3>
            <ul class="space-y-2 sm:space-y-3">
              <li>
                <a href="#home" class="text-sm sm:text-base text-gray-600 hover:text-black transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" class="text-sm sm:text-base text-gray-600 hover:text-black transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#services" class="text-sm sm:text-base text-gray-600 hover:text-black transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#experience" class="text-sm sm:text-base text-gray-600 hover:text-black transition-colors duration-300">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" class="text-sm sm:text-base text-gray-600 hover:text-black transition-colors duration-300">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div class="animate-slideUp sm:col-span-2 md:col-span-1" style="animation-delay: 0.2s">
            <h3 class="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Get In Touch</h3>
            <ul class="space-y-2 sm:space-y-3 text-gray-600">
              <li class="flex items-start gap-2">
                <Mail size={18} class="mt-1 flex-shrink-0 sm:w-5 sm:h-5" />
                <span class="text-sm sm:text-base break-all">your.email@example.com</span>
              </li>
              <li>
                <p class="text-sm sm:text-base leading-relaxed">
                  Tersedia untuk proyek freelance dan kolaborasi. Mari wujudkan ide Anda menjadi kenyataan!
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div class="pt-6 sm:pt-8 border-t border-gray-300">
          <div class="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p class="text-gray-600 text-xs sm:text-sm text-center md:text-left">
              © {currentYear} Portofolio. All rights reserved.
            </p>
            <p class="text-gray-600 text-xs sm:text-sm flex items-center gap-2">
              Made with <Heart size={14} class="text-red-500 fill-red-500 sm:w-4 sm:h-4" /> by Muhammad Fauzil Adim
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
