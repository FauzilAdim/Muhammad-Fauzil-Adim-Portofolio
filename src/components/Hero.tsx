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
    <>
      <style>{`
        .btn-glass {
          background: rgba(15, 23, 42, 0.35);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <section class="relative min-h-[100svh] flex flex-col justify-center pt-32 pb-16 overflow-hidden">
        {/* Video Background Container */}
        <div class="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <video
            src="/video-backround/bakcround-hero.mp4"
            autoplay
            loop
            muted
            playsinline
            class="w-full h-full object-cover"
          />
          {/* Dark overlay that fades to the page background at the bottom */}
          <div class="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-[black]"></div>
        </div>

        <div class="site-container relative z-10 w-full">
          <div class="text-center">
            {/* Main Title */}
            <h1 class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-medium mb-8 animate-fadeIn mt-8 sm:mt-10 px-4">
              <span class="text-white">
                Hello, I'm <br class="sm:hidden" />Muhammad Fauzil Adim
              </span>
            </h1>

            {/* Animated Typing Text */}
            <h2 class="text-xl sm:text-2xl md:text-4xl font-semibold text-white mb-6 sm:mb-8 animate-slideUp min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center px-4">
              <span>{displayText()}</span>
              <span class="inline-block w-0.5 sm:w-1 h-6 sm:h-8 md:h-12 bg-white ml-1 animate-pulse"></span>
            </h2>



            {/* CTA Buttons */}
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 animate-slideUp px-4">
              <a
                href="#services"
                class="bg-black hover:bg-[#AAEE00] text-white hover:text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg inline-block text-center"
              >
                View Portfolio
              </a>
              <a
                href="/CV.pdf"
                download="Muhammad_Fauzil_Adim_CV.pdf"
                class="btn-glass px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 inline-block text-center"
              >
                Download CV →
              </a>
            </div>

            {/* Scroll Indicator */}
            <div class="mt-12 sm:mt-20 animate-bounce pb-6 sm:pb-10">
              <p class="text-white text-xs sm:text-sm mb-2">Discover More</p>
              <div class="w-5 h-5 sm:w-6 sm:h-6 mx-auto">
                <svg class="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;