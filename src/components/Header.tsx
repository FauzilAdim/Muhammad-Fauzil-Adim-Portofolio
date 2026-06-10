import { Component, createSignal, onMount, onCleanup } from 'solid-js';

const Header: Component = () => {
  const [activeSection, setActiveSection] = createSignal('home');
  let navbarRef!: HTMLDivElement;
  let canvasRef!: HTMLCanvasElement;

  onMount(() => {
    const canvas = canvasRef;
    const navbar = navbarRef;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let progress = 0;
    let targetPct = 0;
    let W = 0;
    let H = 0;
    let isDestroyed = false;

    function resize() {
      if (isDestroyed) return;
      W = navbar.offsetWidth;
      H = navbar.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    }
    resize();

    window.addEventListener('resize', resize);

    const waves = [
      { amp: 2.2, freq: 0.18, speed: 1.4, phase: 0.0 },
      { amp: 1.3, freq: 0.35, speed: 2.1, phase: 1.1 },
      { amp: 0.7, freq: 0.60, speed: 3.0, phase: 2.3 },
    ];

    function waveX(y: number, t: number) {
      let x = 0;
      waves.forEach(w => {
        x += w.amp * Math.sin(w.freq * y + w.speed * t + w.phase);
      });
      return x;
    }

    let animationFrameId: number;

    function draw(ts: number) {
      if (isDestroyed) return;
      const t = ts / 1000;
      ctx!.clearRect(0, 0, W, H);

      progress += (targetPct - progress) * 0.07;
      const fillX = (progress / 100) * W;

      if (fillX >= 0.5) {
        const R = H / 2;
        const steps = 52;

        // Clip to pill shape (ensures rounded corners on progress fill)
        ctx!.save();
        ctx!.beginPath();
        ctx!.roundRect(0, 0, W, H, R);
        ctx!.clip();

        // Build fill path with liquid right edge
        ctx!.beginPath();
        ctx!.moveTo(0, 0);
        ctx!.lineTo(fillX + waveX(0, t), 0);
        for (let i = 1; i <= steps; i++) {
          const y = (i / steps) * H;
          ctx!.lineTo(fillX + waveX(y, t), y);
        }
        ctx!.lineTo(0, H);
        ctx!.closePath();

        // Solid green fill (#AAEE00)
        ctx!.fillStyle = '#AAEE00';
        ctx!.fill();

        // Shimmer sweep
        const sp = (t * 0.35) % 1.8;
        if (sp < 1) {
          const sx = sp * fillX;
          const sg = ctx!.createLinearGradient(sx - 50, 0, sx + 50, 0);
          sg.addColorStop(0, 'rgba(255, 255, 255, 0)');
          sg.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
          sg.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx!.fillStyle = sg;
          ctx!.fillRect(0, 0, fillX, H);
        }

        ctx!.restore();

        // Liquid edge glow (outside clip so it sits on border) - neon green glow
        ctx!.save();
        ctx!.beginPath();
        ctx!.moveTo(fillX + waveX(0, t), 0);
        for (let i = 1; i <= steps; i++) {
          const y = (i / steps) * H;
          ctx!.lineTo(fillX + waveX(y, t), y);
        }
        ctx!.strokeStyle = 'rgba(170, 238, 0, 0.8)';
        ctx!.lineWidth = 1.5;
        ctx!.shadowColor = '#AAEE00';
        ctx!.shadowBlur = 10;
        ctx!.stroke();
        ctx!.restore();
      }

      // Dynamically check which links are covered by the progress fill
      const navbarRect = navbar.getBoundingClientRect();
      const links = navbar.querySelectorAll('.nav-links a');
      links.forEach((link) => {
        const linkRect = link.getBoundingClientRect();
        const linkMidRel = (linkRect.left + linkRect.width / 2) - navbarRect.left;
        if (fillX >= linkMidRel) {
          link.classList.add('covered');
        } else {
          link.classList.remove('covered');
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    const handleScrollProgress = () => {
      if (isDestroyed) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetPct = max > 0 ? (window.scrollY / max) * 100 : 0;

      // Section tracking based on scroll
      const sections = ['home', 'about', 'services', 'experience', 'projects'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollProgress);
    handleScrollProgress(); // Initial check

    animationFrameId = requestAnimationFrame(draw);

    onCleanup(() => {
      isDestroyed = true;
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScrollProgress);
      cancelAnimationFrame(animationFrameId);
    });
  });

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <>
      <style>{`
        /* ── Navbar outer shell — glass base ─────────── */
        .navbar {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(340px, 92vw, 860px);
          height: 64px;
          border-radius: 999px;
          z-index: 999;
        }

        /* Layer 1: dark frosted glass background (always visible, full width) */
        .navbar-glass {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.28);
          backdrop-filter: blur(28px) saturate(160%);
          -webkit-backdrop-filter: blur(28px) saturate(160%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          z-index: 1;
        }

        /* Subtle inner highlight on top edge */
        .navbar-glass::before {
          content: '';
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent);
          border-radius: 999px;
        }

        /* Layer 2: progress canvas (fills over the glass) */
        .progress-canvas {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        /* Layer 3: content sits on top of both */
        .nav-inner {
          position: relative;
          z-index: 3;
          height: 64px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0 24px;
          gap: 0;
        }

        /* Logo image wrapper - hidden on home, fades & slides in on scroll */
        .nav-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
        }

        .nav-logo.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .logo-img {
          height: 36px;
          width: auto;
          display: block;
          object-fit: contain;
        }

        /* Nav links */
        .nav-links {
          display: flex; align-items: center; gap: 4px;
        }

        /* Default link style - all links have a rounded pill shape */
        .nav-links a {
          display: flex; align-items: center;
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          font-size: 13px; font-weight: 500;
          letter-spacing: 0.01em;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05); /* Default pill background */
          border: 1px solid rgba(255, 255, 255, 0.08); /* Default pill border */
          transition: color 0.15s, background 0.15s, border-color 0.15s;
          white-space: nowrap;
        }

        /* Hover styles */
        .nav-links a:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.18);
        }

        /* Active tab style - slightly highlighted white frosted look */
        .nav-links a.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.26);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
          font-weight: 600;
        }

        /* Covered by neon green: turns black text and black border/fill for perfect contrast and visibility */
        .nav-links a.covered {
          color: #000000 !important;
          background: rgba(0, 0, 0, 0.06) !important;
          border-color: rgba(0, 0, 0, 0.12) !important;
        }

        .nav-links a.covered:hover {
          color: #000000 !important;
          background: rgba(0, 0, 0, 0.12) !important;
          border-color: rgba(0, 0, 0, 0.20) !important;
        }

        .nav-links a.covered.active {
          background: rgba(0, 0, 0, 0.15) !important;
          border-color: rgba(0, 0, 0, 0.25) !important;
          box-shadow: none;
        }

        /* Right - hidden on home, fades & slides in on scroll */
        .nav-right {
          display: flex; align-items: center; justify-content: flex-end;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
        }

        .nav-right.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .nav-copy {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.28);
          letter-spacing: 0.03em;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .nav-right {
            display: none !important;
          }
          .nav-inner {
            grid-template-columns: auto 1fr;
            padding: 0 16px;
          }
        }

        @media (max-width: 640px) {
          .nav-inner {
            padding: 0 10px;
          }
          .nav-links {
            justify-content: space-around;
            width: 100%;
            gap: 1px;
          }
          .nav-links a {
            padding: 5px 9px;
            font-size: 11px;
          }
        }
      `}</style>

      <nav class="navbar" ref={navbarRef}>
        {/* Glass base layer */}
        <div class="navbar-glass"></div>

        {/* Progress fill canvas */}
        <canvas class="progress-canvas" ref={canvasRef}></canvas>

        {/* UI content */}
        <div class="nav-inner">
          <a class={`nav-logo ${activeSection() !== 'home' ? 'visible' : ''}`} href="#home" onClick={() => handleNavClick('home')}>
            <img src="/Logo.png" alt="Logo" class="logo-img" />
          </a>

          <div class="nav-links">
            <a href="#home" class={activeSection() === 'home' ? 'active' : ''} onClick={() => handleNavClick('home')}>Home</a>
            <a href="#about" class={activeSection() === 'about' ? 'active' : ''} onClick={() => handleNavClick('about')}>About</a>
            <a href="#services" class={activeSection() === 'services' ? 'active' : ''} onClick={() => handleNavClick('services')}>Services</a>
            <a href="#experience" class={activeSection() === 'experience' ? 'active' : ''} onClick={() => handleNavClick('experience')}>Experience</a>
            <a href="#projects" class={activeSection() === 'projects' ? 'active' : ''} onClick={() => handleNavClick('projects')}>Projects</a>
          </div>

          <div class={`nav-right ${activeSection() !== 'home' ? 'visible' : ''}`}>
            <span class="nav-copy">© 2026</span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
