import { Component } from 'solid-js';
import { Heart, Medal, Brain, Code } from 'lucide-solid';

const About: Component = () => {
  return (
    <section class="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div class="animate-slideUp">
            <h2 class="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
              About Me
            </h2>
            
            <p class="text-black-300 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed">
              With over 1 year of experience in web and mobile development (2024-2025), I specialize in creating innovative digital solutions that drive business growth and enhance user experiences. I worked for 1 year at PT Smartelco Solusi Teknologi and 6 months at CV Rumah Mesin.
              My expertise spans various modern frameworks such as SolidJS, React, Next.js, Angular, and mobile technologies, including Capacitor for cross-platform development. I am also proficient in backend development with Rust, Scala, GoLang, and Laravel, as well as working with various databases such as PostgreSQL, MongoDB, and ClickHouse.
              I have had the opportunity to work on over 8 diverse projects, ranging from enterprise applications for agencies to mobile applications and AI-based systems, with a primary focus on providing exceptional user experiences and robust, scalable architecture.
            </p>

            <div class="flex flex-wrap gap-2 sm:gap-4">
              <div class="bg-black hover:bg-black-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 glow-border">
                Full Stack Developer
              </div>
              <div class="bg-black hover:bg-black-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 glow-border">
                Mobile Development
              </div>
              <div class="bg-black hover:bg-black-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 glow-border">
                System Architecture
              </div>
              <div class="bg-black hover:bg-black-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 glow-border">
                UI/UX Design
              </div>
            </div>
          </div>

          {/* Photo Section */}
          <div class="relative animate-slideUp mt-8 lg:mt-0">
            <div class="glass-effect p-4 sm:p-8 rounded-2xl">
              <div class="p-4 sm:p-8 rounded-xl overflow-hidden relative h-64 sm:h-80 lg:h-96 flex items-center justify-center glass-effect">
                {/* Foto Anda - Ganti src dengan path foto Anda */}
                <img 
                  src="/profile-photo.jpg" 
                  alt="Muhammad Fauzil Adim"
                  class="w-full h-full object-cover rounded-lg"
                />
                
                {/* Overlay gradient untuk efek profesional */}
                <div class="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                
                {/* Nama di bagian bawah foto (opsional) */}
                <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                  <h3 class="text-lg sm:text-2xl font-bold">Muhammad Fauzil Adim</h3>
                  <p class="text-sm sm:text-base text-blue-200">Full Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section - Dipindah ke bawah dan lebih rapi */}
        <div class="glass-effect p-4 sm:p-8 rounded-2xl animate-slideUp mt-12 sm:mt-16">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <div class="bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-200 p-4 sm:p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div class="flex justify-center mb-2 sm:mb-3">
                <Code size={32} strokeWidth={1.5} class="text-black sm:w-[42px] sm:h-[42px]" />
              </div>
              <h2 class="text-black font-bold text-xl sm:text-2xl">9+</h2>
              <h3 class="text-gray-600 font-semibold text-xs sm:text-sm mt-2 sm:mt-4">Project Complited</h3>
            </div>
            <div class="bg-gradient-to-br from-cyan-200 via-sky-100 to-blue-200 p-4 sm:p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div class="flex justify-center mb-2 sm:mb-3">
                <Medal size={32} strokeWidth={1.5} class="text-black sm:w-[42px] sm:h-[42px]" />
              </div>
              <h4 class="text-black font-bold text-xl sm:text-2xl">1+</h4>
              <h3 class="text-gray-600 font-semibold text-xs sm:text-sm mt-2 sm:mt-4">Years Experience</h3>
            </div>
            <div class="bg-gradient-to-br from-emerald-200 via-green-100 to-teal-200 p-4 sm:p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div class="flex justify-center mb-2 sm:mb-3">
                <Brain size={32} strokeWidth={1.5} class="text-black sm:w-[42px] sm:h-[42px]" />
              </div>
              <h4 class="text-black font-bold text-xl sm:text-2xl">15+</h4>
              <h3 class="text-gray-600 font-semibold text-xs sm:text-sm mt-2 sm:mt-4">Technologies Mastered</h3>
            </div>
            <div class="bg-gradient-to-br from-violet-200 via-purple-100 to-fuchsia-200 p-4 sm:p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div class="flex justify-center mb-2 sm:mb-3">
                <Heart size={32} strokeWidth={1.5} class="text-black sm:w-[42px] sm:h-[42px]" />
              </div>
              <h3 class="text-black font-bold text-xl sm:text-2xl">100%</h3>
              <h3 class="text-gray-600 font-semibold text-xs sm:text-sm mt-2 sm:mt-4">Client Satisfaction</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;