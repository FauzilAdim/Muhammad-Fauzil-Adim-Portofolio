import { Component } from 'solid-js';
import { Wrench, Atom, Smartphone, Database, Palette } from 'lucide-solid';

const Services: Component = () => {
  
  return (
    <section class="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: 2s"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: 4s"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="rounded-3xl p-6 shadow-2xl">
          {/* Header */}
          <div class="text-center mb-16 animate-fadeIn">
            <h2 class="text-4xl md:text-5xl font-bold text-black mb-8">
              My Skills
            </h2>
            <p class="text-black/70 text-lg max-w-3xl mx-auto">
              We offer a wide range of cutting-edge technology services to help your business stay ahead 
              in the competitive digital landscape.
            </p>
          </div>

          {/* Services Grid */}
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Backend Development */}
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 border">
              <div class="mb-6 bg-gradient-to-br from-blue-200 via-blue-100 to-cyan-100 rounded-2xl p-6 flex justify-center items-center">
                <Wrench size={48} class="text-blue-600" />
              </div>
              <h3 class="text-xl font-bold text-black mb-4 text-center">Backend Development</h3>
              <p class="text-gray-600 mb-6 text-sm leading-relaxed text-center">
                Backend and API development with a strong focus on performance, security, and scalable architecture.
              </p>
              <div class="flex flex-wrap gap-2 justify-center">
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Rust
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Golang
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Java
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Node.js
                </div>
              </div>
            </div>

            {/* Frontend */}
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 border">
              <div class="mb-6 bg-gradient-to-br from-purple-200 via-purple-100 to-pink-100 rounded-2xl p-6 flex justify-center items-center">
                <Atom size={48} class="text-purple-600" />
              </div>
              <h3 class="text-xl font-bold text-black mb-4 text-center">Frontend Development</h3>
              <p class="text-gray-600 mb-6 text-sm leading-relaxed text-center">
                Modern UI/UX design and interactive applications using the latest frameworks.
              </p>
              <div class="flex flex-wrap gap-2 justify-center">
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  SolidJS
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  React.js
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Next.js
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  TypeScript
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Tailwind CSS
                </div>
              </div>
            </div>

            {/* Mobile Developer */}
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 border">
              <div class="mb-6 bg-gradient-to-br from-green-200 via-green-100 to-emerald-100 rounded-2xl p-6 flex justify-center items-center">
                <Smartphone size={48} class="text-green-600" />
              </div>
              <h3 class="text-xl font-bold text-black mb-4 text-center">Mobile Developer</h3>
              <p class="text-gray-600 mb-6 text-sm leading-relaxed text-center">
                Native and cross-platform mobile application development for an excellent user experience.
              </p>
              <div class="flex flex-wrap gap-2 justify-center">
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Kotlin
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Flutter
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  React Native
                </div>
              </div>
            </div>

            {/* Databases */}
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 border">
              <div class="mb-6 bg-gradient-to-br from-orange-200 via-orange-100 to-amber-100 rounded-2xl p-6 flex justify-center items-center">
                <Database size={48} class="text-orange-600" />
              </div>
              <h3 class="text-xl font-bold text-black mb-4 text-center">Databases</h3>
              <p class="text-gray-600 mb-6 text-sm leading-relaxed text-center">
                Database design and optimization for applications ranging from small to large scale.
              </p>
              <div class="flex flex-wrap gap-2 justify-center">
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  PostgreSQL
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  MySQL
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  MongoDB
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  SurrealDB
                </div>
              </div>
            </div>

            {/* Design & Mapping */}
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 border">
              <div class="mb-6 bg-gradient-to-br from-pink-200 via-pink-100 to-rose-100 rounded-2xl p-6 flex justify-center items-center">
                <Palette size={48} class="text-pink-600" />
              </div>
              <h3 class="text-xl font-bold text-black mb-4 text-center">Design & Mapping</h3>
              <p class="text-gray-600 mb-6 text-sm leading-relaxed text-center">
                Visual design, mapping, and multimedia production to create engaging product presentations.
              </p>
              <div class="flex flex-wrap gap-2 justify-center">
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Figma
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Adobe Illustrator
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Photoshop
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  UI/UX Design
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Adobe After Effects
                </div>
                <div class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm">
                  Adobe Premiere
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;