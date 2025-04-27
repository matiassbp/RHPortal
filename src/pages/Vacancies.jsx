import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaPlus, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import VacancyCard from '../components/VacancyCard';
import SearchBar from '../components/SearchBar';
import { vacancies } from '../data/vacancies';

const Vacancies = () => {
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    location: '',
    type: ''
  });
  
  // Extraer valores únicos para los filtros
  const departments = [...new Set(vacancies.map(vacancy => vacancy.department))];
  const locations = [...new Set(vacancies.map(vacancy => vacancy.location))];
  const types = [...new Set(vacancies.map(vacancy => vacancy.type))];
  
  useEffect(() => {
    // Aplicar filtros
    let result = vacancies;
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(vacancy => 
        vacancy.title.toLowerCase().includes(searchTerm) || 
        vacancy.department.toLowerCase().includes(searchTerm) ||
        vacancy.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.department) {
      result = result.filter(vacancy => vacancy.department === filters.department);
    }
    
    if (filters.location) {
      result = result.filter(vacancy => vacancy.location === filters.location);
    }
    
    if (filters.type) {
      result = result.filter(vacancy => vacancy.type === filters.type);
    }
    
    setFilteredVacancies(result);
  }, [filters]);
  
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const clearFilters = () => {
    setFilters({
      search: '',
      department: '',
      location: '',
      type: ''
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Vacantes</h1>
          <p className="text-gray-600">Explora nuestras posiciones disponibles</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn btn-primary">
             Nueva vacante
          </button>
        </div>
      </div>
      
      {/* Búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Buscar vacantes..."
              value={filters.search}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-md">
            <FaFilter className="mr-2" />
            <span className="text-sm font-medium">Filtros</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
              className="select select-bordered w-full"
            >
              <option value="">Todos los departamentos</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="select select-bordered w-full"
            >
              <option value="">Todas las ubicaciones</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="select select-bordered w-full"
            >
              <option value="">Todos los tipos</option>
              {types.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        {(filters.department || filters.location || filters.type) && (
          <div className="flex justify-end mt-4">
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
      
      {/* Resumen de resultados */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <p className="text-gray-600">
          {filteredVacancies.length} {filteredVacancies.length === 1 ? 'vacante encontrada' : 'vacantes encontradas'}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2 md:mt-0">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1" />
            <span>{locations.length} ubicaciones</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            <span>Actualizado hoy</span>
          </div>
        </div>
      </div>
      
      {/* Lista de vacantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredVacancies.length > 0 ? (
          filteredVacancies.map(vacancy => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))
        ) : (
          <div className="col-span-3 py-8 text-center">
            <p className="text-gray-500 text-lg">No se encontraron vacantes con los filtros seleccionados.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 btn btn-outline btn-primary"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Vacancies;