import { Component } from 'solid-js';

const Services: Component = () => {
  
  return (
    <section class="py-20 px-10 sm:px-6 lg:px-8" style={{ background: '#F0F0F0' }}>
      <div class="max-w-7xl mx-auto">
        {/* Header */}
        <div class="text-center mb-16 animate-fadeIn">
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-8">
            My Skills
          </h2>
          <p class="text-gray-700 text-lg max-w-3xl mx-auto">
            I offer a comprehensive range of cutting-edge technology services to help businesses stay ahead 
            in the competitive digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div class="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
          
          {/* Backend Development */}
          <div class="flex flex-col items-start" style={{ width: '220px' }}>
            <div 
              class="relative overflow-hidden flex items-center justify-center mb-4"
              style={{
                width: '220px',
                height: '220px',
                'border-radius': '20px',
                'background-image': 'url(/gradient-backround/backend-development.png)',
                'background-size': 'cover',
                'background-position': 'center'
              }}
            >
              {/* Icon with gradient */}
              <div class="relative z-10" style={{ width: '80px', height: '80px' }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="backend-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#FFB800;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#backend-gradient)" d="M5.507 4.048A3 3 0 0 1 7.785 3h8.43a3 3 0 0 1 2.278 1.048l1.722 2.008A4.533 4.533 0 0 0 19.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008Z" />
                  <path fill="url(#backend-gradient)" fill-rule="evenodd" d="M3 9.75a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v.158a3 3 0 0 1-1.5.659V9.75a1.5 1.5 0 0 0-1.5-1.5H6a1.5 1.5 0 0 0-1.5 1.5v.659A3 3 0 0 1 3 9.909V9.75ZM18 12.75h.008v.008H18v-.008Zm-12 0h.008v.008H6v-.008Z" clip-rule="evenodd" />
                  <path fill="url(#backend-gradient)" d="M3 14.25a3 3 0 0 1 1.5-.659v.659a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-.659a3 3 0 0 1 1.5.659v.158a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-.158Z" />
                  <path fill="url(#backend-gradient)" fill-rule="evenodd" d="M3 18.75a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v.158a3 3 0 0 1-1.5.659v-.659a1.5 1.5 0 0 0-1.5-1.5H6a1.5 1.5 0 0 0-1.5 1.5v.659A3 3 0 0 1 3 18.909v-.159ZM18 21.75h.008v.008H18v-.008Zm-12 0h.008v.008H6v-.008Z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 class="text-[17px] font-bold text-black mb-2 text-left w-full">Backend Development</h3>
            <p class="text-[13px] text-gray-600 text-left leading-relaxed w-full">
              Rust, Golang, Java, Node.js
            </p>
          </div>

          {/* Frontend Development */}
          <div class="flex flex-col items-start" style={{ width: '220px' }}>
            <div 
              class="relative overflow-hidden flex items-center justify-center mb-4"
              style={{
                width: '220px',
                height: '220px',
                'border-radius': '20px',
                'background-image': 'url(/gradient-backround/fronetend-development.png)',
                'background-size': 'cover',
                'background-position': 'center'
              }}
            >
              {/* Icon with gradient */}
              <div class="relative z-10" style={{ width: '80px', height: '80px' }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="frontend-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#1A00FF;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#frontend-gradient)" fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 class="text-[17px] font-bold text-black mb-2 text-left w-full">Frontend Development</h3>
            <p class="text-[13px] text-gray-600 text-left leading-relaxed w-full">
              SolidJS, React.js, Next.js, TypeScript, Tailwind CSS
            </p>
          </div>

          {/* Mobile Developer */}
          <div class="flex flex-col items-start" style={{ width: '220px' }}>
            <div 
              class="relative overflow-hidden flex items-center justify-center mb-4"
              style={{
                width: '220px',
                height: '220px',
                'border-radius': '20px',
                'background-image': 'url(/gradient-backround/mobile-development.png)',
                'background-size': 'cover',
                'background-position': 'center'
              }}
            >
              {/* Icon with gradient */}
              <div class="relative z-10" style={{ width: '80px', height: '80px' }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="mobile-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#FF6B00;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#mobile-gradient)" fill-rule="evenodd" d="M7.5 1.5A1.5 1.5 0 0 0 6 3v18a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 21V3a1.5 1.5 0 0 0-1.5-1.5h-9ZM12 18.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 class="text-[17px] font-bold text-black mb-2 text-left w-full">Mobile Developer</h3>
            <p class="text-[13px] text-gray-600 text-left leading-relaxed w-full">
              Kotlin, Flutter, React Native
            </p>
          </div>

          {/* Databases */}
          <div class="flex flex-col items-start" style={{ width: '220px' }}>
            <div 
              class="relative overflow-hidden flex items-center justify-center mb-4"
              style={{
                width: '220px',
                height: '220px',
                'border-radius': '20px',
                'background-image': 'url(/gradient-backround/databases.png)',
                'background-size': 'cover',
                'background-position': 'center'
              }}
            >
              {/* Icon with gradient */}
              <div class="relative z-10" style={{ width: '80px', height: '80px' }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="databases-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#FF0080;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#databases-gradient)" d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                  <path fill="url(#databases-gradient)" d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                  <path fill="url(#databases-gradient)" d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                  <path fill="url(#databases-gradient)" d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                </svg>
              </div>
            </div>
            <h3 class="text-[17px] font-bold text-black mb-2 text-left w-full">Databases</h3>
            <p class="text-[13px] text-gray-600 text-left leading-relaxed w-full">
              PostgreSQL, MySQL, MongoDB, SurrealDB
            </p>
          </div>

          {/* Design & Mapping */}
          <div class="flex flex-col items-start" style={{ width: '220px' }}>
            <div 
              class="relative overflow-hidden flex items-center justify-center mb-4"
              style={{
                width: '220px',
                height: '220px',
                'border-radius': '20px',
                'background-image': 'url(/gradient-backround/design-mapping.png)',
                'background-size': 'cover',
                'background-position': 'center'
              }}
            >
              {/* Icon with gradient */}
              <div class="relative z-10" style={{ width: '80px', height: '80px' }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient id="design-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#FF3D00;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#design-gradient)" fill-rule="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clip-rule="evenodd" />
                  <path fill="url(#design-gradient)" d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z" />
                </svg>
              </div>
            </div>
            <h3 class="text-[17px] font-bold text-black mb-2 text-left w-full">Design & Mapping</h3>
            <p class="text-[13px] text-gray-600 text-left leading-relaxed w-full">
              Figma, Adobe Illustrator, Photoshop, UI/UX Design, After Effects, Premiere
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
