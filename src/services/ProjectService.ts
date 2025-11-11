export interface Project {
  id: string;
  name: string;
  description: string;
  images: string[];  // Changed to array for multiple images
  category: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T | null;
}

export class ProjectService {
  // Railway backend URL (production)
  private static baseUrl = 'https://web-production-8511.up.railway.app/api';
  
  static async getAllProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${this.baseUrl}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Project[]> = await response.json();
      
      if (result.status === 'success' && Array.isArray(result.data)) {
        return result.data;
      } else {
        console.error('API Error:', result.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  static async getProjectsByCategory(category: string): Promise<Project[]> {
    try {
      const response = await fetch(`${this.baseUrl}/projects?category=${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Project[]> = await response.json();
      
      if (result.status === 'success' && Array.isArray(result.data)) {
        return result.data;
      } else {
        console.error('API Error:', result.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      return [];
    }
  }

  static async createProjectWithUpload(formData: FormData): Promise<Project> {
    try {
      const response = await fetch(`${this.baseUrl}/projects/create-with-upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<Project> = await response.json();
      
      if (result.status === 'success' && result.data) {
        return result.data;
      } else {
        throw new Error(result.message || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  static async deleteProject(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse<null> = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(result.message || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  static getImageUrl(imagePath: string): string {
    // If already a full URL (Cloudinary), return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // Otherwise, use Railway URL for backward compatibility
    return `https://web-production-8511.up.railway.app${imagePath}`;
  }

  static getCoverImage(images: string[]): string {
    // First image is the cover
    return images.length > 0 ? this.getImageUrl(images[0]) : '';
  }

  static getAllImageUrls(images: string[]): string[] {
    return images.map(img => this.getImageUrl(img));
  }
}
