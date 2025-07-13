import React, { useState } from 'react';
import { Check, Edit3, Trash2, Calendar, Flag } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onUpdateTodo: (id: string, updates: Partial<Todo>) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onUpdateTodo,
  onDeleteTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdateTodo(todo.id, { text: editText.trim() });
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const priorityColors = {
    low: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    high: 'text-red-600 bg-red-50 border-red-200',
  };

  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();
  const isDueSoon = todo.dueDate && !todo.completed && 
    new Date(todo.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <div className={`group bg-white rounded-lg border border-gray-200 p-4 transition-all duration-200 hover:shadow-md ${
      todo.completed ? 'opacity-75' : ''
    } ${isOverdue ? 'border-red-300 bg-red-50' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {todo.completed && <Check size={12} className="mx-auto mt-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyPress}
              className="w-full px-2 py-1 text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          ) : (
            <p
              className={`text-gray-900 ${
                todo.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.text}
            </p>
          )}

          <div className="flex items-center gap-3 mt-2">
            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md border ${priorityColors[todo.priority]}`}>
              <Flag size={12} />
              {todo.priority}
            </span>

            {todo.dueDate && (
              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md ${
                isOverdue
                  ? 'text-red-600 bg-red-50 border-red-200'
                  : isDueSoon
                  ? 'text-orange-600 bg-orange-50 border-orange-200'
                  : 'text-gray-600 bg-gray-50 border-gray-200'
              }`}>
                <Calendar size={12} />
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};