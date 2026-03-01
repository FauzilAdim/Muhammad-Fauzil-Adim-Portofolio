import { Component, createSignal, Show } from 'solid-js';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Admin from './pages/Admin';

const App: Component = () => {
  // Simple routing based on URL hash
  const [currentPage, setCurrentPage] = createSignal(
    window.location.hash === '#admin' ? 'admin' : 'home'
  );

  // Listen to hash changes
  window.addEventListener('hashchange', () => {
    setCurrentPage(window.location.hash === '#admin' ? 'admin' : 'home');
  });

  return (
    <Show
      when={currentPage() === 'home'}
      fallback={<Admin />}
    >
      <div class="min-h-screen bg-[#F0F0F0]">
        <Header />
        <div id="home" style="scroll-margin-top: 80px;">
          <Hero />
        </div>
        <div id="about" style="scroll-margin-top: 80px;">
          <About />
        </div>
        <div id="services" style="scroll-margin-top: 80px;">
          <Services />
        </div>
        <div id="experience" style="scroll-margin-top: 80px;">
          <Experience />
        </div>
        <div id="projects" style="scroll-margin-top: 80px;">
          <Projects />
        </div>
        
        <Footer />
      </div>
    </Show>
  );
};

export default App;
