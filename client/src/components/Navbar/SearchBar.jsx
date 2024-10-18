import React, { useState, useEffect } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { api } from '../../config/apiUrl';
import { API_BASE_URL } from '../../config/apiUrl';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults([]); // Clear results if query is empty
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      handleSearch(); // Perform search after a short delay
    }, 500); // Add debounce time (500ms) to prevent excessive API calls

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout if query changes
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/api/recipes/search`, {
        params: { query: searchQuery }
      });
      setResults(response.data); // Set search results in state
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion);
    navigate(`/user/recipe/${suggestion._id}`)
    setSearchQuery('');
    setResults([]);
  };

  return (
    <div>
      <div className="relative mx-4   lg:w-[27rem] flex border border-[#FF6216] rounded-md justify-between items-center p-2 lg:p-1">
        <input
          type="text"
          placeholder="Search recipes or ingredients..."
          className="block p-[3px] lg:p-[5px] w-full bg-transparent text-white placeholder-neutral-400 focus:border-[#FF6216] focus:ring-[#FF6216] sm:w-64 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Trigger search on input change
        />
        <IoSearchSharp size={22} className='text-[#FF6216]' onClick={handleSearch} />
      </div>

      {results.length > 0 && (
        <div className="absolute left-[23rem] right-0 top-[4.5rem] mt-2 bg-neutral-100 border border-gray-300 rounded-lg shadow-lg w-[27.5rem] z-10">
          {results.slice(0, 3).map((suggestion, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200 flex items-center"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {/* Recipe Image */}
              {suggestion.imageUrl ? (
                <img
                  src={`${API_BASE_URL}/images/${suggestion.imageUrl}`}
                  alt={suggestion.title}
                  className="w-12 h-12 object-cover rounded-md mr-2"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-md mr-2"></div>
              )}

              <div className="flex-1">
                {/* Recipe Title */}
                <p className="text-sm font-semibold">{suggestion.title}</p>

                {/* Recipe Category */}
                {suggestion?.cuisine && (
                  <p className="text-xs text-gray-500">in {suggestion.cuisine}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
