'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/lib/types';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
  onUpdate?: (taskId: string, updates: Partial<Task>) => void;
  onDelete?: (taskId: string) => void;
}

export function TaskCard({ task, isDragging = false, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (onUpdate && (title !== task.title || description !== task.description)) {
      onUpdate(task.id, { title, description });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(false);
  };

  if (isDragging) {
    return (
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg border-2 border-blue-500 opacity-50">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{task.description}</p>
        )}
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-600">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 border rounded mb-2 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Task title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 border rounded mb-2 dark:bg-gray-800 dark:text-gray-100"
          placeholder="Task description"
          rows={3}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-600 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 flex-1">{task.title}</h3>
        <div className="flex gap-2 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-gray-500 hover:text-blue-600 text-sm"
          >
            Edit
          </button>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              className="text-gray-500 hover:text-red-600 text-sm"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{task.description}</p>
      )}
      <p className="text-xs text-gray-400 mt-2">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
