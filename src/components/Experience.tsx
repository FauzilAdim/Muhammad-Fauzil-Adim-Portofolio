import { Component, For, createSignal, onMount, onCleanup } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle,
  Code,
  Building2,
  Search,
} from 'lucide-solid';

type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  role: string;
  achievements: string[];
};

type WorkExperience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
  responsibilities: string[];
  projects: Project[];
  technologies: string[];
  icon: Component<{ size?: number | string; class?: string; strokeWidth?: number | string }>;
  companyWebsite?: string;
};

type SectionProps = {
  className?: string;
};

const Experience: Component<SectionProps> = (props) => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [scrollProgress, setScrollProgress] = createSignal(0);
  const [translateX, setTranslateX] = createSignal(0);
  const [isMounted, setIsMounted] = createSignal(false);

  let sectionRef!: HTMLDivElement;
  let stickyRef!: HTMLDivElement;
  let trackRef!: HTMLDivElement;
  let wrapperRef!: HTMLDivElement;

  const experiences: WorkExperience[] = [
    {
      id: '1',
      company: 'PT. Smartelco Solusi Teknologi',
      position: 'Junior Developer',
      location: 'Sokaraja Kulon, Kec. Sokaraja, Banyumas',
      startDate: '2024-12',
      endDate: '2025-11',
      isCurrentJob: true,
      description: 'Contract • 1 year',
      responsibilities: [
        'Develop web applications using Rust, React.js, and Solid.js',
        'Implement RESTful APIs and integrate databases',
        'Collaborate with the team in developing new features',
        'Perform application testing and debugging',
        'Document code and technical specifications',
      ],
      projects: [],
      technologies: ['Rust', 'React.js', 'Solid.js', 'Express.js', 'SurrealDB', 'PostgreSQL'],
      icon: Building2,
      companyWebsite: 'https://smartelco.co.id',
    },
    {
      id: '2',
      company: 'CV. Rumah Mesin',
      position: 'Search Engine Optimization Specialist',
      location: 'Bantul, Daerah Istimewa Yogyakarta, Indonesia • On-site',
      startDate: '2022-04',
      endDate: '2022-09',
      isCurrentJob: false,
      description: 'Internship • 6 months',
      responsibilities: [
        'Implement off-page and on-page SEO strategies',
        'Create articles optimized for SEO',
        'Identify websites suitable for article placement',
      ],
      projects: [],
      technologies: ['SEO', 'Copywriting', 'Content Writing', 'Google Analytics'],
      icon: Search,
      companyWebsite: 'https://rumahmesin.com',
    },
  ];

  onMount(() => {
    setIsMounted(true);
    // Intersection observer for fade-in animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef) {
      observer.observe(sectionRef);
    }

    // Scroll-driven horizontal translation
    const handleScroll = () => {
      if (!wrapperRef || !trackRef) return;

      // Skip horizontal scroll on mobile (vertical fallback)
      if (window.innerWidth < 768) {
        setTranslateX(0);
        setScrollProgress(0);
        return;
      }

      const rect = wrapperRef.getBoundingClientRect();
      const wrapperHeight = wrapperRef.offsetHeight;
      const vh = window.innerHeight;

      // How far the wrapper has scrolled past the top of viewport
      const scrolledPast = -rect.top;
      // Total scrollable distance (wrapper height minus one viewport)
      const scrollDistance = wrapperHeight - vh;

      if (scrollDistance <= 0) {
        setScrollProgress(0);
        setTranslateX(0);
        return;
      }

      const clamped = Math.max(0, Math.min(scrolledPast, scrollDistance));
      const progress = clamped / scrollDistance;

      // Total overflow = track width - viewport width
      const trackWidth = trackRef.scrollWidth;
      const overflow = trackWidth - window.innerWidth + 80;
      const maxTranslate = Math.max(0, overflow);

      setScrollProgress(progress);
      setTranslateX(-progress * maxTranslate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    onCleanup(() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      observer.disconnect();
    });
  });

  // Dynamic section height: enough scroll room for all cards to pass
  const sectionHeight = () => {
    if (!isMounted()) return 'auto';
    // Wider cards + more spacing = longer scroll distance for immersive feel
    const totalCardsWidth = experiences.length * 760 + 500;
    const scrollRoom = Math.max(totalCardsWidth, 2200);
    return `${scrollRoom}px`;
  };

  return (
    <>
      <style>{`
        /* ====== Horizontal Scroll Experience ====== */

        .hscroll-section {
          position: relative;
        }

        .hscroll-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .hscroll-track {
          display: flex;
          gap: 32px;
          padding: 0 40px;
          will-change: transform;
          align-items: flex-start;
        }

        .hscroll-card {
          flex-shrink: 0;
          width: 720px;
          background: linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04)) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          border-radius: 24px;
          padding: 40px;
          border: 1px solid rgba(255,255,255,0.18) !important;
          box-shadow:
            0 8px 32px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.15) !important;
          transition: box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease;
        }

        .hscroll-card:hover {
          box-shadow:
            0 16px 48px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.2) !important;
          transform: translateY(-4px);
          border-color: rgba(170,238,0,0.4) !important;
        }

        /* Horizontal scroll wrapper */
        .hscroll-wrapper {
          position: relative;
        }

        /* Stats card at the end */
        .hscroll-stats {
          flex-shrink: 0;
          width: 400px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .hscroll-stat-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04)) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.18) !important;
          box-shadow:
            0 6px 24px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.15) !important;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .hscroll-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #AAEE00;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Mobile fallback */
        @media (max-width: 767px) {
          .hscroll-section {
            height: auto !important;
          }

          .hscroll-sticky {
            position: relative;
            height: auto;
            min-height: auto;
            padding: 20px 0;
          }

          .hscroll-track {
            flex-direction: column;
            padding: 0 16px;
            transform: none !important;
          }

          .hscroll-card {
            width: 100%;
          }

          /* Stack two-column layout vertically on mobile */
          .hscroll-card-inner {
            flex-direction: column !important;
          }

          .hscroll-card-inner > .w-px {
            width: 100% !important;
            height: 1px !important;
          }

          .hscroll-header {
            display: none;
          }

          .hscroll-wrapper {
            height: auto !important;
          }

          .hscroll-stats {
            width: 100%;
            padding: 0 16px;
          }

          .hscroll-progress-bar,
          .hscroll-hint {
            display: none;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        class={`hscroll-section ${props.className || ''}`}
        style={{ background: '#000000' }}
      >
        {/* Horizontal Scroll Area */}
        <div
          ref={wrapperRef}
          class="hscroll-wrapper"
          style={{ height: sectionHeight() }}
        >
        <div
          ref={stickyRef}
          class={`hscroll-sticky transition-opacity duration-700 ${
            isVisible() ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            ref={trackRef}
            class="hscroll-track"
            style={{ transform: `translateX(${translateX()}px)` }}
          >
            {/* Experience Cards */}
            <For each={experiences}>
              {(exp) => (
                <div class="hscroll-card relative">
                  {/* Current Job Badge */}
                  {exp.isCurrentJob && (
                    <div class="absolute -top-3 right-6">
                      <span class="inline-flex items-center gap-2 bg-[#AAEE00] text-black text-xs font-semibold px-4 py-2 rounded-full shadow-md">
                        <span class="w-1.5 h-1.5 rounded-full bg-black"></span>
                        Current Position
                      </span>
                    </div>
                  )}

                  {/* Two-column layout: Left = Info + Skills, Right = Responsibilities */}
                  <div class="hscroll-card-inner flex gap-8">
                    {/* Left Column */}
                    <div class="flex-1 min-w-0">
                      {/* Header */}
                      <div class="flex items-start gap-4 mb-6">
                        <div class="w-14 h-14 rounded-xl bg-[#AAEE00] flex items-center justify-center flex-shrink-0">
                          <Dynamic component={exp.icon} size={26} class="text-black" strokeWidth={1.75} />
                        </div>
                        <div class="flex-1 min-w-0">
                          <h3 class="text-xl font-bold text-white mb-1">{exp.position}</h3>
                          <div class="text-gray-200 font-medium">{exp.company}</div>
                          <div class="text-sm text-gray-300 mt-1">{exp.description}</div>
                          <div class="flex items-center gap-2 text-sm text-gray-300 mt-2">
                            <MapPin size={14} class="flex-shrink-0" />
                            <span class="line-clamp-1">{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Technologies / Skills */}
                      <div>
                        <h4 class="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                          <Code size={16} />
                          Skills
                        </h4>
                        <div class="flex flex-wrap gap-2">
                          <For each={exp.technologies}>
                            {(tech) => (
                              <span class="px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/10">
                                {tech}
                              </span>
                            )}
                          </For>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div class="w-px bg-white/10 flex-shrink-0"></div>

                    {/* Right Column — Key Responsibilities */}
                    <div class="flex-1 min-w-0">
                      <h4 class="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                        <Briefcase size={16} />
                        Key Responsibilities
                      </h4>
                      <ul class="space-y-3">
                        <For each={exp.responsibilities}>
                          {(responsibility) => (
                            <li class="flex items-start gap-3 text-gray-200 text-sm">
                              <CheckCircle
                                size={16}
                                class="mt-0.5 flex-shrink-0 text-[#AAEE00]"
                              />
                              <span>{responsibility}</span>
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </For>

            {/* Stats Panel at the end */}
            <div class="hscroll-stats">
              <div class="hscroll-stat-card">
                <div class="hscroll-stat-icon">
                  <Briefcase size={24} strokeWidth={1.75} class="text-black" />
                </div>
                <div>
                  <h3 class="text-white font-bold text-2xl">{experiences.length}</h3>
                  <p class="text-gray-400 font-medium text-sm">Companies</p>
                </div>
              </div>

              <div class="hscroll-stat-card">
                <div class="hscroll-stat-icon">
                  <Calendar size={24} strokeWidth={1.75} class="text-black" />
                </div>
                <div>
                  <h3 class="text-white font-bold text-2xl">2+</h3>
                  <p class="text-gray-400 font-medium text-sm">Years of Experience</p>
                </div>
              </div>

              <div class="hscroll-stat-card">
                <div class="hscroll-stat-icon">
                  <Code size={24} strokeWidth={1.75} class="text-black" />
                </div>
                <div>
                  <h3 class="text-white font-bold text-2xl">
                    {[...new Set(experiences.flatMap((exp) => exp.technologies))].length}
                  </h3>
                  <p class="text-gray-400 font-medium text-sm">Technologies Mastered</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        </div>
      </section>
    </>
  );
};

export default Experience;