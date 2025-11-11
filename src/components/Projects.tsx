import { Component, For, createSignal, createEffect, Show, onMount } from 'solid-js';
import { Github, Globe, ChevronDown, ChevronUp } from 'lucide-solid';
import { ProjectService, type Project as APIProject } from '../services/ProjectService';

// Inject slide animations CSS
const injectSlideAnimations = () => {
  if (typeof document === 'undefined') return;
  
  const styleId = 'slide-animations';
  if (document.getElementById(styleId)) return; // Already injected
  
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideInLeft {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .animate-slideInRight {
      animation: slideInRight 0.5s ease-out;
    }
    
    .animate-slideInLeft {
      animation: slideInLeft 0.5s ease-out;
    }
    
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    .thumbnail-container {
      position: relative;
    }
    
    .thumbnail-container::before,
    .thumbnail-container::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 60px;
      pointer-events: none;
      z-index: 10;
    }
    
    .thumbnail-container::before {
      left: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.9), transparent);
    }
    
    .thumbnail-container::after {
      right: 0;
      background: linear-gradient(to left, rgba(0,0,0,0.9), transparent);
    }
  `;
  document.head.appendChild(style);
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[]; // Multiple images for modal slider
  technologies: string[];
  githubUrl?: string;
  deployUrl?: string;
  bgColor: string;
  category: 'web' | 'mobile' | 'design';
};

const Projects: Component = () => {
  const [showAll, setShowAll] = createSignal(false);
  const [selectedCategory, setSelectedCategory] = createSignal<'all' | 'web' | 'mobile' | 'design'>('all');
  const [apiProjects, setApiProjects] = createSignal<APIProject[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [selectedProject, setSelectedProject] = createSignal<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = createSignal(0);
  
  // Ref for thumbnail container
  let thumbnailContainerRef: HTMLDivElement | undefined;
  
  // Inject CSS animations on mount
  onMount(() => {
    injectSlideAnimations();
  });
  
  // Auto-scroll thumbnail list when image changes
  createEffect(() => {
    const index = currentImageIndex();
    if (thumbnailContainerRef && selectedProject()) {
      // Calculate scroll position to center the active thumbnail
      const thumbnailWidth = 100; // Width of each thumbnail
      const gap = 16; // Gap between thumbnails (gap-4 = 16px)
      const containerWidth = thumbnailContainerRef.clientWidth;
      
      // Calculate position to scroll to (center the active thumbnail)
      const scrollPosition = (thumbnailWidth + gap) * index - (containerWidth / 2) + (thumbnailWidth / 2);
      
      // Smooth scroll to position
      thumbnailContainerRef.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  });

  // Modal functions
  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden'; // Prevent scroll
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'auto'; // Restore scroll
  };

  const [slideDirection, setSlideDirection] = createSignal<'left' | 'right'>('right');

  const nextImage = () => {
    const project = selectedProject();
    if (project && project.images) {
      setSlideDirection('right');
      setCurrentImageIndex((prev) => (prev + 1) % project.images!.length);
    }
  };

  const prevImage = () => {
    const project = selectedProject();
    if (project && project.images) {
      setSlideDirection('left');
      setCurrentImageIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
    }
  };

  const goToImage = (index: number) => {
    const currentIndex = currentImageIndex();
    if (index > currentIndex) {
      setSlideDirection('right');
    } else if (index < currentIndex) {
      setSlideDirection('left');
    }
    setCurrentImageIndex(index);
  };

  // Load projects from API - always load all projects
  createEffect(async () => {
    setLoading(true);
    try {
      const data = await ProjectService.getAllProjects();
      setApiProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      setApiProjects([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  });

  // NO MORE HARDCODED PROJECTS - ALL FROM API ONLY

  // Convert API projects to display format
  const convertedApiProjects = (): Project[] => {
    return apiProjects().map(project => {
      // Map backend category to frontend category
      let displayCategory: 'web' | 'mobile' | 'design' = 'web';
      
      if (project.category === 'mobile_development') {
        displayCategory = 'mobile';
      } else if (project.category === 'design_&_ui/ux') {
        displayCategory = 'design';
      } else if (project.category === 'web_development') {
        displayCategory = 'web';
      }
      
      // Determine bgColor based on category
      let bgColor = 'from-blue-400 to-cyan-400';
      if (displayCategory === 'mobile') {
        bgColor = 'from-purple-500 to-indigo-600';
      } else if (displayCategory === 'design') {
        bgColor = 'from-pink-500 to-rose-600';
      } else if (displayCategory === 'web') {
        bgColor = 'from-blue-400 to-cyan-400';
      }
      
      return {
        id: project.id,
        title: project.name,
        description: project.description,
        image: ProjectService.getCoverImage(project.images), // Use cover image (first image)
        images: ProjectService.getAllImageUrls(project.images), // All images for modal
        technologies: [],
        bgColor,
        category: displayCategory
      };
    });
  };

  // Use only API projects - no hardcoded projects
  const allProjects = () => {
    return convertedApiProjects();
  };

  const filteredProjects = () => {
    if (selectedCategory() === 'all') {
      return allProjects();
    }
    return allProjects().filter(project => project.category === selectedCategory());
  };

  const visibleProjects = () => (showAll() ? filteredProjects() : filteredProjects().slice(0, 3));

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

        {/* FILTER BUTTONS */}
        <div class="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setShowAll(false);
            }}
            class={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
              selectedCategory() === 'all'
                ? 'bg-black text-white shadow-lg scale-105'
                : 'bg-white text-black border-2 border-gray-200 hover:border-black'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => {
              setSelectedCategory('web');
              setShowAll(false);
            }}
            class={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
              selectedCategory() === 'web'
                ? 'bg-black text-white shadow-lg scale-105'
                : 'bg-white text-black border-2 border-gray-200 hover:border-black'
            }`}
          >
            Web Development
          </button>
          <button
            onClick={() => {
              setSelectedCategory('mobile');
              setShowAll(false);
            }}
            class={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
              selectedCategory() === 'mobile'
                ? 'bg-black text-white shadow-lg scale-105'
                : 'bg-white text-black border-2 border-gray-200 hover:border-black'
            }`}
          >
            Mobile Development
          </button>
          <button
            onClick={() => {
              setSelectedCategory('design');
              setShowAll(false);
            }}
            class={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
              selectedCategory() === 'design'
                ? 'bg-black text-white shadow-lg scale-105'
                : 'bg-white text-black border-2 border-gray-200 hover:border-black'
            }`}
          >
            Design & UI/UX
          </button>
        </div>

        {/* Loading State */}
        <Show when={loading()}>
          <div class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
            <p class="text-black/70 text-lg">Loading projects...</p>
          </div>
        </Show>

        {/* PROJECT GRID */}
        <Show when={!loading()}>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <For each={visibleProjects()}>
            {(project, index) => (
              <>
                {/* Design Projects - Full Image Layout with Preview */}
                {project.category === 'design' ? (
                  <div
                    class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group animate-slideUp border"
                    style={`animation-delay: ${index() * 0.1}s; animation-fill-mode: both;`}
                  >
                    {/* Full Image with Hover Effect */}
                    <div class="relative overflow-hidden cursor-pointer" onClick={() => project.images && project.images.length > 0 && openModal(project)}>
                      <img
                        src={project.image}
                        alt={project.title}
                        class="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Dark Overlay on Hover */}
                      <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        {/* Eye Icon & Text - Centered */}
                        <div class="transform scale-0 group-hover:scale-100 transition-transform duration-500 flex flex-col items-center justify-center">
                          <svg class="w-16 h-16 text-white mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          <p class="text-white text-center font-semibold text-lg">View Details</p>
                        </div>
                      </div>
                      {/* Image Count Badge */}
                      <Show when={project.images && project.images.length > 1}>
                        <div class="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {project.images!.length} images
                        </div>
                      </Show>
                    </div>

                    {/* Content */}
                    <div class="p-6">
                      <h3 class="text-xl font-bold text-black mb-2">{project.title}</h3>
                      <p class="text-gray-600 text-sm mb-4">{project.description}</p>

                      <div class="flex flex-wrap gap-2 mb-4">
                        <For each={project.technologies}>
                          {(tech) => (
                            <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                              {tech}
                            </span>
                          )}
                        </For>
                      </div>

                      {/* Like & Comment Buttons */}
                      <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <button class="flex items-center gap-2 text-gray-700 hover:text-red-500 font-medium text-sm transition-colors duration-300">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                          </svg>
                          <span>0</span>
                        </button>
                        <button class="flex items-center gap-2 text-gray-700 hover:text-blue-500 font-medium text-sm transition-colors duration-300">
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                          </svg>
                          <span>0</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Web & Mobile Projects - Card with Gradient */
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

                    {/* IMAGE with Gradient */}
                    <div class={`relative p-2 bg-gradient-to-br rounded-2xl ${project.bgColor}`}>
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
              </>
            )}
            </For>
          </div>
        </Show>

        {!loading() && filteredProjects().length > 3 && (
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

      {/* Image Preview Modal */}
      <Show when={selectedProject()}>
        <div 
          class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeModal}
        >
          <div class="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={closeModal}
              class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Project Title */}
            <div class="text-center mb-6">
              <h2 class="text-3xl font-bold text-white mb-2">{selectedProject()!.title}</h2>
              <p class="text-gray-300">{selectedProject()!.description}</p>
            </div>

            {/* Main Image with Slide Animation */}
            <div class="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <Show when={selectedProject()!.images && selectedProject()!.images!.length > 0}>
                <div class="relative w-full" style="min-height: 400px;">
                  {/* Wrap img in div with key for proper re-rendering */}
                  <div 
                    class={slideDirection() === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'}
                  >
                    <img
                      src={selectedProject()!.images![currentImageIndex()]}
                      alt={`${selectedProject()!.title} - Image ${currentImageIndex() + 1}`}
                      class="w-full h-auto max-h-[70vh] object-contain"
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <Show when={selectedProject()!.images!.length > 1}>
                  {/* Previous Button */}
                  <button
                    onClick={prevImage}
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={nextImage}
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>

                  {/* Image Counter */}
                  <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {currentImageIndex() + 1} / {selectedProject()!.images!.length}
                  </div>
                </Show>
              </Show>
            </div>

            {/* Thumbnail Navigation - Improved with Auto-Scroll */}
            <Show when={selectedProject()!.images && selectedProject()!.images!.length > 1}>
              <div class="mt-8 thumbnail-container">
                <div 
                  ref={thumbnailContainerRef}
                  class="flex gap-4 justify-start overflow-x-auto pb-4 px-4 scrollbar-hide"
                >
                  <For each={selectedProject()!.images}>
                    {(image, idx) => (
                      <button
                        onClick={() => goToImage(idx())}
                        class={`flex-shrink-0 rounded-xl overflow-hidden border-3 transition-all duration-300 ${
                          currentImageIndex() === idx()
                            ? 'border-white shadow-lg shadow-white/50 scale-110 ring-2 ring-white/50'
                            : 'border-gray-500 opacity-50 hover:opacity-100 hover:border-white/70 hover:scale-105'
                        }`}
                        style="width: 100px; height: 100px;"
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${idx() + 1}`}
                          class="w-full h-full object-cover"
                        />
                        {/* Active Indicator */}
                        <Show when={currentImageIndex() === idx()}>
                          <div class="absolute inset-0 border-2 border-white rounded-xl pointer-events-none"></div>
                        </Show>
                      </button>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </section>
  );
};

export default Projects;
