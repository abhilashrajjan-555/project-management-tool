import { Project } from './types';

const STORAGE_KEY = 'project-management-data';

function normalizeProject(project: unknown): Project | null {
  if (!project || typeof project !== 'object') return null;

  const p = project as Partial<Project>;
  if (typeof p.id !== 'string' || typeof p.name !== 'string') return null;

  return {
    id: p.id,
    name: p.name,
    description: typeof p.description === 'string' ? p.description : '',
    createdAt: typeof p.createdAt === 'string' ? p.createdAt : new Date().toISOString(),
    updatedAt: typeof p.updatedAt === 'string' ? p.updatedAt : new Date().toISOString(),
    tasks: Array.isArray(p.tasks) ? p.tasks : [],
    todos: Array.isArray(p.todos) ? p.todos : [],
  };
}

export const storage = {
  getProjects(): Project[] {
    if (typeof window === 'undefined') return [];

    let data: string | null = null;
    try {
      data = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error reading projects from localStorage:', error);
      return [];
    }

    if (!data) return [];

    try {
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(normalizeProject).filter((project): project is Project => project !== null);
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
