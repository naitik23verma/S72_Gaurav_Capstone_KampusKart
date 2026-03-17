import React, { useEffect } from 'react';
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
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`bg-white sm:rounded-xl rounded-t-xl shadow-2xl border-2 border-gray-200 p-4 sm:p-6 md:p-8 ${sizeClasses[size]} w-full mx-auto max-h-[95vh] sm:max-h-[90vh] overflow-y-auto relative`}
        style={{ colorScheme: 'light', backgroundColor: '#ffffff', color: '#213547' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 id="modal-title" className="text-xl sm:text-2xl font-bold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="bg-[#181818] hover:bg-[#00C6A7] active:bg-[#181818] text-white rounded-lg p-2 transition-all duration-200 flex-shrink-0 flex items-center justify-center w-10 h-10"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Content */}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

