// Test Supabase Connection
import { ProjectService } from './services/ProjectService';

async function testConnection() {
  console.log('🧪 Testing Supabase connection...');
  
  try {
    // Test fetch projects
    const projects = await ProjectService.getAllProjects();
    console.log('✅ Projects fetched:', projects.length);
    
    // Test fetch design projects
    const designs = await ProjectService.getAllDesignProjects();
    console.log('✅ Design projects fetched:', designs.length);
    
    console.log('🎉 Supabase connection successful!');
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();
