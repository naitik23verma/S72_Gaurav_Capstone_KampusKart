import { useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  currentPage: number;
  totalPages: number;
  isFetching: boolean;
  onLoadMore: () => void;
}

/**
 * Custom hook for infinite scroll functionality using Intersection Observer
 */
export const useInfiniteScroll = ({
  currentPage,
  totalPages,
  isFetching,
  onLoadMore,
}: UseInfiniteScrollOptions) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, currentPage, totalPages, onLoadMore]
  );

  return { lastItemRef };
};
