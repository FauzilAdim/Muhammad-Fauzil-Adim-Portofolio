import { Component, createSignal, For, Show } from 'solid-js';
import { ProjectService, type Project, type DesignProject } from '../services/ProjectService';

const Admin: Component = () => {
  // State
  const [activeTab, setActiveTab] = createSignal<'project' | 'design'>('project');
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');
  const [projects, setProjects] = createSignal<Project[]>([]);
  const [designProjects, setDesignProjects] = createSignal<DesignProject[]>([]);

  // Project Form State
  const [projectName, setProjectName] = createSignal('');
  const [projectDescription, setProjectDescription] = createSignal('');
  const [projectLink, setProjectLink] = createSignal('');
  const [projectStack, setProjectStack] = createSignal('');
  const [projectCategory, setProjectCategory] = createSignal<'web' | 'mobile'>('web');
  const [projectCoverFile, setProjectCoverFile] = createSignal<File | null>(null);

  // Design Form State
  const [designName, setDesignName] = createSignal('');
  const [designDescription, setDesignDescription] = createSignal('');
  const [designFiles, setDesignFiles] = createSignal<File[]>([]);

  // Load projects
  const loadProjects = async () => {
    const [proj, design] = await Promise.all([
      ProjectService.getAllProjects(),
      ProjectService.getAllDesignProjects()
    ]);
    setProjects(proj);
    setDesignProjects(design);
  };

  // Handle project cover file
  const handleProjectCoverChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      setProjectCoverFile(target.files[0]);
    }
  };

  // Handle design files
  const handleDesignFilesChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      setDesignFiles(Array.from(target.files));
    }
  };

  // Create Project
  const handleCreateProject = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const coverFile = projectCoverFile();
      if (!coverFile) {
        throw new Error('Please select a cover image');
      }

      // Upload cover image
      setMessage('Uploading image...');
      const coverUrl = await ProjectService.uploadProjectCover(coverFile);

      // Create project
      setMessage('Creating project...');
      const stackArray = projectStack().split(',').map(s => s.trim()).filter(s => s);
      
      await ProjectService.createProject({
        name: projectName(),
        cover_image: coverUrl,
        link_portfolio: projectLink(),
        description: projectDescription(),
        stack: stackArray,
        category: projectCategory()
      });

      setMessage('✅ Project created successfully!');
      
      // Reset form
      setProjectName('');
      setProjectDescription('');
      setProjectLink('');
      setProjectStack('');
      setProjectCoverFile(null);
      (document.getElementById('projectCoverInput') as HTMLInputElement).value = '';

      // Reload projects
      await loadProjects();
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Create Design Project
  const handleCreateDesign = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const files = designFiles();
      if (files.length === 0) {
        throw new Error('Please select at least one image');
      }

      // Upload images
      setMessage(`Uploading ${files.length} images...`);
      console.log('Starting image upload...');
      const imageUrls = await ProjectService.uploadDesignImages(files);
      console.log('Images uploaded successfully:', imageUrls);

      // Create design project
      setMessage('Creating design project...');
      const projectData = {
        name: designName(),
        cover_image: imageUrls[0], // First image as cover
        images: imageUrls,
        description: designDescription()
      };
      console.log('Attempting to create design project with data:', projectData);
      
      const result = await ProjectService.createDesignProject(projectData);
      console.log('Design project created successfully:', result);

      setMessage('✅ Design project created successfully!');
      
      // Reset form
      setDesignName('');
      setDesignDescription('');
      setDesignFiles([]);
      (document.getElementById('designFilesInput') as HTMLInputElement).value = '';

      // Reload projects
      await loadProjects();
    } catch (error: any) {
      console.error('Full error object:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      setMessage(`❌ Error: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await ProjectService.deleteProject(id);
      setMessage('✅ Project deleted!');
      await loadProjects();
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  // Delete Design Project
  const handleDeleteDesign = async (id: string) => {
    if (!confirm('Are you sure you want to delete this design project?')) return;

    try {
      await ProjectService.deleteDesignProject(id);
      setMessage('✅ Design project deleted!');
      await loadProjects();
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  // Load on mount
  loadProjects();

  return (
    <div class="min-h-screen bg-gray-50 py-8 px-4">
      <div class="max-w-6xl mx-auto">
        {/* Header */}
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p class="text-gray-600">Upload and manage your portfolio projects</p>
        </div>

        {/* Message */}
        <Show when={message()}>
          <div class={`p-4 rounded-lg mb-6 ${
            message().startsWith('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message()}
          </div>
        </Show>

        {/* Tabs */}
        <div class="bg-white rounded-lg shadow-md mb-6">
          <div class="flex border-b">
            <button
              onClick={() => setActiveTab('project')}
              class={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab() === 'project'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Web/Mobile Projects
            </button>
            <button
              onClick={() => setActiveTab('design')}
              class={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab() === 'design'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Design Projects
            </button>
          </div>

          {/* Project Form */}
          <Show when={activeTab() === 'project'}>
            <form onSubmit={handleCreateProject} class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={projectName()}
                  onInput={(e) => setProjectName(e.currentTarget.value)}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Portfolio Website"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={projectDescription()}
                  onInput={(e) => setProjectDescription(e.currentTarget.value)}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Describe your project..."
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Portfolio Link</label>
                <input
                  type="url"
                  value={projectLink()}
                  onInput={(e) => setProjectLink(e.currentTarget.value)}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  value={projectStack()}
                  onInput={(e) => setProjectStack(e.currentTarget.value)}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, Tailwind CSS"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={projectCategory()}
                  onChange={(e) => setProjectCategory(e.currentTarget.value as 'web' | 'mobile')}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                <input
                  id="projectCoverInput"
                  type="file"
                  accept="image/*"
                  onChange={handleProjectCoverChange}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading()}
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading() ? 'Creating...' : 'Create Project'}
              </button>
            </form>
          </Show>

          {/* Design Form */}
          <Show when={activeTab() === 'design'}>
            <form onSubmit={handleCreateDesign} class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Design Name</label>
                <input
                  type="text"
                  value={designName()}
                  onInput={(e) => setDesignName(e.currentTarget.value)}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Brand Identity Design"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={designDescription()}
                  onInput={(e) => setDesignDescription(e.currentTarget.value)}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Describe your design..."
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Images (multiple)</label>
                <input
                  id="designFilesInput"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleDesignFilesChange}
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <p class="text-sm text-gray-500 mt-1">First image will be used as cover</p>
              </div>

              <Show when={designFiles().length > 0}>
                <div class="text-sm text-gray-600">
                  Selected: {designFiles().length} image(s)
                </div>
              </Show>

              <button
                type="submit"
                disabled={loading()}
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading() ? 'Creating...' : 'Create Design Project'}
              </button>
            </form>
          </Show>
        </div>

        {/* Projects List */}
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Existing Projects</h2>
          
          <div class="space-y-4">
            <Show when={projects().length > 0}>
              <div>
                <h3 class="text-lg font-semibold text-gray-700 mb-2">Web/Mobile Projects ({projects().length})</h3>
                <For each={projects()}>
                  {(project) => (
                    <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-2">
                      <div class="flex items-center gap-4">
                        <img src={project.cover_image} alt={project.name} class="w-16 h-16 object-cover rounded" />
                        <div>
                          <h4 class="font-semibold">{project.name}</h4>
                          <p class="text-sm text-gray-600">{project.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </For>
              </div>
            </Show>

            <Show when={designProjects().length > 0}>
              <div>
                <h3 class="text-lg font-semibold text-gray-700 mb-2">Design Projects ({designProjects().length})</h3>
                <For each={designProjects()}>
                  {(design) => (
                    <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-2">
                      <div class="flex items-center gap-4">
                        <img src={design.cover_image} alt={design.name} class="w-16 h-16 object-cover rounded" />
                        <div>
                          <h4 class="font-semibold">{design.name}</h4>
                          <p class="text-sm text-gray-600">{design.images.length} images</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteDesign(design.id)}
                        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </For>
              </div>
            </Show>

            <Show when={projects().length === 0 && designProjects().length === 0}>
              <p class="text-gray-500 text-center py-8">No projects yet. Create your first project above!</p>
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
