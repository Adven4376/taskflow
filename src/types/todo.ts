export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoStats {
  total: number;
  completed: number;
  active: number;
  overdue: number;
}