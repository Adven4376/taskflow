import React from 'react';
import { CheckSquare } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoFilters } from './components/TodoFilters';
import { TodoStats } from './components/TodoStats';
import { TodoItem } from './components/TodoItem';
import { EmptyState } from './components/EmptyState';

function App() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    clearCompleted,
    stats,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <CheckSquare size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          <p className="text-gray-600 text-lg">Organize your life, one task at a time</p>
        </div>

        {/* Statistics */}
        <TodoStats stats={stats} />

        {/* Add Todo Form */}
        <TodoForm onAddTodo={addTodo} />

        {/* Filters */}
        <TodoFilters
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClearCompleted={clearCompleted}
          completedCount={stats.completed}
        />

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <EmptyState hasActiveTodos={stats.active > 0} filter={filter} />
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={toggleComplete}
                onUpdateTodo={updateTodo}
                onDeleteTodo={deleteTodo}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;