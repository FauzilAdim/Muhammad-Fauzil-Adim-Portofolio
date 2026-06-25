import { Component } from 'solid-js';
import { gsap } from 'gsap';

const Services: Component = () => {

  // ====== Premium Cinematic Image Reveal (GSAP Timeline + clip-path) ======
  //
  // WHY THIS APPROACH:
  // High-end agency websites (Phase56, Framer portfolios) use clip-path reveals
  // combined with scale, blur, and parallax to create the sensation of an image
  // "emerging from behind" the card rather than fading into existence.
  //
  // HOW IT WORKS:
  // 1. Base state: image is invisible (opacity: 0), scaled up (1.25), blurred (20px),
  //    offset left (-30px), and clipped (inset(0 100% 0 0) = fully clipped from right).
  // 2. On hover: GSAP Timeline orchestrates a cinematic sequence:
  //    - Image becomes visible (opacity: 1) immediately
  //    - Clip-path animates from inset(0 100% 0 0) to inset(0 0% 0 0) → reveal sweep
  //    - Scale eases from 1.25 to 1.0 → zoom-out settling
  //    - Blur animates from 20px to 0px → dreamy to sharp
  //    - TranslateX animates from -30px to 0px → parallax drift
  // 3. The desynchronized timing (scale leads, blur follows, clip-path sweeps) creates
  //    a natural, organic settling effect that feels expensive and premium.
  // 4. On mouseleave: GSAP reverses the timeline, image retreats back to hidden state.
  //
  // PERFORMANCE:
  // - All animated properties (transform, filter, clip-path, opacity) are GPU-composited.
  // - Timelines are killed/reused per card (no leaks, no stacking).
  // - will-change hints ensure compositor-thread optimization.

  let timelines: (gsap.core.Timeline | null)[] = [null, null, null, null];

  // ====== Camera Lens Focus Reveal ======
  //
  // EFFECT: Image materializes from darkness into sharp focus,
  // like a camera lens focusing on a hidden scene.
  //
  // BASE STATE: scale(1.35) + blur(30px) + brightness(1.4) + saturate(1.6) + opacity(0.15)
  //   → Image barely visible, zoomed in, heavily blurred, overexposed.
  //
  // HOVER STATE: scale(1) + blur(0) + brightness(1) + saturate(1) + opacity(1)
  //   → Image settles into perfect focus with correct colors.
  //
  // No slide, no clip-path, no translateX — pure focus materialization.
  // Race condition fix: gsap.killTweensOf(img) kills ALL tweens (timeline + leave)
  // before starting new animations, preventing the "black card" bug.

  const handleEnter = (index: number) => (e: MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const img = target.querySelector('.card-image') as HTMLDivElement;
    if (!img) return;

    // Kill ALL tweens on this element — fixes race condition where
    // a leftover leave tween could set opacity:0 during the new enter
    gsap.killTweensOf(img);

    // Kill existing timeline
    if (timelines[index] !== null) {
      timelines[index]!.kill();
    }

    // Create camera lens focus timeline
    const tl = gsap.timeline();
    timelines[index] = tl;

    // Animate all properties simultaneously from "hidden scene" to sharp focus
    // Scale: 1.35 → 1 (lens pulling back into focus)
    tl.fromTo(img,
      { scale: 1.35 },
      { scale: 1, duration: 0.9, ease: 'expo.out' },
      0
    );

    // Filter: heavy blur + overexposed + oversaturated → crisp and natural
    tl.fromTo(img,
      { filter: 'blur(30px) brightness(1.4) saturate(1.6)' },
      { filter: 'blur(0px) brightness(1) saturate(1)', duration: 0.9, ease: 'expo.out' },
      0
    );

    // Opacity: barely visible → fully materialized
    tl.fromTo(img,
      { opacity: 0.15 },
      { opacity: 1, duration: 0.9, ease: 'power2.out' },
      0
    );
  };

  const handleLeave = (index: number) => (e: MouseEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    const img = target.querySelector('.card-image') as HTMLDivElement;
    if (!img) return;

    // Kill ALL tweens and timeline on this element
    gsap.killTweensOf(img);
    if (timelines[index] !== null) {
      timelines[index]!.kill();
    }

    // Smoothly return to hidden/foggy state
    gsap.to(img, {
      opacity: 0.15,
      scale: 1.35,
      filter: 'blur(30px) brightness(1.4) saturate(1.6)',
      duration: 0.5,
      ease: 'power2.inOut'
    });
  };

  return (
    <>

      <style>{`
        .cards {
          width: 100%;
          max-width: 100%;
          height: clamp(320px, 38vw, 420px);
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
          background: black;
          transition:
            flex 1.2s cubic-bezier(.22, 1, .36, 1),
            transform .8s cubic-bezier(.22, 1, .36, 1);
        }

        /* ====== Card Image Layer (camera lens focus reveal on hover) ====== */
        /*
         * BASE STATE: scale(1.35) + blur(30px) + brightness(1.4) + saturate(1.6) + opacity(0.15)
         *   → Image barely visible, zoomed in, heavily blurred, overexposed — like a hidden scene.
         *
         * HOVER (GSAP Timeline): All properties animate simultaneously over 0.9s
         *   → scale(1) + blur(0) + brightness(1) + saturate(1) + opacity(1)
         *   → Image materializes into perfect focus.
         *
         * No slide, no clip-path, no translateX — pure lens focus materialization.
         * Easing: expo.out for luxury cinematic deceleration.
         *
         * GPU-accelerated: transform + filter + opacity are compositor-thread props.
         */
        .card-image {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          transform: scale(1.35);
          filter: blur(30px) brightness(1.4) saturate(1.6);
          z-index: 2;
          will-change: transform, filter, opacity;
          transform-origin: center center;
        }

        /* Background images for each card */
        .card:nth-child(1) .card-image { background-image: url(/backround-skills/card1.png); }
        .card:nth-child(2) .card-image { background-image: url(/backround-skills/card2.png); }
        .card:nth-child(3) .card-image { background-image: url(/backround-skills/card3.png); }
        .card:nth-child(4) .card-image { background-image: url(/backround-skills/card4.png); }

        /* ====== Default Dark Overlay (fades out on hover) ====== */
        .card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(30, 30, 36, 0.6);
          opacity: 1;
          transition: opacity 1.2s cubic-bezier(.22, 1, .36, 1);
          z-index: 1;
        }

        .card:hover::after {
          opacity: 0;
        }

        /* ====== Others stay unchanged on hover ====== */
        .cards:hover .card:hover {
          flex: 2.5;
          transform: scale(1.01);
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
          z-index: 4;
          transition: background-color 0.4s ease;
        }
        
        .card:hover .icon-pill-wrapper {
          background: rgba(255, 255, 255, 0.2);
        }

        .icon-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #AAEE00;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .icon-badge-text {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          color: white;
        }

        /* Title block (Top Left, below Icon Pill) */
        .card-header {
          position: absolute;
          top: 76px;
          left: 24px;
          z-index: 4;
        }

        .card-title {
          font-size: 24px;
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
          z-index: 3;
          opacity: 0;
          transition: opacity 0.6s ease;
        }
        
        .card:hover .overlay {
          opacity: 1;
          transition: opacity 0.8s cubic-bezier(.22, 1, .36, 1);
        }

        /* Description Content (Bottom Left) */
        .card-description {
          position: absolute;
          left: 24px;
          right: 24px;
          bottom: 24px;
          z-index: 5;
          max-width: 340px;
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
          transition-delay: 0.25s;
          transition-duration: .6s;
        }

        .desc-text {
          font-size: 17px;
          line-height: 1.6;
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
            flex: 2.5;
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
            right: 20px;
            bottom: 20px;
            max-width: 100%;
          }

          .card-title {
            font-size: 22px;
          }
        }
      `}</style>

      <section class="pt-32 pb-20" style={{ background: '#F0F0F0' }}>
        <div class="site-container">
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
              onMouseEnter={handleEnter(0)}
              onMouseLeave={handleLeave(0)}
            >
              <div class="card-image" />
              <div class="icon-pill-wrapper">
                <div class="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path fill="#2A2520" d="M5.507 4.048A3 3 0 0 1 7.785 3h8.43a3 3 0 0 1 2.278 1.048l1.722 2.008A4.533 4.533 0 0 0 19.5 6h-15c-.243 0-.482.02-.715.056l1.722-2.008Z" />
                    <path fill="#2A2520" fill-rule="evenodd" d="M3 9.75a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v.158a3 3 0 0 1-1.5.659V9.75a1.5 1.5 0 0 0-1.5-1.5H6a1.5 1.5 0 0 0-1.5 1.5v.659A3 3 0 0 1 3 9.909V9.75ZM18 12.75h.008v.008H18v-.008Zm-12 0h.008v.008H6v-.008Z" clip-rule="evenodd" />
                    <path fill="#2A2520" d="M3 14.25a3 3 0 0 1 1.5-.659v.659a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-.659a3 3 0 0 1 1.5.659v.158a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-.158Z" />
                    <path fill="#2A2520" fill-rule="evenodd" d="M3 18.75a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v.158a3 3 0 0 1-1.5.659v-.659a1.5 1.5 0 0 0-1.5-1.5H6a1.5 1.5 0 0 0-1.5 1.5v.659A3 3 0 0 1 3 18.909v-.159ZM18 21.75h.008v.008H18v-.008Zm-12 0h.008v.008H6v-.008Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="icon-badge-text">Core</span>
              </div>
              <div class="card-header">
                <h2 class="card-title">Backend</h2>
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
              onMouseEnter={handleEnter(1)}
              onMouseLeave={handleLeave(1)}
            >
              <div class="card-image" />
              <div class="icon-pill-wrapper">
                <div class="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path fill="#2A2520" fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="icon-badge-text">Apps</span>
              </div>
              <div class="card-header">
                <h3 class="card-title">Frontend</h3>
              </div>
              <div class="overlay"></div>
              <div class="card-description">
                <p class="desc-text">
                  SolidJS, React.js, Next.js, TypeScript. High-fidelity, reactive, and responsive user interfaces.
                </p>
              </div>
            </div>

            {/* Card 3: Mobile Development */}
            <div
              class="card"
              onMouseEnter={handleEnter(2)}
              onMouseLeave={handleLeave(2)}
            >
              <div class="card-image" />
              <div class="icon-pill-wrapper">
                <div class="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path fill="#2A2520" fill-rule="evenodd" d="M7.5 1.5A1.5 1.5 0 0 0 6 3v18a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 21V3a1.5 1.5 0 0 0-1.5-1.5h-9ZM12 18.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="icon-badge-text">Mobile</span>
              </div>
              <div class="card-header">
                <h3 class="card-title">Mobile</h3>
              </div>
              <div class="overlay"></div>
              <div class="card-description">
                <p class="desc-text">
                  Kotlin, Flutter, React Native. Fast, native, and cross-platform mobile app experiences.
                </p>
              </div>
            </div>

            {/* Card 4: Database Systems */}
            <div
              class="card"
              onMouseEnter={handleEnter(3)}
              onMouseLeave={handleLeave(3)}
            >
              <div class="card-image" />
              <div class="icon-pill-wrapper">
                <div class="icon-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path fill="#2A2520" d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875Z" />
                    <path fill="#2A2520" d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 0 0 1.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 0 0 1.897 1.384C6.809 12.164 9.315 12.75 12 12.75Z" />
                    <path fill="#2A2520" d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 15.914 9.315 16.5 12 16.5Z" />
                    <path fill="#2A2520" d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 0 0 1.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 0 0 1.897 1.384C6.809 19.664 9.315 20.25 12 20.25Z" />
                  </svg>
                </div>
                <span class="icon-badge-text">Data</span>
              </div>
              <div class="card-header">
                <h3 class="card-title">Database</h3>
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