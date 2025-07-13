import React from 'react';
import { CheckCircle, Circle, Clock, TrendingUp } from 'lucide-react';
import { TodoStats as TodoStatsType } from '../types/todo';

interface TodoStatsProps {
  stats: TodoStatsType;
}

export const TodoStats: React.FC<TodoStatsProps> = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statItems = [
    {
      icon: Circle,
      label: 'Total Tasks',
      value: stats.total,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: CheckCircle,
      label: 'Completed',
      value: stats.completed,
      color: 'text-green-600 bg-green-50',
    },
    {
      icon: Clock,
      label: 'Active',
      value: stats.active,
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      icon: TrendingUp,
      label: 'Completion Rate',
      value: `${completionRate}%`,
      color: 'text-purple-600 bg-purple-50',
    },
  ];

  if (stats.overdue > 0) {
    statItems.push({
      icon: Clock,
      label: 'Overdue',
      value: stats.overdue,
      color: 'text-red-600 bg-red-50',
    });
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
      {statItems.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${color} mb-2`}>
            <Icon size={16} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      ))}
    </div>
  );
};