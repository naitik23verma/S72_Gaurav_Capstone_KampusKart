import React from 'react';
import { getContainerPadding } from '../../utils/responsive';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'mobile' | 'tablet' | 'desktop';
}

/**
 * Responsive container component with consistent padding
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  variant = 'mobile',
}) => {
  const padding = getContainerPadding(variant);
  
  return (
    <div className={`${padding} ${className}`}>
      {children}
    </div>
  );
};

