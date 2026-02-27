import { Component, createSignal, createEffect, Show, onMount } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import { ProjectService, type DesignProject } from '../services/ProjectService';

const DesignDetail: Component = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [design, setDesign] = createSignal<DesignProject | null>(null);
  const [loading, setLoading] = createSignal(true);

  onMount(() => {
    loadDesign();
  });

  const loadDesign = async () => {
    try {
      setLoading(true);
      const designData = await ProjectService.getDesignProjectById(params.id);
      if (designData) {
        setDesign(designData);
        
        // Update meta tags dynamically
        updateMetaTags(designData);
      } else {
        // Redirect to home if design not found
        navigate('/');
      }
    } catch (error) {
      console.error('Error loading design:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const updateMetaTags = (design: DesignProject) => {
    const url = window.location.href;
    const imageUrl = design.cover_image;
    
    // Update Open Graph tags
    updateMetaTag('og:url', url);
    updateMetaTag('og:title', `${design.name} - Muhammad Fauzil Adim`);
    updateMetaTag('og:description', design.description);
    updateMetaTag('og:image', imageUrl);
    
    // Update Twitter tags
    updateMetaTag('twitter:url', url);
    updateMetaTag('twitter:title', `${design.name} - Muhammad Fauzil Adim`);
    updateMetaTag('twitter:description', design.description);
    updateMetaTag('twitter:image', imageUrl);
    
    // Update page title
    document.title = `${design.name} - Muhammad Fauzil Adim`;
  };

  const updateMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  return (
    <div class="min-h-screen bg-white">
      <Show when={loading()}>
        <div class="flex items-center justify-center min-h-screen">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
      </Show>

      <Show when={!loading() && design()}>
        <div class="max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            class="mb-8 flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Portfolio
          </button>

          {/* Design Content */}
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={design()!.cover_image}
              alt={design()!.name}
              class="w-full h-auto object-cover"
            />
            
            <div class="p-8">
              <h1 class="text-4xl font-bold text-black mb-4">{design()!.name}</h1>
              <p class="text-gray-600 text-lg leading-relaxed">{design()!.description}</p>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default DesignDetail;
