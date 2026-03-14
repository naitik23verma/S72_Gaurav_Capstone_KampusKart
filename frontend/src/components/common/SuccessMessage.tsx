import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

interface SuccessMessageProps {
  message: string | null;
  className?: string;
}

/**
 * Reusable success message banner component
 * Displays a green banner with checkmark icon
 */
export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <div 
      className={`mb-6 rounded-lg bg-green-50 border-2 border-green-200 p-4 flex items-center gap-3 animate-fade-in ${className}`}
      role="alert"
      aria-live="polite"
    >
      <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />
      <p className="text-sm font-medium text-green-800">{message}</p>
    </div>
  );
};
