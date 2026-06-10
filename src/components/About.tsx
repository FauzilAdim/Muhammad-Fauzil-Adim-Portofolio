import { Component, createSignal, onMount } from 'solid-js';

const About: Component = () => {
  let sectionRef!: HTMLDivElement;
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15, // Trigger when 15% of the section is visible
      }
    );
    if (sectionRef) {
      observer.observe(sectionRef);
    }
  });

  return (
    <section ref={sectionRef} class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div
            class={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
              isVisible()
                ? 'opacity-100 translate-x-0 blur-0'
                : 'opacity-0 -translate-x-24 blur-sm'
            }`}
          >
            <h2 class="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
              About
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
            </div>
          </div>

          {/* Photo Section */}
          <div class="relative mt-8 lg:mt-0">
            {/* Decorative glossy glass accent behind the photo */}
            <div
              class={`absolute -top-6 -right-6 w-full h-full rounded-2xl glossy-glass-card pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300 transform ${
                isVisible()
                  ? 'opacity-100 translate-x-0 translate-y-0 scale-100 blur-0'
                  : 'opacity-0 translate-x-32 translate-y-4 scale-90 blur-sm'
              }`}
            ></div>
            <div class="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-black/5 pointer-events-none"></div>

            {/* Entry animation wrapper to prevent conflicts with hover effect */}
            <div
              class={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 transform ${
                isVisible()
                  ? 'opacity-100 translate-x-0 scale-100 blur-0'
                  : 'opacity-0 translate-x-24 scale-95 blur-sm'
              }`}
            >
              <div class="about-photo-card relative rounded-2xl overflow-hidden shadow-2xl">
                <div class="rounded-2xl overflow-hidden relative aspect-[4/5] sm:aspect-[5/6]">
                  <img
                    src="/photo-about/photo-portofolio.png"
                    alt="Muhammad Fauzil Adim - Full Stack Developer"
                    class="w-full h-full object-cover object-top"
                    loading="lazy"
                  />

                  {/* Subtle dark gradient from bottom for text readability */}
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Name overlay at bottom */}
                  <div class="absolute bottom-5 sm:bottom-8 left-5 sm:left-8 right-5 sm:right-8 text-white">
                    <h3 class="text-xl sm:text-2xl font-bold tracking-tight">Muhammad Fauzil Adim</h3>
                    <p class="text-sm sm:text-base text-gray-300 mt-1">Full Stack Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;