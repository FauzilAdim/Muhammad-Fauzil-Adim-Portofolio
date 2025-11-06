import { Component, createSignal, For, Show } from 'solid-js';
import { DataService, type Employee } from '../services/DataService';

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  onDataChange: () => void;
}

const EmployeeTable: Component<EmployeeTableProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal(false);
  const [editingEmployee, setEditingEmployee] = createSignal<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = createSignal<Employee | null>(null);
  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    position: ''
  });
  const [searchTerm, setSearchTerm] = createSignal('');
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [isDeleting, setIsDeleting] = createSignal(false);

  const filteredEmployees = () => {
    const term = searchTerm().toLowerCase();
    return props.employees.filter(emp => 
      emp.name.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term)
    );
  };

  const openModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData({
        name: employee.name,
        email: employee.email,
        position: employee.position
      });
    } else {
      setEditingEmployee(null);
      setFormData({
        name: '',
        email: '',
        position: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      position: ''
    });
  };

  const openDeleteModal = (employee: Employee) => {
    setDeletingEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingEmployee(null);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (isSubmitting()) return;
    
    const data = formData();
    
    // Validation
    if (!data.name.trim() || !data.email.trim() || !data.position.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (editingEmployee()) {
        await DataService.updateEmployee(editingEmployee()!.id, data);
      } else {
        await DataService.createEmployee(data);
      }
      closeModal();
      props.onDataChange();
    } catch (error) {
      console.error('Error saving employee:', error);
      alert(`Error ${editingEmployee() ? 'updating' : 'creating'} employee. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingEmployee() || isDeleting()) return;
    
    setIsDeleting(true);
    
    try {
      await DataService.deleteEmployee(deletingEmployee()!.id);
      closeDeleteModal();
      props.onDataChange();
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const positions = [
    'Frontend Developer',
    'Backend Developer', 
    'Full Stack Developer',
    'Mobile App Developer',
    'DevOps Engineer',
    'Data Scientist',
    'AI/ML Engineer',
    'UI/UX Designer',
    'Product Manager',
    'Project Manager',
    'QA Engineer',
    'System Administrator',
    'Developer',
    'Senior Developer',
    'Lead Developer',
    'Software Engineer',
    'Senior Software Engineer'
  ];

  return (
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="glass-effect rounded-2xl p-8 lg:p-12 animate-slideUp">
          {/* Header */}
          <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 class="text-3xl lg:text-4xl font-bold text-white mb-2">
                🏢 Our Team Members
              </h2>
              <p class="text-gray-400">
                Meet the talented professionals who drive our success
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm()}
                  onInput={(e) => setSearchTerm(e.currentTarget.value)}
                  class="bg-dark-800/50 border border-gray-600 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none w-full sm:w-64 transition-colors"
                />
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
              
              <button 
                onClick={() => openModal()}
                class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 glow-border hover:scale-105 whitespace-nowrap"
              >
                ➕ Add Employee
              </button>
            </div>
          </div>

          {/* Stats */}
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div class="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 rounded-xl border border-white/10">
              <div class="text-2xl font-bold text-white">{props.employees.length}</div>
              <div class="text-sm text-gray-400">Total Employees</div>
            </div>
            <div class="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-4 rounded-xl border border-white/10">
              <div class="text-2xl font-bold text-white">{new Set(props.employees.map(e => e.position)).size}</div>
              <div class="text-sm text-gray-400">Different Roles</div>
            </div>
            <div class="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 rounded-xl border border-white/10">
              <div class="text-2xl font-bold text-white">{filteredEmployees().length}</div>
              <div class="text-sm text-gray-400">Showing Results</div>
            </div>
          </div>

          <Show when={props.loading} fallback={
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-700">
                    <th class="text-left py-6 px-6 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                      Employee
                    </th>
                    <th class="text-left py-6 px-6 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                      Position
                    </th>
                    <th class="text-left py-6 px-6 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                      Contact
                    </th>
                    <th class="text-center py-6 px-6 text-gray-300 font-semibold text-sm uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <For each={filteredEmployees()} fallback={
                    <tr>
                      <td colspan="4" class="text-center py-12">
                        <div class="text-6xl mb-4">👥</div>
                        <div class="text-gray-400 text-lg">
                          {searchTerm() ? 'No employees found matching your search' : 'No employees available'}
                        </div>
                        {!searchTerm() && (
                          <button 
                            onClick={() => openModal()}
                            class="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            Add the first employee
                          </button>
                        )}
                      </td>
                    </tr>
                  }>
                    {(employee, index) => (
                      <tr 
                        class="table-row-hover border-b border-gray-800/50 group animate-slideUp"
                        style={`animation-delay: ${index() * 0.1}s`}
                      >
                        <td class="py-6 px-6">
                          <div class="flex items-center">
                            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                              {employee.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div class="text-white font-semibold text-lg">{employee.name}</div>
                              <div class="text-gray-400 text-sm">ID: {employee.id.slice(0, 8)}...</div>
                            </div>
                          </div>
                        </td>
                        <td class="py-6 px-6">
                          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-white/20">
                            💼 {employee.position}
                          </span>
                        </td>
                        <td class="py-6 px-6">
                          <div class="text-gray-300">{employee.email}</div>
                        </td>
                        <td class="py-6 px-6">
                          <div class="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => openModal(employee)}
                              class="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg text-sm transition-all duration-300 hover:scale-110"
                              title="Edit Employee"
                              disabled={isSubmitting()}
                            >
                              ✏️
                            </button>
                            <button 
                              onClick={() => openDeleteModal(employee)}
                              class="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg text-sm transition-all duration-300 hover:scale-110"
                              title="Delete Employee"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          }>
            <div class="text-center py-12">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p class="text-gray-400 text-lg">Loading team members...</p>
            </div>
          </Show>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Show when={isModalOpen()}>
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div class="glass-effect rounded-2xl p-8 w-full max-w-lg animate-slideUp">
            <div class="flex items-center justify-between mb-8">
              <h3 class="text-2xl font-bold text-white">
                {editingEmployee() ? '✏️ Edit Employee' : '➕ Add New Employee'}
              </h3>
              <button 
                onClick={closeModal}
                class="text-gray-400 hover:text-white text-2xl transition-colors"
                disabled={isSubmitting()}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div class="space-y-6">
                <div>
                  <label class="block text-gray-300 text-sm font-semibold mb-3">
                    👤 Full Name <span class="text-red-400">*</span>
                  </label>
                  <input 
                    type="text"
                    value={formData().name}
                    onInput={(e) => setFormData(prev => ({...prev, name: e.currentTarget.value}))}
                    class="w-full bg-dark-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter employee's full name"
                    required
                    disabled={isSubmitting()}
                  />
                </div>
                
                <div>
                  <label class="block text-gray-300 text-sm font-semibold mb-3">
                    📧 Email Address <span class="text-red-400">*</span>
                  </label>
                  <input 
                    type="email"
                    value={formData().email}
                    onInput={(e) => setFormData(prev => ({...prev, email: e.currentTarget.value}))}
                    class="w-full bg-dark-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="employee@Example.com"
                    required
                    disabled={isSubmitting()}
                  />
                </div>
                
                <div>
                  <label class="block text-gray-300 text-sm font-semibold mb-3">
                    💼 Job Position <span class="text-red-400">*</span>
                  </label>
                  <select 
                    value={formData().position}
                    onChange={(e) => setFormData(prev => ({...prev, position: e.currentTarget.value}))}
                    class="w-full bg-dark-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                    required
                    disabled={isSubmitting()}
                  >
                    <option value="">Select Position</option>
                    {positions.map(pos => (
                      <option value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div class="flex space-x-4 mt-8">
                <button 
                  type="button"
                  onClick={closeModal}
                  class="flex-1 bg-gray-600/50 hover:bg-gray-600/70 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-gray-600 disabled:opacity-50"
                  disabled={isSubmitting()}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 glow-border disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting()}
                >
                  {isSubmitting() ? '⏳ Processing...' : (editingEmployee() ? 'Update Employee' : 'Add Employee')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Show>

      {/* Delete Confirmation Modal */}
      <Show when={isDeleteModalOpen()}>
        <div class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div class="glass-effect rounded-2xl p-8 w-full max-w-lg animate-slideUp border-l-4 border-red-500">
            {/* Header with Warning Icon */}
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mr-4">
                  <span class="text-2xl">⚠️</span>
                </div>
                <h3 class="text-2xl font-bold text-white">
                  Delete Employee
                </h3>
              </div>
              <button 
                onClick={closeDeleteModal}
                class="text-gray-400 hover:text-white text-2xl transition-colors"
                disabled={isDeleting()}
              >
                ✕
              </button>
            </div>

            {/* Employee Info Display */}
            <Show when={deletingEmployee()}>
              <div class="glass-effect rounded-xl p-6 mb-8 bg-red-600/10 border border-red-600/30">
                <div class="flex items-center mb-4">
                  <div class="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {deletingEmployee()!.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 class="text-white font-semibold text-lg">
                      {deletingEmployee()!.name}
                    </h4>
                    <p class="text-gray-300 text-sm">
                      {deletingEmployee()!.position}
                    </p>
                    <p class="text-gray-400 text-sm">
                      {deletingEmployee()!.email}
                    </p>
                  </div>
                </div>
                
                <div class="text-sm text-gray-300">
                  <strong>Employee ID:</strong> {deletingEmployee()!.id}
                </div>
              </div>
            </Show>

            {/* Warning Message */}
            <div class="mb-8">
              <h4 class="text-red-400 font-semibold text-lg mb-3">
                🚨 This action cannot be undone!
              </h4>
              <p class="text-gray-300 leading-relaxed">
                Are you absolutely sure you want to delete this employee? This will permanently remove 
                all their information from the system. This action is <strong class="text-red-400">irreversible</strong>.
              </p>
            </div>

            {/* Confirmation Input */}
            <div class="mb-8">
              <label class="block text-gray-300 text-sm font-semibold mb-3">
                Type <span class="text-red-400 font-mono bg-red-600/20 px-2 py-1 rounded">DELETE</span> to confirm:
              </label>
              <input 
                type="text"
                id="deleteConfirmation"
                class="w-full bg-dark-800/50 border border-red-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Type DELETE here..."
                disabled={isDeleting()}
              />
            </div>

            {/* Action Buttons */}
            <div class="flex space-x-4">
              <button 
                type="button"
                onClick={closeDeleteModal}
                class="flex-1 bg-gray-600/50 hover:bg-gray-600/70 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-gray-600 disabled:opacity-50"
                disabled={isDeleting()}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const input = document.getElementById('deleteConfirmation') as HTMLInputElement;
                  if (input?.value !== 'DELETE') {
                    alert('Please type "DELETE" to confirm');
                    return;
                  }
                  handleDelete();
                }}
                class="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isDeleting()}
              >
                {isDeleting() ? (
                  <span class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </span>
                ) : (
                  '🗑️ Delete Employee'
                )}
              </button>
            </div>

            {/* Additional Warning */}
            <div class="mt-6 p-4 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
              <div class="flex items-start">
                <span class="text-yellow-400 mr-2 mt-0.5">💡</span>
                <p class="text-yellow-200 text-sm">
                  <strong>Tip:</strong> Consider deactivating the employee instead of deleting if you need to maintain historical records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </section>
  );
};

export default EmployeeTable;
