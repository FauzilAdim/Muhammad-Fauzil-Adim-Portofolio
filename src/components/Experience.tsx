import { Component, For, createSignal } from 'solid-js';
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp, CheckCircle, Code } from 'lucide-solid';

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
  companyLogo?: string;
  companyWebsite?: string;
};

type SectionProps = {
  className?: string;
};

const Experience: Component<SectionProps> = (props) => {
  const [selectedExperience, setSelectedExperience] = createSignal<string | null>(null);

  const experiences: WorkExperience[] = [
    {
      id: '1',
      company: 'PT. Smartelco Solusi Teknologi',
      position: 'Junior Developer',
      location: 'Kantor PT SMARTELCO, Jl. Sida Mukti, Dusun II, Sokaraja Kulon, Kec.Sokaraja',
      startDate: '2024-12',
      endDate: '2025-11',
      isCurrentJob: true,
      description: 'Contract • 1 year',
        responsibilities: [
    'Develop web applications using Rust, React.js, and Solid.js',
    'Implement RESTful APIs and integrate databases',
    'Collaborate with the team in developing new features',
    'Perform application testing and debugging',
    'Document code and technical specifications'
     ],
      projects: [],
      technologies: ['Rust', 'React.js', 'Solid.js', 'Express.js', 'SurrealDB', 'PostgreSQL'],
      companyLogo: '🏢',
      companyWebsite: 'https://smartelco.co.id'
    },
    {
      id: '2',
      company: 'CV. Rumah Mesin',
      position: 'Search Engine Optimization Specialist',
      location: 'Bantul, Daerah Istimewa Yogyakarta, Indonesia • Di lokasi',
      startDate: '2022-04',
      endDate: '2022-09',
      isCurrentJob: false,
      description: 'Internship • 6 months',
    responsibilities: [
    'Implement off-page and on-page SEO strategies',
    'Create articles optimized for SEO',
    'Identify websites suitable for article placement'
    ],
      projects: [],
      technologies: ['SEO', 'Copywriting', 'Content Writing', 'Google Analytics'],
      companyLogo: '📝',
      companyWebsite: 'https://rumahmesin.com'
    }
  ];

//   const formatDate = (dateStr: string): string => {
//     const [year, month] = dateStr.split('-');
//     const monthNames = [
//       'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
//       'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
//     ];
//     return `${monthNames[parseInt(month) - 1]} ${year}`;
//   };

//   const calculateDuration = (startDate: string, endDate: string, isCurrentJob: boolean): string => {
//     const start = new Date(startDate);
//     const end = isCurrentJob ? new Date() : new Date(endDate);
    
//     const diffTime = Math.abs(end.getTime() - start.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     const diffMonths = Math.floor(diffDays / 30);
//     const years = Math.floor(diffMonths / 12);
//     const months = diffMonths % 12;
    
//     if (years > 0) {
//       return months > 0 ? `${years} thn ${months} bln` : `${years} thn`;
//     }
//     return `${months} bln`;
//   };

  const toggleExperience = (expId: string) => {
    setSelectedExperience(selectedExperience() === expId ? null : expId);
  };

  return (
    <section
      id="experience"
      class={`py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${props.className || ''}`}
    >
      {/* Background Effects */}
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: 2s"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: 4s"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-16 animate-fadeIn">
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-8">
            Experiences
          </h2>
          <p class="text-black/70 text-lg max-w-3xl mx-auto">
            My professional journey as a developer encompasses diverse roles in the technology industry, where I have delivered impactful and scalable digital solutions.
          </p>
        </div>

        {/* Experience Timeline */}
        <div class="relative">
          {/* Timeline Line */}
          <div class="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gray-600 rounded-full opacity-30" 
               style={`height: calc(100% - 40px)`}></div>

          <div class="space-y-16">
            <For each={experiences}>
              {(exp, index) => (
                <div class={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                  index() % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Timeline Dot */}
                  <div class="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2 w-5 h-5 bg-gray-600 rounded-full border-4 border-white shadow-lg z-10 animate-pulse"></div>
                  
                  {/* Content with slide animation */}
                  <div class={`flex-1 ml-16 md:ml-0 ${
                    index() % 2 === 0 
                      ? 'md:animate-slideFromLeft animate-slideUp' 
                      : 'md:animate-slideFromRight animate-slideUp'
                  }`} style={`animation-delay: ${index() * 0.2}s; animation-fill-mode: both;`}>
                    <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative border">
                      {/* Current Job Badge */}
                      {exp.isCurrentJob && (
                        <div class="absolute -top-3 -right-3">
                          <span class="bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg animate-pulse">
                            ✨ Current Position
                          </span>
                        </div>
                      )}

                      {/* Header */}
                      <div class="flex items-start gap-4 mb-4">
                        <div class="text-5xl flex-shrink-0">{exp.companyLogo}</div>
                        <div class="flex-1">
                          <h3 class="text-xl font-bold text-black mb-1">{exp.position}</h3>
                          <div class="text-gray-700 font-medium mb-1">{exp.company}</div>
                          <div class="text-sm text-gray-600 mb-2">{exp.description}</div>
                          <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPin size={14} class="flex-shrink-0" />
                            <span class="line-clamp-1">{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Technologies/Skills */}
                      <div class="mb-4">
                        <h4 class="text-sm font-semibold text-black mb-2 flex items-center gap-2">
                          <Code size={16} />
                          Skills:
                        </h4>
                        <div class="flex flex-wrap gap-2">
                          <For each={exp.technologies}>
                            {(tech) => (
                              <span class="text-sm text-gray-700">
                                {tech}
                                {exp.technologies.indexOf(tech) < exp.technologies.length - 1 && ' · '}
                              </span>
                            )}
                          </For>
                        </div>
                      </div>

                      {/* Toggle Details Button */}
                      <button
                        type="button"
                        onClick={() => toggleExperience(exp.id)}
                        class="w-full bg-gradient-to-r from-yellow-200 via-green-100 to-cyan-200 text-black-900 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
                      >
                        {selectedExperience() === exp.id ? (
                          <>
                            <ChevronUp size={18} />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown size={18} />
                            Show More
                          </>
                        )}
                      </button>

                      {/* Detailed Information (Collapsible) */}
                      {selectedExperience() === exp.id && (
                        <div class="mt-6 pt-6 border-t border-gray-200 space-y-6 animate-slideUp">
                          {/* Responsibilities */}
                          <div>
                            <h4 class="text-base font-semibold mb-3 text-black flex items-center gap-2">
                              <Briefcase size={18} />
                              Key Responsibilities
                            </h4>
                            <ul class="space-y-2">
                              <For each={exp.responsibilities}>
                                {(responsibility) => (
                                  <li class="flex items-start gap-3 text-gray-700 text-sm">
                                    <CheckCircle size={16} class="text-blue-500 mt-0.5 flex-shrink-0" />
                                    <span>{responsibility}</span>
                                  </li>
                                )}
                              </For>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Empty space for timeline balance */}
                  <div class="flex-1 hidden md:block"></div>
                </div>
              )}
            </For>
          </div>
        </div>

        {/* Experience Summary */}
        <div class="mt-20 pt-12 border-t border-gray-200 animate-slideUp">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-orange-200 via-amber-100 to-yellow-200 p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div class="flex justify-center mb-3">
                <Briefcase size={42} strokeWidth={1.5} class="text-black" />
              </div>
              <h2 class="text-black font-bold text-2xl">{experiences.length}</h2>
              <h3 class="text-gray-600 font-semibold text-sm mt-4">Companies</h3>
            </div>
            
            <div class="bg-gradient-to-br from-cyan-200 via-sky-100 to-blue-200 p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div class="flex justify-center mb-3">
                <Calendar size={42} strokeWidth={1.5} class="text-black" />
              </div>
              <h4 class="text-black font-bold text-2xl">2+</h4>
              <h3 class="text-gray-600 font-semibold text-sm mt-4">Years of Experience</h3>
            </div>
            
            <div class="bg-gradient-to-br from-emerald-200 via-green-100 to-teal-200 p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl col-span-2 md:col-span-1">
              <div class="flex justify-center mb-3">
                <Code size={42} strokeWidth={1.5} class="text-black" />
              </div>
              <h4 class="text-black font-bold text-2xl">
                {[...new Set(experiences.flatMap(exp => exp.technologies))].length}
              </h4>
              <h3 class="text-gray-600 font-semibold text-sm mt-4">Technologies Mastered</h3>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideFromLeft {
          animation: slideFromLeft 0.8s ease-out;
        }

        .animate-slideFromRight {
          animation: slideFromRight 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Experience;