import { Component, For, createSignal } from 'solid-js';
import { Github, Globe, ChevronDown, ChevronUp } from 'lucide-solid';

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  deployUrl?: string;
  bgColor: string;
};

const Projects: Component = () => {
  const [showAll, setShowAll] = createSignal(false);

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-commerce',
      description: 'Platform e-commerce modern dengan fitur lengkap, payment gateway, dan dashboard admin.',
      image: '/Project1.png',
      technologies: ['React', 'Rest API'],
      githubUrl: '#',
      deployUrl: '#',
      bgColor: 'from-red-400 to-pink-400'
    },
    {
      id: '2',
      title: 'Trybe Course',
      description: 'Platform pembelajaran online dengan video streaming, quiz interaktif, dan tracking progress.',
      image: '/Project2.png',
      technologies: ['React native', 'Redux'],
      githubUrl: '#',
      deployUrl: '#',
      bgColor: 'from-emerald-600 to-teal-700'
    },
    {
      id: '3',
      title: 'Trybetunes',
      description: 'Aplikasi musik streaming dengan playlist kustom, rekomendasi AI, dan social features.',
      image: '/Project3.png',
      technologies: ['HTML', 'CSS', 'JS', 'Redux'],
      githubUrl: '#',
      deployUrl: '#',
      bgColor: 'from-orange-400 to-red-400'
    },
    {
      id: '4',
      title: 'Project Management App',
      description: 'Aplikasi manajemen proyek dengan kanban board, realtime updates, dan role-based access.',
      image: '/Project4.png',
      technologies: ['SolidJS', 'Tailwind', 'REST API'],
      githubUrl: '#',
      deployUrl: '#',
      bgColor: 'from-purple-500 to-indigo-600'
    },
    {
      id: '5',
      title: 'Fitness Tracker',
      description: 'Aplikasi tracking olahraga dengan statistik mingguan dan integrasi wearable.',
      image: '/Project5.png',
      technologies: ['React Native', 'Context API'],
      githubUrl: '#',
      deployUrl: '#',
      bgColor: 'from-blue-400 to-cyan-400'
    },
    {
      id: '6',
      title: 'Finance Dashboard',
      description: 'Dashboard keuangan interaktif untuk memantau pemasukan, pengeluaran, dan laporan bulanan.',
      image: '/Project6.png',
      technologies: ['React', 'Chart.js', 'Node.js'],
      githubUrl: '#',
      deployUrl: '#',
      bgColor: 'from-yellow-400 to-amber-500'
    },
    {
      id: '7',
      title: 'Travel Explorer',
      description: 'Aplikasi eksplorasi destinasi dengan rekomendasi hotel, itinerary, dan API maps.',
      image: '/Project7.png',
      technologies: ['Next.js', 'Maps API'],
      githubUrl: '#',
      deployUrl: '#',
      bgColor: 'from-teal-400 to-lime-400'
    },
    {
      id: '8',
      title: 'Chat App Realtime',
      description: 'Aplikasi chat realtime dengan grup, DM, dan status online/offline.',
      image: '/Project8.png',
      technologies: ['Node.js', 'Socket.io', 'React'],
      githubUrl: '#',
      deployUrl: '#',
      bgColor: 'from-slate-600 to-gray-800'
    },
    {
      id: '9',
      title: 'Portfolio Generator',
      description: 'Web app untuk membuat portfolio otomatis dengan template modern.',
      image: '/Project9.png',
      technologies: ['Vue', 'Tailwind'],
      githubUrl: '#',
      deployUrl: '#',
      bgColor: 'from-pink-500 to-rose-600'
    }
  ];

  const visibleProjects = () => (showAll() ? projects : projects.slice(0, 3));

  return (
    <section class="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* BACKGROUND EFFECTS */}
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: 2s"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style="animation-delay: 4s"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <div class="text-center mb-16 animate-fadeIn">
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-8">My Projects</h2>
          <p class="text-black/70 text-lg max-w-3xl mx-auto">
            A collection of projects I’ve built using modern technologies and industry best practices.
          </p>
        </div>

        {/* PROJECT GRID */}
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <For each={visibleProjects()}>
            {(project, index) => (
              <div
                class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group animate-slideUp p-3 border"
                style={`animation-delay: ${index() * 0.1}s; animation-fill-mode: both;`}
              >
                <div class="p-4">
                  <h3 class="text-xl font-bold text-black mb-3">{project.title}</h3>

                  <div class="flex flex-wrap gap-2 mb-4">
                    <For each={project.technologies}>
                      {(tech) => (
                        <span class="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                          {tech}
                        </span>
                      )}
                    </For>
                  </div>
                </div>

                {/* IMAGE */}
                <div class={`relative p-2 bg-gradient-to-br rounded-xl ${project.bgColor}`}>
                  <div class="bg-white rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      class="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div class="p-6">
                  <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <a href={project.githubUrl} class="flex items-center gap-2 text-gray-700 hover:text-black font-medium text-sm transition-colors duration-300">
                      <Github size={18} />
                      Github
                    </a>
                    <a href={project.deployUrl} class="flex items-center gap-2 text-gray-700 hover:text-black font-medium text-sm transition-colors duration-300">
                      <Globe size={18} />
                      Deploy
                    </a>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>

        {projects.length > 3 && (
          <div class="mt-16 text-center animate-slideUp">
            <h3 class="mb-4 text-gray-600 text-sm">Some projects may not be displayed due to confidentiality or ownership restrictions.</h3>
            <button
              onClick={() => setShowAll(!showAll())}
              class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {showAll() ? 'Show Less' : 'Show More'}
              {showAll() ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
