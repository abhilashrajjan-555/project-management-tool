'use client';

import { useState } from 'react';
import { TodoItem } from '@/lib/types';

interface TodoListProps {
  todos: TodoItem[];
  onAddTodo: (text: string) => void;
  onToggleTodo: (todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

export function TodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo }: TodoListProps) {
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      onAddTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Todo List
        </h2>
        <span className="text-sm text-gray-500">
          {completedCount} / {todos.length} completed
        </span>
      </div>

      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No todos yet. Add one to get started!</p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => onDeleteTodo(todo.id)}
                className="text-gray-400 hover:text-red-600 text-sm"
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
