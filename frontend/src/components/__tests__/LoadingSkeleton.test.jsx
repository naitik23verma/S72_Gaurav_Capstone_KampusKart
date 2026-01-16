import { render, screen } from '@testing-library/react';
import { ItemCardSkeleton, ItemsGridSkeleton } from '../LoadingSkeleton';

describe('LoadingSkeleton Components', () => {
  describe('ItemCardSkeleton', () => {
    test('renders skeleton card with all elements', () => {
      const { container } = render(<ItemCardSkeleton />);
      
      expect(container.querySelector('.skeleton-card')).toBeInTheDocument();
      expect(container.querySelector('.skeleton-image')).toBeInTheDocument();
      expect(container.querySelector('.skeleton-badge')).toBeInTheDocument();
      expect(container.querySelector('.skeleton-title')).toBeInTheDocument();
      expect(container.querySelector('.skeleton-text')).toBeInTheDocument();
      expect(container.querySelector('.skeleton-button')).toBeInTheDocument();
    });

    test('has correct CSS classes for animation', () => {
      const { container } = render(<ItemCardSkeleton />);
      const skeletonElements = container.querySelectorAll('.skeleton');
      
      expect(skeletonElements.length).toBeGreaterThan(0);
      skeletonElements.forEach(element => {
        expect(element).toHaveClass('skeleton');
      });
    });
  });

  describe('ItemsGridSkeleton', () => {
    test('renders default number of skeleton cards (6)', () => {
      const { container } = render(<ItemsGridSkeleton />);
      const skeletonCards = container.querySelectorAll('.skeleton-card');
      
      expect(skeletonCards).toHaveLength(6);
    });

    test('renders custom number of skeleton cards', () => {
      const { container } = render(<ItemsGridSkeleton count={3} />);
      const skeletonCards = container.querySelectorAll('.skeleton-card');
      
      expect(skeletonCards).toHaveLength(3);
    });

    test('renders in grid layout', () => {
      const { container } = render(<ItemsGridSkeleton />);
      const grid = container.querySelector('.items-grid');
      
      expect(grid).toBeInTheDocument();
    });

    test('renders correct number when count is 10', () => {
      const { container } = render(<ItemsGridSkeleton count={10} />);
      const skeletonCards = container.querySelectorAll('.skeleton-card');
      
      expect(skeletonCards).toHaveLength(10);
    });
  });
});
