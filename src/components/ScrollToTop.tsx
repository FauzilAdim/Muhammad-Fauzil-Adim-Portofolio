import { Component, createSignal, onMount, onCleanup, createEffect } from 'solid-js';
import { ArrowUp } from 'lucide-solid';

const ScrollToTop: Component = () => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [isModalOpen, setIsModalOpen] = createSignal(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Watch for body overflow changes (modal open/close)
  const checkModalState = () => {
    if (typeof document !== 'undefined') {
      setIsModalOpen(document.body.style.overflow === 'hidden');
    }
  };

  onMount(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    // Create MutationObserver to watch body style changes
    const observer = new MutationObserver(checkModalState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style']
    });
    
    // Cleanup observer
    onCleanup(() => {
      observer.disconnect();
    });
  });

  onCleanup(() => {
    window.removeEventListener('scroll', toggleVisibility);
  });

  return (
    <button
      onClick={scrollToTop}
      class={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 w-11 h-11 sm:w-12 sm:h-12 bg-black hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform ${
        isVisible() && !isModalOpen() ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} class="sm:w-6 sm:h-6" />
    </button>
  );
};

export default ScrollToTop;
