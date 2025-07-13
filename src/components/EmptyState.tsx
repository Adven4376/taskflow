import React from 'react';
import { CheckCircle } from 'lucide-react';

interface EmptyStateProps {
  hasActiveTodos: boolean;
  filter: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasActiveTodos, filter }) => {
  const getMessage = () => {
    if (filter === 'completed' && !hasActiveTodos) {
      return {
        title: 'No completed tasks yet',
        subtitle: 'Complete some tasks to see them here',
      };
    }
    
    if (filter === 'active') {
      return {
        title: 'All tasks completed!',
        subtitle: 'Great job! You\'ve finished all your tasks.',
      };
    }

    return {
      title: 'No tasks yet',
      subtitle: 'Create your first task to get started',
    };
  };

  const { title, subtitle } = getMessage();

  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
        <CheckCircle size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
};