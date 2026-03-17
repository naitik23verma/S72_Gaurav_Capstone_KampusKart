/**
 * Custom hook for search autocomplete functionality
 * Extracts duplicate logic from Events, LostFound, ClubsRecruitment components
 */

import { useState, useEffect, useRef } from 'react';

interface UseSearchAutocompleteOptions<T> {
  items: T[];
  searchFields: (item: T) => string[];
  maxSuggestions?: number;
  minSearchLength?: number;
}

export function useSearchAutocomplete<T>({
  items,
  searchFields,
  maxSuggestions = 5,
  minSearchLength = 1,
}: UseSearchAutocompleteOptions<T>) {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const isSelectingSuggestion = useRef(false);

  // Generate autocomplete suggestions
  useEffect(() => {
    // Skip if user just selected a suggestion
    if (isSelectingSuggestion.current) {
      isSelectingSuggestion.current = false;
      return;
    }

    if (searchInput.trim().length >= minSearchLength) {
      const suggestions = new Set<string>();
      const lowerInput = searchInput.toLowerCase();

      items.forEach((item) => {
        const fields = searchFields(item);
        fields.forEach((field) => {
          if (field && field.toLowerCase().includes(lowerInput)) {
            // For long text fields, extract relevant words
            if (field.length > 50) {
              const words = field.split(' ').filter(
                (word) =>
                  word.toLowerCase().includes(lowerInput) && word.length > 3
              );
              words.forEach((word) => suggestions.add(word));
            } else {
              suggestions.add(field);
            }
          }
        });
      });

      setFilteredSuggestions(Array.from(suggestions).slice(0, maxSuggestions));
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchInput, items, searchFields, maxSuggestions, minSearchLength]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
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

  const handleSuggestionClick = (suggestion: string) => {
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
    handleSearch,
    handleSuggestionClick,
    clearSearch,
  };
}
