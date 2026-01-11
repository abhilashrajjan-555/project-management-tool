'use client';

import { useEffect, useState } from 'react';
import { Project, Task, TodoItem } from '@/lib/types';
import { storage } from '@/lib/storage';
import { KanbanBoard } from '@/components/KanbanBoard';
import { TodoList } from '@/components/TodoList';
import { ProjectSelector } from '@/components/ProjectSelector';
import { CreateProjectModal } from '@/components/CreateProjectModal';

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Load projects from localStorage on mount - initialize directly from storage
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window === 'undefined') return [];
    return storage.getProjects();
  });

  const [currentProjectId, setCurrentProjectId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const loadedProjects = storage.getProjects();
    return loadedProjects.length > 0 ? loadedProjects[0].id : null;
  });

  // Save projects to localStorage whenever they change
  useEffect(() => {
    storage.saveProjects(projects);
  }, [projects]);

  const currentProject = projects.find(p => p.id === currentProjectId);

  const handleCreateProject = (name: string, description: string) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tasks: [],
      todos: [],
    };

    setProjects([...projects, newProject]);
    setCurrentProjectId(newProject.id);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));

    if (currentProjectId === projectId) {
      const remaining = projects.filter(p => p.id !== projectId);
      setCurrentProjectId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const handleAddTask = (status: Task['status']) => {
    if (!currentProject) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: 'New Task',
      description: '',
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects(
      projects.map(p =>
        p.id === currentProjectId
          ? { ...p, tasks: [...p.tasks, newTask], updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    if (!currentProject) return;

    setProjects(
      projects.map(p =>
        p.id === currentProjectId
          ? {
              ...p,
              tasks: p.tasks.map(t =>
                t.id === taskId ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
              ),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    if (!currentProject) return;

    setProjects(
      projects.map(p =>
        p.id === currentProjectId
          ? {
              ...p,
              tasks: p.tasks.filter(t => t.id !== taskId),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const handleAddTodo = (text: string) => {
    if (!currentProject || !currentProjectId) return;

    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      projectId: currentProjectId,
    };

    setProjects(
      projects.map(p =>
        p.id === currentProjectId
          ? { ...p, todos: [...p.todos, newTodo], updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  const handleToggleTodo = (todoId: string) => {
    if (!currentProject) return;

    setProjects(
      projects.map(p =>
        p.id === currentProjectId
          ? {
              ...p,
              todos: p.todos.map(t => (t.id === todoId ? { ...t, completed: !t.completed } : t)),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  const handleDeleteTodo = (todoId: string) => {
    if (!currentProject) return;

    setProjects(
      projects.map(p =>
        p.id === currentProjectId
          ? {
              ...p,
              todos: p.todos.filter(t => t.id !== todoId),
              updatedAt: new Date().toISOString(),
            }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Project Management Tool
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your projects, tasks, and todos in one place
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProjectSelector
              projects={projects}
              currentProjectId={currentProjectId}
              onSelectProject={setCurrentProjectId}
              onCreateProject={() => setIsCreateModalOpen(true)}
              onDeleteProject={handleDeleteProject}
            />
          </div>

          <div className="lg:col-span-3">
            {currentProject ? (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {currentProject.name}
                  </h2>
                  {currentProject.description && (
                    <p className="text-gray-600 dark:text-gray-400">{currentProject.description}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Kanban Board
                  </h3>
                  <KanbanBoard
                    tasks={currentProject.tasks}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                    onAddTask={handleAddTask}
                  />
                </div>

                <div>
                  <TodoList
                    todos={currentProject.todos}
                    onAddTodo={handleAddTodo}
                    onToggleTodo={handleToggleTodo}
                    onDeleteTodo={handleDeleteTodo}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  No Project Selected
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Create a new project to get started
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Create Your First Project
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}
