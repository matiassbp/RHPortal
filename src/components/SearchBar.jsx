import { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

const SearchBar = ({ onSearch, filters = [], onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, activeFilters);
  };
  
  const handleFilterChange = (filterKey, value) => {
    const newFilters = {
      ...activeFilters,
      [filterKey]: value === 'all' ? null : value
    };
    
    setActiveFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
    onSearch(searchTerm, newFilters);
  };
  
  return (
    <div className="mb-6 w-full">
      <div className="relative">
        <div className="flex">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input pl-10 w-full"
            />
          </div>
          
          {filters.length > 0 && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`ml-2 flex items-center justify-center px-4 rounded-lg border transition-colors ${
                Object.values(activeFilters).some(v => v !== null)
                  ? 'border-primary/50 bg-primary/5 text-primary'
                  : 'border-gray-300 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <FaFilter className="mr-2" />
              Filtros
              {Object.values(activeFilters).filter(v => v !== null).length > 0 && (
                <span className="ml-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.values(activeFilters).filter(v => v !== null).length}
                </span>
              )}
            </button>
          )}
        </div>
        
        {showFilters && filters.length > 0 && (
          <div className="absolute z-10 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filters.map((filter) => (
                <div key={filter.key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {filter.label}
                  </label>
                  <select
                    className="input w-full"
                    value={activeFilters[filter.key] || 'all'}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  >
                    <option value="all">Todos</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  const resetFilters = {};
                  filters.forEach(filter => {
                    resetFilters[filter.key] = null;
                  });
                  setActiveFilters(resetFilters);
                  onFilterChange && onFilterChange(resetFilters);
                  onSearch(searchTerm, resetFilters);
                }}
                className="text-sm text-gray-600 hover:text-primary mr-4"
              >
                Limpiar filtros
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="btn btn-primary"
              >
                Aplicar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;