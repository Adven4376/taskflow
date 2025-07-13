import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FilterType } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onClearCompleted: () => void;
  completedCount: number;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  onClearCompleted,
  completedCount,
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  filter === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            Clear Completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
};