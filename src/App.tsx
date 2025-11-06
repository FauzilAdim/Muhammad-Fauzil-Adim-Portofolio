import { Component, createSignal, Show } from 'solid-js';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
// import EmployeeTable from './components/EmployeeTable';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
// import Stats from './components/Stats';
// import { DataService, type Employee } from './services/DataService';

const App: Component = () => {
  // const [employees, setEmployees] = createSignal<Employee[]>([]);
  // const [loading, setLoading] = createSignal(false);
  const [error,] = createSignal<string | null>(null);

  // const loadEmployees = async () => {
  //   setLoading(true);
  //   setError(null);
    
  //   try {
  //     const result = await DataService.getAllEmployees();
  //     setEmployees(result);
  //   } catch (error) {
  //     console.error('Error loading employees:', error);
  //     setError('Failed to load employees. Please check your connection and try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // createEffect(() => {
  //   loadEmployees();
  // });

  // const handleDataChange = () => {
  //   loadEmployees();
  // };

  return (
    <div class="min-h-screen bg-white">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <Footer />
      <ScrollToTop />
      {/* <Stats /> */}
      
      {/* Error Message */}
      <Show when={error()}>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div class="glass-effect rounded-xl p-4 border-l-4 border-red-500">
            <div class="flex items-center">
              <div class="text-red-400 text-xl mr-3">⚠️</div>
              <div>
                <h3 class="text-red-400 font-semibold">Connection Error</h3>
                <p class="text-gray-300 text-sm">{error()}</p>
                <button 
                  // onClick={loadEmployees}
                  class="mt-2 text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </Show>
      
      {/* <EmployeeTable 
        employees={employees()} 
        loading={loading()} 
        onDataChange={handleDataChange}
      /> */}
    </div>
  );
};

export default App;
