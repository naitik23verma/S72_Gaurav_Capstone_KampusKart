import { useState, useEffect, useRef } from 'react';

interface UseAutocompleteOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
  minLength?: number;
  maxSuggestions?: number;
}

/**
 * Custom hook for autocomplete functionality
 * Provides search input, suggestions, and selection handling
 */
export const useAutocomplete = <T extends Record<string, any>>({
  items,
  searchFields,
  minLength = 1,
  maxSuggestions = 5,
}: UseAutocompleteOptions<T>) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const isSelectingSuggestion = useRef(false);

  // Generate autocomplete suggestions
  useEffect(() => {
    if (isSelectingSuggestion.current) {
      isSelectingSuggestion.current = false;
      return;
    }

    if (searchInput.trim().length >= minLength) {
      const suggestions = new Set<string>();
      
      items.forEach((item) => {
        searchFields.forEach((field) => {
          const value = item[field];
          if (typeof value === 'string' && value.toLowerCase().includes(searchInput.toLowerCase())) {
            suggestions.add(value);
          }
        });

        // Also extract words from description fields
        const descField = searchFields.find(f => f.toString().includes('description'));
        if (descField) {
          const desc = item[descField];
          if (typeof desc === 'string') {
            const words = desc.split(' ').filter(word => 
              word.toLowerCase().includes(searchInput.toLowerCase()) && word.length > 3
            );
            words.forEach(word => suggestions.add(word));
          }
        }
      });

      setFilteredSuggestions(Array.from(suggestions).slice(0, maxSuggestions));
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchInput, items, searchFields, minLength, maxSuggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    setSearchQuery(searchInput);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    isSelectingSuggestion.current = true;
    setSearchInput(suggestion);
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return {
    searchInput,
    setSearchInput,
    searchQuery,
    showSuggestions,
    filteredSuggestions,
    searchRef,
    isSelectingSuggestion,
    handleSearch,
    handleKeyDown,
    selectSuggestion,
    clearSearch,
  };
};
