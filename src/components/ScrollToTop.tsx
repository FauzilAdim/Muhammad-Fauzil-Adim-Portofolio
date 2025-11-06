import { Component, createSignal, onMount, onCleanup } from 'solid-js';
import { ArrowUp } from 'lucide-solid';

const ScrollToTop: Component = () => {
  const [isVisible, setIsVisible] = createSignal(false);

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

  onMount(() => {
    window.addEventListener('scroll', toggleVisibility);
  });

  onCleanup(() => {
    window.removeEventListener('scroll', toggleVisibility);
  });

  return (
    <button
      onClick={scrollToTop}
      class={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-11 h-11 sm:w-12 sm:h-12 bg-black hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform ${
        isVisible() ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} class="sm:w-6 sm:h-6" />
    </button>
  );
};

export default ScrollToTop;
