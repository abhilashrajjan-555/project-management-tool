import { Project } from './types';

const STORAGE_KEY = 'project-management-data';

export const storage = {
  getProjects(): Project[] {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error('Error parsing projects from localStorage:', error);
      return [];
    }
  },

  saveProjects(projects: Project[]): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to localStorage:', error);
    }
  },

  addProject(project: Project): void {
    const projects = this.getProjects();
    projects.push(project);
    this.saveProjects(projects);
  },

  updateProject(projectId: string, updates: Partial<Project>): void {
    const projects = this.getProjects();
    const index = projects.findIndex(p => p.id === projectId);

    if (index !== -1) {
      projects[index] = {
        ...projects[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      this.saveProjects(projects);
    }
  },

  deleteProject(projectId: string): void {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== projectId);
    this.saveProjects(filtered);
  },

  getProject(projectId: string): Project | undefined {
    const projects = this.getProjects();
    return projects.find(p => p.id === projectId);
  },
};
