import React from 'react';
import { FiX } from 'react-icons/fi';
import { ErrorMessage } from './ErrorMessage';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  error?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-3xl',
  xl: 'max-w-4xl',
};

/**
 * Standardized modal component for feature components (Events, News, LostFound, etc.)
 * Provides consistent styling and behavior across all feature modals
 */
export const FeatureModal: React.FC<FeatureModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  error,
  size = 'md',
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 safe-top safe-bottom"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6 md:p-8 ${sizeClasses[size]} w-full mx-auto max-h-[90vh] md:max-h-[85vh] overflow-y-auto relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pr-12">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="bg-[#181818] hover:bg-[#00C6A7] text-white rounded-lg p-2.5 transition-colors duration-200 min-h-touch min-w-touch flex-shrink-0 flex items-center justify-center"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Error Message */}
        <ErrorMessage message={error} />

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

