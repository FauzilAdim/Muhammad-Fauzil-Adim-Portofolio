import { Component, For, Show } from 'solid-js';

type DesignProject = {
  id: string;
  name: string;
  cover_image: string;
  images?: string[];
};

type DesignShowcaseProps = {
  designs: DesignProject[];
  onDesignClick: (id: string) => void;
  onSeeMoreClick: () => void;
};

const DesignShowcase: Component<DesignShowcaseProps> = (props) => {
  return (
    <div class="mb-20">
      <h3 class="text-2xl font-bold text-black mb-8">Design & UI/UX</h3>
      
      {/* Horizontal Scroll Container */}
      <div class="relative">
        <div class="flex gap-8 overflow-x-auto scrollbar-hide pb-4">
          {/* Show first 5 design projects */}
          <For each={props.designs.slice(0, 5)}>
            {(design) => (
              <div
                class="flex-shrink-0 w-[280px] sm:w-[450px] md:w-[600px] cursor-pointer group"
                onClick={() => props.onDesignClick(design.id)}
              >
                <div class="relative overflow-hidden rounded-3xl bg-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img
                    src={design.cover_image}
                    alt={design.name}
                    class="w-full h-[250px] sm:h-[380px] md:h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover Overlay */}
                  <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image Count Badge */}
                  <Show when={design.images && design.images.length > 1}>
                    <div class="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg flex items-center gap-2">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {design.images!.length}
                    </div>
                  </Show>
                </div>
              </div>
            )}
          </For>
          
          {/* See More Button */}
          <Show when={props.designs.length > 5}>
            <div class="flex-shrink-0 w-[280px] sm:w-[450px] md:w-[600px] flex items-center justify-center">
              <button
                onClick={props.onSeeMoreClick}
                class="flex flex-col items-center justify-center gap-6 w-full h-[250px] sm:h-[380px] md:h-[500px] rounded-3xl border-2 border-dashed border-gray-300 hover:border-black transition-all duration-300 group"
              >
                <div class="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <span class="text-xl font-semibold text-black">See More Designs</span>
              </button>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default DesignShowcase;
