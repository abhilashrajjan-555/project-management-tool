'use client';

import { Project } from '@/lib/types';

interface ProjectSelectorProps {
  projects: Project[];
  currentProjectId: string | null;
  onSelectProject: (projectId: string) => void;
  onCreateProject: () => void;
  onDeleteProject: (projectId: string) => void;
}

export function ProjectSelector({
  projects,
  currentProjectId,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
}: ProjectSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Projects</h2>
        <button
          onClick={onCreateProject}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
        >
          + New Project
        </button>
      </div>

      <div className="space-y-2">
        {projects.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No projects yet. Create one to get started!</p>
        ) : (
          projects.map(project => (
            <div
              key={project.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                currentProjectId === project.id
                  ? 'bg-blue-50 border-2 border-blue-500 dark:bg-blue-900/20'
                  : 'border-2 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => onSelectProject(project.id)}
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{project.name}</h3>
                {project.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {project.tasks.length} tasks, {project.todos.length} todos
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete project "${project.name}"?`)) {
                    onDeleteProject(project.id);
                  }
                }}
                className="ml-4 text-gray-400 hover:text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
