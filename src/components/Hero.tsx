import { Component, createSignal, onMount, onCleanup } from 'solid-js';

const Hero: Component = () => {
  const [displayText, setDisplayText] = createSignal('');
  const [textIndex, setTextIndex] = createSignal(0);
  const [isDeleting, setIsDeleting] = createSignal(false);
  let timer: number;
  
  const texts = [
    'Fullstack Developer',
    'Junior Developer'
  ];

  onMount(() => {
    let charIndex = 0;

    const type = () => {
      const currentText = texts[textIndex()];
      
      if (!isDeleting()) {
        // Typing
        if (charIndex <= currentText.length) {
          setDisplayText(currentText.substring(0, charIndex));
          charIndex++;
          timer = window.setTimeout(type, 100); // Kecepatan mengetik
        } else {
          // Pause sebelum delete
          timer = window.setTimeout(() => {
            setIsDeleting(true);
            type();
          }, 2000); // Pause 2 detik
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          charIndex--;
          setDisplayText(currentText.substring(0, charIndex));
          timer = window.setTimeout(type, 50); // Kecepatan menghapus (lebih cepat)
        } else {
          // Pindah ke text berikutnya
          setIsDeleting(false);
          setTextIndex((textIndex() + 1) % texts.length);
          timer = window.setTimeout(type, 500); // Pause sebelum mulai text baru
        }
      }
    };

    type();

    onCleanup(() => {
      if (timer) window.clearTimeout(timer);
    });
  });

  return (
    <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: 2s"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: 4s"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        
        {/* Card Wrapper dengan Gradient Background */}
        <div class="bg-gradient-to-br from-yellow-200 via-green-100 to-cyan-200 rounded-3xl p-2 lg:p-1 shadow-2xl w-full h-196">
          
          <div class="text-center">
            <div>
              {/* Main Title */}
              <h1 class="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-8 animate-fadeIn mt-16">
                <span class="text-black">
                  Hello, I'm Muhammad Fauzil Adim
                </span>
              </h1>

              {/* Animated Typing Text */}
              <h2 class="text-2xl md:text-4xl font-semibold text-black mb-8 animate-slideUp min-h-[3rem] flex items-center justify-center">
                <span>{displayText()}</span>
                <span class="inline-block w-1 h-8 md:h-12 bg-black ml-1 animate-pulse"></span>
              </h2>

              {/* Description */}
              <p class="text-black text-lg md:text-xl max-w-4xl mx-auto mb-12 animate-slideUp leading-relaxed">
                Passionate about creating innovative digital solutions with modern technologies. Specialized in building scalable web applications, mobile apps, and user-centered designs that make a real impact.
              </p>
            </div>

            {/* CTA Buttons */}
            <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slideUp">
              <a 
                href="#services" 
                class="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 glow-border hover:scale-105 shadow-lg inline-block"
              >
                View Portfolio 
              </a>
              <a 
                href="/CV.pdf" 
                download="Muhammad_Fauzil_Adim_CV.pdf"
                class="text-black px-8 py-4 text-lg font-semibold transition-all duration-300 hover:text-gray-600 inline-block"
              >
                Download CV →
              </a>
            </div>

            {/* Scroll Indicator */}
            <div class="mt-20 animate-bounce pb-10">
              <p class="text-gray-600 text-sm mb-2">Discover More</p>
              <div class="w-6 h-6 mx-auto">
                <svg class="w-full h-full text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default Hero;