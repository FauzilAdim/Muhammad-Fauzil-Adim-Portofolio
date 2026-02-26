import { supabase } from '../lib/supabase';

// Types
export interface Project {
  id: string;
  name: string;
  cover_image: string;
  link_portfolio: string;
  description: string;
  stack: string[];
  category: 'web' | 'mobile';
  created_at?: string;
  updated_at?: string;
}

export interface DesignProject {
  id: string;
  name: string;
  cover_image: string;
  images: string[];
  description: string;
  created_at?: string;
  updated_at?: string;
}

export class ProjectService {
  // ==================== PROJECTS (Web & Mobile) ====================
  
  static async getAllProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  static async getProjectsByCategory(category: 'web' | 'mobile'): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      return [];
    }
  }

  static async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  static async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  static async deleteProject(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // ==================== DESIGN PROJECTS ====================
  
  static async getAllDesignProjects(): Promise<DesignProject[]> {
    try {
      const { data, error } = await supabase
        .from('design_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching design projects:', error);
      return [];
    }
  }

  static async getDesignProjectById(id: string): Promise<DesignProject | null> {
    try {
      const { data, error } = await supabase
        .from('design_projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching design project:', error);
      return null;
    }
  }

  static async createDesignProject(project: Omit<DesignProject, 'id' | 'created_at' | 'updated_at'>): Promise<DesignProject> {
    try {
      const { data, error } = await supabase
        .from('design_projects')
        .insert(project)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating design project:', error);
      throw error;
    }
  }

  static async deleteDesignProject(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('design_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting design project:', error);
      throw error;
    }
  }

  // ==================== STORAGE (Image Upload) ====================
  
  static async uploadImage(file: File, path: string): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${path}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  static async uploadProjectCover(file: File): Promise<string> {
    return this.uploadImage(file, 'projects');
  }

  static async uploadDesignImages(files: File[]): Promise<string[]> {
    try {
      const designId = crypto.randomUUID();
      const uploadPromises = files.map((file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `designs/${designId}/image-${index}.${fileExt}`;
        
        return supabase.storage
          .from('portfolio-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          })
          .then(({ data, error }) => {
            if (error) throw error;
            const { data: urlData } = supabase.storage
              .from('portfolio-images')
              .getPublicUrl(fileName);
            return urlData.publicUrl;
          });
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading design images:', error);
      throw error;
    }
  }

  // ==================== HELPER METHODS ====================
  
  static getImageUrl(imagePath: string): string {
    // If already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Otherwise, get public URL from Supabase
    const { data } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(imagePath);
    
    return data.publicUrl;
  }

  static getCoverImage(images: string[]): string {
    return images.length > 0 ? this.getImageUrl(images[0]) : '';
  }

  static getAllImageUrls(images: string[]): string[] {
    return images.map(img => this.getImageUrl(img));
  }
}
