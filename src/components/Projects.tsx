import { Component, For, createSignal, createEffect, Show, onMount } from 'solid-js';
import { Github, Globe, ChevronDown, ChevronUp } from 'lucide-solid';
import { ProjectService, type Project, type DesignProject } from '../services/ProjectService';

// Inject slide animations CSS
const injectSlideAnimations = () => {
  if (typeof document === 'undefined') return;
  
  const styleId = 'slide-animations';
  if (document.getElementById(styleId)) return;
  
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
    
    @keyframes slideUpModal {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInBackdrop {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes fadeInButtons {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes spinToHeart {
      0% {
        transform: rotate(0deg) scale(1);
        opacity: 1;
      }
      50% {
        transform: rotate(180deg) scale(0.8);
        opacity: 0.8;
      }
      100% {
        transform: rotate(360deg) scale(1);
        opacity: 0;
      }
    }
    
    @keyframes heartPop {
      0% {
        transform: scale(0);
        opacity: 0;
      }
      50% {
        transform: scale(1.3);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    @keyframes heartBounce {
      0%, 100% {
        transform: scale(1);
      }
      25% {
        transform: scale(1.2);
      }
      50% {
        transform: scale(0.95);
      }
      75% {
        transform: scale(1.05);
      }
    }
    
    .spinner-to-heart {
      animation: spinToHeart 0.6s ease-in-out forwards;
    }
    
    .heart-pop {
      animation: heartPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    
    .heart-bounce {
      animation: heartBounce 0.6s ease-in-out;
    }
    
    /* Modal animations */
    .modal-backdrop {
      animation: fadeInBackdrop 0.25s ease-out;
    }
    
    .modal-content {
      animation: slideUpModal 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    /* Action buttons animations */
    .action-buttons {
      animation: fadeInButtons 0.4s ease-out 0.3s both;
    }
    
    /* Tooltip slide animation */
    .tooltip-slide {
      opacity: 0;
      transform: translateX(10px) translateY(-50%);
      transition: all 0.2s ease-out;
    }
    
    .group\/tooltip:hover .tooltip-slide {
      opacity: 1;
      transform: translateX(0) translateY(-50%);
    }
    
    .animate-slideInRight {
      animation: slideInRight 0.5s ease-out;
    }
    
    .animate-slideInLeft {
      animation: slideInLeft 0.5s ease-out;
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
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

// Combined type for display
type DisplayProject = {
  id: string;
  name: string;
  cover_image: string;
  description: string;
  category: 'web' | 'mobile' | 'design';
  type: 'project' | 'design';
  // Project specific
  link_portfolio?: string;
  stack?: string[];
  // Design specific
  images?: string[];
  views?: number;
  likes?: number;
};

const Projects: Component = () => {
  const [showAll, setShowAll] = createSignal(false);
  const [selectedCategory, setSelectedCategory] = createSignal<'all' | 'web' | 'mobile' | 'design'>('all');
  const [loading, setLoading] = createSignal(true);
  const [selectedDesign, setSelectedDesign] = createSignal<DesignProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = createSignal(0);
  const [allProjects, setAllProjects] = createSignal<DisplayProject[]>([]);
  const [showShareModal, setShowShareModal] = createSignal(false);
  const [shareUrl, setShareUrl] = createSignal('');
  const [copied, setCopied] = createSignal(false);
  const [isLiked, setIsLiked] = createSignal(false);
  const [likesCount, setLikesCount] = createSignal(0);
  const [viewsCount, setViewsCount] = createSignal(0);
  const [isLiking, setIsLiking] = createSignal(false);
  const [cardLikeStates, setCardLikeStates] = createSignal<Record<string, boolean>>({});
  const [cardLikingStates, setCardLikingStates] = createSignal<Record<string, boolean>>({});
  
  let thumbnailContainerRef: HTMLDivElement | undefined;
  
  onMount(() => {
    injectSlideAnimations();
    
    // Check if there's a design ID in URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const designId = urlParams.get('design');
    if (designId) {
      // Wait for projects to load, then open the modal
      setTimeout(() => {
        openDesignModal(designId);
      }, 500);
    }
  });
  
  // Auto-scroll thumbnail list
  createEffect(() => {
    const index = currentImageIndex();
    if (thumbnailContainerRef && selectedDesign()) {
      const thumbnailWidth = 100;
      const gap = 16;
      const containerWidth = thumbnailContainerRef.clientWidth;
      const scrollPosition = (thumbnailWidth + gap) * index - (containerWidth / 2) + (thumbnailWidth / 2);
      
      thumbnailContainerRef.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  });

  // Load all projects
  createEffect(async () => {
    setLoading(true);
    try {
      // Fetch both projects and design projects
      const [projects, designProjects] = await Promise.all([
        ProjectService.getAllProjects(),
        ProjectService.getAllDesignProjects()
      ]);

      // Convert to display format
      const displayProjects: DisplayProject[] = [
        ...projects.map(p => ({
          id: p.id,
          name: p.name,
          cover_image: p.cover_image,
          description: p.description,
          category: p.category,
          type: 'project' as const,
          link_portfolio: p.link_portfolio,
          stack: p.stack
        })),
        ...designProjects.map(d => ({
          id: d.id,
          name: d.name,
          cover_image: d.cover_image,
          description: d.description,
          category: 'design' as const,
          type: 'design' as const,
          images: d.images,
          views: d.views || 0,
          likes: d.likes || 0
        }))
      ];

      setAllProjects(displayProjects);
      
      // Load like states for all design projects
      const likeStates: Record<string, boolean> = {};
      await Promise.all(
        designProjects.map(async (d) => {
          try {
            const liked = await ProjectService.checkLikeStatus(d.id);
            likeStates[d.id] = liked;
          } catch (error) {
            likeStates[d.id] = false;
          }
        })
      );
      setCardLikeStates(likeStates);
    } catch (error) {
      console.error('Error loading projects:', error);
      setAllProjects([]);
    } finally {
      setLoading(false);
    }
  });

  // Modal functions
  const openDesignModal = async (designId: string) => {
    try {
      const design = await ProjectService.getDesignProjectById(designId);
      if (design) {
        setSelectedDesign(design);
        setCurrentImageIndex(0);
        setLikesCount(design.likes || 0);
        setViewsCount(design.views || 0);
        document.body.style.overflow = 'hidden';
        
        // Increment view count (fire and forget, don't block UI)
        ProjectService.incrementView(designId).catch(err => {
          console.error('Failed to increment view:', err);
        });
        setViewsCount(prev => prev + 1);
        
        // Check like status (fire and forget)
        ProjectService.checkLikeStatus(designId)
          .then(liked => setIsLiked(liked))
          .catch(err => console.error('Failed to check like status:', err));
      }
    } catch (error) {
      console.error('Error loading design:', error);
    }
  };

  const closeModal = () => {
    setSelectedDesign(null);
    setCurrentImageIndex(0);
    setIsLiked(false);
    setLikesCount(0);
    setViewsCount(0);
    setIsLiking(false);
    document.body.style.overflow = 'auto';
  };

  const openShareModal = () => {
    const design = selectedDesign();
    if (design) {
      // Use /design/:id route for better OG preview
      // Add version parameter to force cache refresh
      const url = `${window.location.origin}/design/${design.id}?v=6`;
      setShareUrl(url);
      setShowShareModal(true);
    }
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setCopied(false);
  };

  const handleLikeToggle = async () => {
    const design = selectedDesign();
    if (!design || isLiking()) return;

    setIsLiking(true);

    try {
      // Simulate loading for smooth animation
      await new Promise(resolve => setTimeout(resolve, 600));

      const result = await ProjectService.toggleLike(design.id);
      if (result.success) {
        setIsLiked(result.liked);
        setLikesCount(prev => result.liked ? prev + 1 : prev - 1);
        
        // Update card like state
        setCardLikeStates(prev => ({ ...prev, [design.id]: result.liked }));
        
        // Update project in list
        setAllProjects(prev => prev.map(p => 
          p.id === design.id 
            ? { ...p, likes: result.liked ? (p.likes || 0) + 1 : Math.max((p.likes || 0) - 1, 0) }
            : p
        ));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCardLike = async (e: MouseEvent, projectId: string) => {
    e.stopPropagation();
    
    const likingStates = cardLikingStates();
    if (likingStates[projectId]) return;

    setCardLikingStates(prev => ({ ...prev, [projectId]: true }));

    try {
      // Simulate loading for smooth animation
      await new Promise(resolve => setTimeout(resolve, 600));

      const result = await ProjectService.toggleLike(projectId);
      if (result.success) {
        setCardLikeStates(prev => ({ ...prev, [projectId]: result.liked }));
        
        // Update project likes count in list
        setAllProjects(prev => prev.map(p => 
          p.id === projectId 
            ? { ...p, likes: result.liked ? (p.likes || 0) + 1 : Math.max((p.likes || 0) - 1, 0) }
            : p
        ));

        // If modal is open for this design, update modal state too
        const design = selectedDesign();
        if (design && design.id === projectId) {
          setIsLiked(result.liked);
          setLikesCount(prev => result.liked ? prev + 1 : prev - 1);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setCardLikingStates(prev => ({ ...prev, [projectId]: false }));
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToSocial = (platform: 'pinterest' | 'instagram' | 'whatsapp') => {
    const design = selectedDesign();
    if (!design) return;

    const url = encodeURIComponent(shareUrl());
    const text = encodeURIComponent(design.name);
    const imageUrl = encodeURIComponent(design.cover_image);

    let shareLink = '';
    switch (platform) {
      case 'pinterest':
        shareLink = `https://pinterest.com/pin/create/button/?url=${url}&media=${imageUrl}&description=${text}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we copy to clipboard
        copyToClipboard();
        alert('Link copied! Open Instagram and paste it in your story or post.');
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  const [slideDirection, setSlideDirection] = createSignal<'left' | 'right'>('right');

  const nextImage = () => {
    const design = selectedDesign();
    if (design && design.images) {
      setSlideDirection('right');
      setCurrentImageIndex((prev) => (prev + 1) % design.images.length);
    }
  };

  const prevImage = () => {
    const design = selectedDesign();
    if (design && design.images) {
      setSlideDirection('left');
      setCurrentImageIndex((prev) => (prev - 1 + design.images.length) % design.images.length);
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

  // Filter projects
  const filteredProjects = () => {
    if (selectedCategory() === 'all') {
      return allProjects();
    }
    return allProjects().filter(project => project.category === selectedCategory());
  };

  const visibleProjects = () => (showAll() ? filteredProjects() : filteredProjects().slice(0, 6));

  // Handle click
  const handleProjectClick = (project: DisplayProject) => {
    if (project.type === 'project' && project.link_portfolio) {
      // Open external link
      window.open(project.link_portfolio, '_blank');
    } else if (project.type === 'design') {
      // Open modal
      openDesignModal(project.id);
    }
  };

  // Get gradient color based on category
  const getGradientColor = (category: string) => {
    switch (category) {
      case 'web':
        return 'from-blue-400 to-cyan-400';
      case 'mobile':
        return 'from-purple-500 to-indigo-600';
      case 'design':
        return 'from-pink-500 to-rose-600';
      default:
        return 'from-blue-400 to-cyan-400';
    }
  };

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
            A collection of projects I've built using modern technologies and industry best practices.
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
                {/* Design Projects - Dribbble Style */}
                {project.category === 'design' ? (
                  <div
                    class="group cursor-pointer animate-slideUp"
                    style={`animation-delay: ${index() * 0.1}s; animation-fill-mode: both;`}
                    onClick={() => handleProjectClick(project)}
                  >
                    {/* Image Container */}
                    <div class="relative overflow-hidden rounded-2xl bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300">
                      <img
                        src={project.cover_image}
                        alt={project.name}
                        class="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Hover Overlay - Gradient 40% */}
                      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div class="absolute bottom-0 left-0 right-0 p-6">
                          {/* Title and Stats */}
                          <div class="flex items-end justify-between gap-4">
                            <h3 class="text-white text-xl font-medium truncate flex-1">{project.name}</h3>
                            
                            {/* Stats with clickable heart */}
                            <div class="flex items-center gap-4 flex-shrink-0 text-white text-sm">
                              {/* Likes - Clickable (First, like Dribbble) */}
                              <button
                                onClick={(e) => handleCardLike(e, project.id)}
                                class={`flex items-center gap-1.5 transition-colors relative ${
                                  cardLikingStates()[project.id] ? 'pointer-events-none' : ''
                                }`}
                              >
                                {/* Loading Spinner */}
                                <Show when={cardLikingStates()[project.id]}>
                                  <div class="absolute inset-0 flex items-center justify-center spinner-to-heart">
                                    <svg class="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24">
                                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                  </div>
                                </Show>
                                
                                <svg 
                                  class={`w-4 h-4 transition-all ${
                                    cardLikeStates()[project.id] ? 'text-red-400 fill-current heart-bounce' : 'text-white'
                                  } ${cardLikingStates()[project.id] ? 'opacity-0' : 'opacity-100'}`}
                                  fill="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                <span class={cardLikeStates()[project.id] ? 'text-red-400' : 'text-white'}>{project.likes || 0}</span>
                              </button>
                              
                              {/* Views (Second) */}
                              <div class="flex items-center gap-1.5 text-white">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                </svg>
                                <span>{project.views || 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Image Count Badge */}
                      <Show when={project.images && project.images.length > 1}>
                        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg flex items-center gap-1.5">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          {project.images!.length}
                        </div>
                      </Show>
                    </div>
                  </div>
                ) : (
                  /* Web & Mobile Projects - Card with Gradient */
                  <div
                    class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group animate-slideUp p-3 border cursor-pointer"
                    style={`animation-delay: ${index() * 0.1}s; animation-fill-mode: both;`}
                    onClick={() => handleProjectClick(project)}
                  >
                    <div class="p-4">
                      <h3 class="text-xl font-bold text-black mb-3">{project.name}</h3>

                      <Show when={project.stack && project.stack.length > 0}>
                        <div class="flex flex-wrap gap-2 mb-4">
                          <For each={project.stack}>
                            {(tech) => (
                              <span class="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                                {tech}
                              </span>
                            )}
                          </For>
                        </div>
                      </Show>
                    </div>

                    <div class={`relative p-2 bg-gradient-to-br rounded-2xl ${getGradientColor(project.category)}`}>
                      <div class="bg-white rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={project.cover_image}
                          alt={project.name}
                          class="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <div class="p-6">
                      <p class="text-gray-600 text-sm mb-4">{project.description}</p>
                      <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <Show when={project.link_portfolio}>
                          <div class="flex items-center gap-2 text-gray-700 hover:text-black font-medium text-sm transition-colors duration-300">
                            <Globe size={18} />
                            View Live
                          </div>
                        </Show>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            </For>
          </div>
        </Show>

        {!loading() && filteredProjects().length > 6 && (
          <div class="mt-16 text-center animate-slideUp">
            <button
              onClick={() => setShowAll(!showAll())}
              class="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {showAll() ? 'Show Less' : 'Show More'}
              {showAll() ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        )}

        {/* Empty State */}
        <Show when={!loading() && filteredProjects().length === 0}>
          <div class="text-center py-12">
            <p class="text-gray-600 text-lg">No projects found in this category.</p>
          </div>
        </Show>
      </div>

      {/* Design Image Preview Modal - Dribbble Style with Slide Up */}
      <Show when={selectedDesign()}>
        <div 
          class="fixed inset-0 bg-black/60 z-50 flex items-end justify-center modal-backdrop"
          onClick={closeModal}
        >
          {/* Modal Container - Slides up from bottom */}
          <div 
            class="bg-white w-full max-w-7xl rounded-t-3xl shadow-2xl overflow-hidden modal-content"
            style="max-height: 90vh;"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div class="sticky top-0 bg-white border-b border-gray-200 z-10">
              <div class="px-6 py-4 flex items-center justify-between">
                <h2 class="text-xl font-bold text-black">{selectedDesign()!.name}</h2>
                <button
                  onClick={closeModal}
                  class="text-gray-600 hover:text-black transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div class="overflow-y-auto" style="max-height: calc(90vh - 73px);">
              <div class="px-6 py-8">
                <div class="grid lg:grid-cols-3 gap-8">
                  {/* Left: Image Gallery */}
                  <div class="lg:col-span-2">
                    <Show when={selectedDesign()!.images && selectedDesign()!.images.length > 0}>
                      {/* Main Image */}
                      <div class="bg-gray-50 rounded-2xl overflow-hidden mb-6 shadow-lg relative flex items-center justify-center" style="min-height: 400px; max-height: 600px;">
                        <img
                          src={selectedDesign()!.images[currentImageIndex()]}
                          alt={`${selectedDesign()!.name} - Image ${currentImageIndex() + 1}`}
                          class="w-full h-auto max-h-[600px] object-contain"
                        />
                        
                        {/* Navigation Arrows */}
                        <Show when={selectedDesign()!.images.length > 1}>
                          <button
                            onClick={prevImage}
                            class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 hover:text-gray-700 transition-colors"
                          >
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
                            </svg>
                          </button>

                          <button
                            onClick={nextImage}
                            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-900 hover:text-gray-700 transition-colors"
                          >
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                            </svg>
                          </button>
                        </Show>
                      </div>

                      {/* Thumbnail Gallery - Horizontal Scroll */}
                      <Show when={selectedDesign()!.images.length > 1}>
                        <div class="relative">
                          <div 
                            ref={thumbnailContainerRef}
                            class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
                          >
                            <For each={selectedDesign()!.images}>
                              {(image, idx) => (
                                <button
                                  onClick={() => goToImage(idx())}
                                  class={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                                    currentImageIndex() === idx()
                                      ? 'opacity-100 bg-white shadow-md'
                                      : 'opacity-40 hover:opacity-70'
                                  }`}
                                  style="width: 120px; height: 90px;"
                                >
                                  <img
                                    src={image}
                                    alt={`Thumbnail ${idx() + 1}`}
                                    class="w-full h-full object-cover"
                                  />
                                </button>
                              )}
                            </For>
                          </div>
                        </div>
                      </Show>
                    </Show>
                  </div>

                  {/* Right: Info Sidebar */}
                  <div class="lg:col-span-1">
                    <div class="lg:sticky lg:top-8">
                      {/* Description */}
                      <div class="mb-6">
                        <h3 class="text-sm font-semibold text-black uppercase tracking-wide mb-3">Description</h3>
                        <p class="text-black leading-relaxed">{selectedDesign()!.description}</p>
                      </div>

                      {/* Stats */}
                      <div class="border-t border-gray-200 pt-6">
                        <div class="flex items-center justify-end gap-4">
                          {/* Likes (First, like Dribbble) */}
                          <div class={`flex items-center gap-1.5 transition-colors ${
                            isLiked() ? 'text-red-500' : 'text-gray-600'
                          }`}>
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <span class="text-sm">{likesCount()}</span>
                          </div>
                          
                          {/* Views (Second) */}
                          <div class="flex items-center gap-1.5 text-gray-600">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                            </svg>
                            <span class="text-sm">{viewsCount()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons - Right Side with Arrow Tooltip */}
          <div 
            class="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50 action-buttons"
          >
            {/* Like Button - Heroicons Heart with Animation */}
            <div class="relative group">
              <button 
                class={`p-3 rounded-full shadow-md border transition-all duration-200 relative ${
                  isLiked() 
                    ? 'bg-red-50 border-red-300 hover:bg-red-100' 
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                } ${isLiking() ? 'pointer-events-none' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeToggle();
                }}
              >
                {/* Loading Spinner - Red */}
                <Show when={isLiking()}>
                  <div class="absolute inset-0 flex items-center justify-center spinner-to-heart">
                    <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </Show>

                {/* Heart Icon */}
                <svg 
                  class={`w-5 h-5 transition-all duration-200 ${
                    isLiked() ? 'text-red-500 fill-red-500 heart-bounce' : 'text-gray-900'
                  } ${isLiking() ? 'opacity-0' : 'opacity-100'}`} 
                  fill={isLiked() ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
              {/* Tooltip with Arrow */}
              <div class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
                <div class="relative">
                  <div class="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl whitespace-nowrap shadow-lg">
                    {isLiking() ? 'Loading...' : isLiked() ? 'Unlike' : 'Like'}
                  </div>
                  {/* Arrow */}
                  <div class="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900"></div>
                </div>
              </div>
            </div>
            
            {/* Share Button - Heroicons Arrow Up Tray */}
            <div class="relative group">
              <button 
                class="bg-white hover:bg-gray-50 p-3 rounded-full shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  openShareModal();
                }}
              >
                <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </button>
              {/* Tooltip with Arrow */}
              <div class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
                <div class="relative">
                  <div class="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl whitespace-nowrap shadow-lg">
                    Share
                  </div>
                  {/* Arrow */}
                  <div class="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>

      {/* Share Modal */}
      <Show when={showShareModal()}>
        <div 
          class="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
          onClick={closeShareModal}
        >
          <div 
            class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeShareModal}
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {/* Logo */}
            <div class="flex justify-center mb-6">
              <img src="/Logo.png" alt="Portfolio Logo" class="w-32 h-32 object-contain" />
            </div>

            {/* Title */}
            <h3 class="text-2xl font-bold text-center text-gray-900 mb-8">
              Share this with your social<br />Community
            </h3>

            {/* Social Media Buttons */}
            <div class="flex justify-center gap-6 mb-8">
              {/* Pinterest */}
              <button
                onClick={() => shareToSocial('pinterest')}
                class="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                title="Share on Pinterest"
              >
                <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </button>

              {/* X (Twitter) */}
              <button
                onClick={() => shareToSocial('instagram')}
                class="w-16 h-16 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                title="Share on X"
              >
                <svg class="w-7 h-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
            </div>

            {/* Divider with "or copy link" */}
            <div class="text-center text-gray-400 text-sm mb-4">
              or copy link
            </div>

            {/* Copy URL - Full Width Input with Copy Button Inside */}
            <div class="relative">
              <input
                type="text"
                value={shareUrl()}
                readonly
                class="w-full px-4 py-3 pr-24 bg-gray-100 rounded-xl text-sm text-gray-500 focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                class="absolute right-2 top-1/2 transform -translate-y-1/2 px-5 py-2 rounded-lg font-semibold text-sm bg-white text-gray-900 hover:bg-gray-50 shadow-sm transition-all"
              >
                Copy
              </button>
            </div>

            {/* Toast Notification */}
            <Show when={copied()}>
              <div class="absolute bottom-6 inset-x-6 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fadeIn">
                <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div class="flex-1">
                  <div class="font-semibold text-sm">Link Copied</div>
                  <div class="text-xs text-gray-300">A link to this page has been copied to your clipboard!</div>
                </div>
                <button
                  onClick={() => setCopied(false)}
                  class="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </Show>
          </div>
        </div>
      </Show>
    </section>
  );
};

export default Projects;
