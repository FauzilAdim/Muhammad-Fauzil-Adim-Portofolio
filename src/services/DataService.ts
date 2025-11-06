export interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
  created_at?: string;
}

export interface ApiResponse {
  status: string;
  message: string;
  data: Employee[] | Employee | null;
}

export class DataService {
  private static baseUrl = 'http://localhost:8080/sb';
  
  static async getAllEmployees(): Promise<Employee[]> {
    try {
      const response = await fetch(`${this.baseUrl}/employees`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      if (result.status === 'success' && Array.isArray(result.data)) {
        return result.data;
      } else {
        console.error('API Error:', result.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      // Return empty array if API fails
      return [];
    }
  }

  static async createEmployee(data: Omit<Employee, 'id' | 'created_at'>): Promise<Employee> {
    try {
      const response = await fetch(`${this.baseUrl}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      if (result.status === 'success' && result.data && !Array.isArray(result.data)) {
        return result.data as Employee;
      } else {
        throw new Error(result.message || 'Failed to create employee');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  }

  static async updateEmployee(id: string, data: Omit<Employee, 'id' | 'created_at'>): Promise<Employee> {
    try {
      const response = await fetch(`${this.baseUrl}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      if (result.status === 'success' && result.data && !Array.isArray(result.data)) {
        return result.data as Employee;
      } else {
        throw new Error(result.message || 'Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  }

  static async deleteEmployee(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(result.message || 'Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  }
}
