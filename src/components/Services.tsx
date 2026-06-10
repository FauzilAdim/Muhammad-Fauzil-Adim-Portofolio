import { Component } from 'solid-js';

const Services: Component = () => {
  return (
    <>
      <style>{`
        .cards {
          width: 100%;
          max-width: 1200px;
          height: 350px;
          display: flex;
          gap: 8px;
          margin: 0 auto;
        }

        .card {
          position: relative;
          flex: 1;
          overflow: hidden;
          border-radius: 24px;
          cursor: pointer;
          background-size: cover;
          background-position: center;
          transition:
            flex .8s cubic-bezier(.22, 1, .36, 1),
            transform .6s ease,
            opacity .4s ease;
        }

        /* Default Blue Gradient Overlay */
        .card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg,
              rgba(0, 71, 255, 0.7),
              rgba(77, 141, 255, 0.5),
              rgba(255, 255, 255, 0.15));
          opacity: 1;
          transition: opacity .9s cubic-bezier(.22, 1, .36, 1);
          z-index: 1;
        }

        /* Hover Orange Gradient Overlay */
        .card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg,
              rgba(255, 255, 255, 0.8),
              rgba(255, 204, 128, 0.7),
              rgba(255, 123, 0, 0.8));
          opacity: 0;
          transition: opacity .9s cubic-bezier(.22, 1, .36, 1);
          z-index: 2;
        }

        .card:hover::before {
          opacity: 1;
        }

        .card:hover::after {
          opacity: 0;
        }

        /* Others Fade */
        .cards:hover .card {
          opacity: .45;
        }

        .cards:hover .card:hover {
          flex: 3.5;
          opacity: 1;
        }

        /* Icon Pill Wrapper (Top Left) */
        .icon-pill-wrapper {
          position: absolute;
          top: 24px;
          left: 24px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          padding: 5px;
          padding-right: 14px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 3;
          transition: background-color 0.4s ease;
        }
        
        .card:hover .icon-pill-wrapper {
          background: rgba(255, 255, 255, 0.3);
        }

        .icon-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .icon-badge-text {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: white;
        }

        /* Title block (Top Left, below Icon Pill) */
        .card-header {
          position: absolute;
          top: 76px;
          left: 24px;
          z-index: 3;
        }

        .card-title {
          font-size: 20px;
          font-weight: 700;
          color: white;
          line-height: 1.2;
        }

        /* Overlay for hover description readability */
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top,
              rgba(0, 0, 0, .65),
              transparent 70%);
          z-index: 2;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        
        .card:hover .overlay {
          opacity: 1;
        }

        /* Description Content (Bottom Left) */
        .card-description {
          position: absolute;
          left: 24px;
          bottom: 24px;
          z-index: 5;
          max-width: 280px;
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity .45s ease,
            transform .45s ease;
          pointer-events: none;
        }

        .card:hover .card-description {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.15s;
        }

        .desc-text {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, .95);
        }

        /* Responsive Styles */
        @media (max-width: 1023px) {
          .cards {
            flex-direction: column;
            height: 600px;
            gap: 8px;
          }

          .cards:hover .card:hover {
            flex: 3;
          }

          .card-header {
            top: 20px;
            left: 76px;
          }
          
          .icon-pill-wrapper {
            top: 16px;
            left: 16px;
            padding-right: 0;
          }
          
          .icon-badge-text {
            display: none;
          }

          .card-description {
            left: 20px;
            bottom: 20px;
            max-width: 100%;
            padding-right: 20px;
          }

          .card-title {
            font-size: 18px;
          }
        }
      `}</style>

      <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8" style={{ background: '#F0F0F0' }}>
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

          {/* Cards Container */}
          <div class="cards">

            {/* Card 1: Backend Development */}
            <div
              class="card"
            // style={{ backgroundImage: "url(/gradient-backround/backend-development.png)" }}
            >
              <div class="icon-pill-wrapper">
                <div class="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
                <span class="icon-badge-text">Core</span>
              </div>
              <div class="card-header">
                <h3 class="card-title">Backend<br />Development</h3>
              </div>
              <div class="overlay"></div>
              <div class="card-description">
                <p class="desc-text">
                  Rust, Golang, Java, Node.js. High-performance, scalable and secure server-side logic.
                </p>
              </div>
            </div>

            {/* Card 2: Frontend Development */}
            <div
              class="card"
            // style={{ backgroundImage: "url(/gradient-backround/fronetend-development.png)" }}
            >
              <div class="icon-pill-wrapper">
                <div class="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <defs>
                      <linearGradient id="frontend-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#1A00FF;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#frontend-gradient)" fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="icon-badge-text">Apps</span>
              </div>
              <div class="card-header">
                <h3 class="card-title">Frontend<br />Development</h3>
              </div>
              <div class="overlay"></div>
              <div class="card-description">
                <p class="desc-text">
                  SolidJS, React.js, Next.js, TypeScript. High-fidelity, reactive, and responsive user interfaces.
                </p>
              </div>
            </div>

            {/* Card 3: Mobile Developer */}
            <div
              class="card"
            // style={{ backgroundImage: "url(/gradient-backround/mobile-development.png)" }}
            >
              <div class="icon-pill-wrapper">
                <div class="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <defs>
                      <linearGradient id="mobile-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#FF6B00;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#mobile-gradient)" fill-rule="evenodd" d="M7.5 1.5A1.5 1.5 0 0 0 6 3v18a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 21V3a1.5 1.5 0 0 0-1.5-1.5h-9ZM12 18.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="icon-badge-text">Mobile</span>
              </div>
              <div class="card-header">
                <h3 class="card-title">Mobile<br />Development</h3>
              </div>
              <div class="overlay"></div>
              <div class="card-description">
                <p class="desc-text">
                  Kotlin, Flutter, React Native. Fast, native, and cross-platform mobile app experiences.
                </p>
              </div>
            </div>

            {/* Card 4: Databases */}
            <div
              class="card"
            // style={{ backgroundImage: "url(/gradient-backround/databases.png)" }}
            >
              <div class="icon-pill-wrapper">
                <div class="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
                <span class="icon-badge-text">Data</span>
              </div>
              <div class="card-header">
                <h3 class="card-title">Database<br />Systems</h3>
              </div>
              <div class="overlay"></div>
              <div class="card-description">
                <p class="desc-text">
                  PostgreSQL, MySQL, MongoDB, SurrealDB. Robust, high-availability, and optimized data storage.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
