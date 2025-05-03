export const COLORS = {
  primary: '#4f46e5',
  secondary: '#6366f1',
  accent: '#14b8a6',
  background: '#f9fafb',
  card: '#ffffff',
  text: '#1f2937',
  border: '#e5e7eb',

  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Chart colors
  chart: [
    '#4f46e5',
    '#6366f1',
    '#14b8a6',
    '#10b981',
    '#f59e0b',
    '#ef4444'
  ]
};

export const STATUS_COLORS = {
  completed: { bg: 'bg-green-100', text: 'text-green-600' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  failed: { bg: 'bg-red-100', text: 'text-red-600' },
  processing: { bg: 'bg-blue-100', text: 'text-blue-600' },
  shipped: { bg: 'bg-purple-100', text: 'text-purple-600' },
  delivered: { bg: 'bg-green-100', text: 'text-green-600' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-600' },
  refunded: { bg: 'bg-orange-100', text: 'text-orange-600' },
  on_hold: { bg: 'bg-gray-100', text: 'text-gray-600' }
};
