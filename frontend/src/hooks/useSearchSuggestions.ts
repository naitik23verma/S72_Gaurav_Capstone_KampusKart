import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

interface UseSearchSuggestionsOptions<T> {
  searchInput: string;
  items: T[];
  buildSuggestions: (item: T, normalizedQuery: string) => string[];
  maxSuggestions?: number;
}

interface UseSearchSuggestionsResult {
  showSuggestions: boolean;
  setShowSuggestions: Dispatch<SetStateAction<boolean>>;
  filteredSuggestions: string[];
  searchRef: RefObject<HTMLDivElement>;
  markSuggestionSelection: () => void;
}

export const useSearchSuggestions = <T,>({
  searchInput,
  items,
  buildSuggestions,
  maxSuggestions = 5,
}: UseSearchSuggestionsOptions<T>): UseSearchSuggestionsResult => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const isSelectingSuggestion = useRef(false);

  const markSuggestionSelection = useCallback(() => {
    isSelectingSuggestion.current = true;
  }, []);

  useEffect(() => {
    if (isSelectingSuggestion.current) {
      isSelectingSuggestion.current = false;
      return;
    }

    const trimmedInput = searchInput.trim();
    if (!trimmedInput) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const normalizedQuery = trimmedInput.toLowerCase();
    const suggestions = new Set<string>();

    items.forEach((item) => {
      const nextSuggestions = buildSuggestions(item, normalizedQuery);
      nextSuggestions.forEach((suggestion) => {
        const normalizedSuggestion = suggestion?.trim();
        if (normalizedSuggestion) {
          suggestions.add(normalizedSuggestion);
        }
      });
    });

    const nextList = Array.from(suggestions).slice(0, maxSuggestions);
    setFilteredSuggestions(nextList);
    setShowSuggestions(nextList.length > 0);
  }, [searchInput, items, buildSuggestions, maxSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    showSuggestions,
    setShowSuggestions,
    filteredSuggestions,
    searchRef,
    markSuggestionSelection,
  };
};
