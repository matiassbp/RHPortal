import { useState, useEffect } from 'react';
import { FaFilter, FaSortAmountDown, FaUsers, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ApplicantCard from '../components/ApplicantCard';
import SearchBar from '../components/SearchBar';
import { applicants } from '../data/applicants';
import { vacancies } from '../data/vacancies';
import { statuses } from '../data/statuses';

const Applicants = () => {
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    position: '',
    status: '',
    sortBy: 'recent'
  });
  
  // Extraer valores únicos para los filtros
  const positions = [...new Set(applicants.map(applicant => applicant.position))];
  const statusOptions = [...new Set(applicants.map(applicant => applicant.status))];

  useEffect(() => {
    // Aplicar filtros
    let result = [...applicants];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(applicant => 
        applicant.name.toLowerCase().includes(searchTerm) || 
        applicant.position.toLowerCase().includes(searchTerm) ||
        applicant.email.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.position) {
      result = result.filter(applicant => applicant.position === filters.position);
    }
    
    if (filters.status) {
      result = result.filter(applicant => applicant.status === filters.status);
    }
    
    // Aplicar ordenamiento
    if (filters.sortBy === 'recent') {
      result.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    } else if (filters.sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === 'status') {
      // Ordenar por orden de estado (usando el campo 'order' en el array de statuses)
      result.sort((a, b) => {
        const statusA = statuses.find(s => s.name === a.status)?.order || 0;
        const statusB = statuses.find(s => s.name === b.status)?.order || 0;
        return statusA - statusB;
      });
    }
    
    setFilteredApplicants(result);
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
      position: '',
      status: '',
      sortBy: 'recent'
    });
  };
  
  // Auxiliar para obtener el color del estado
  const getStatusColor = (statusName) => {
    const status = statuses.find(s => s.name === statusName);
    return status ? status.color : '#9CA3AF';
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Postulantes</h1>
          <p className="text-gray-600">Gestiona los candidatos a tus vacantes</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="btn btn-primary">
            Exportar datos
          </button>
        </div>
      </div>
      
      {/* Búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Buscar postulantes..."
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
            <select
              name="position"
              value={filters.position}
              onChange={handleFilterChange}
              className="select select-bordered w-full"
            >
              <option value="">Todas las posiciones</option>
              {positions.map((pos, index) => (
                <option key={index} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="select select-bordered w-full"
            >
              <option value="">Todos los estados</option>
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="select select-bordered w-full"
            >
              <option value="recent">Más recientes</option>
              <option value="name">Nombre</option>
              <option value="status">Estado del proceso</option>
            </select>
          </div>
        </div>
        
        {(filters.position || filters.status || filters.sortBy !== 'recent') && (
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
          {filteredApplicants.length} {filteredApplicants.length === 1 ? 'postulante encontrado' : 'postulantes encontrados'}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2 md:mt-0">
          <div className="flex items-center">
            <FaUsers className="mr-1" />
            <span>{applicants.length} total</span>
          </div>
          <div className="flex items-center">
            <FaRegClock className="mr-1" />
            <span>Actualizado hoy</span>
          </div>
        </div>
      </div>
      
      {/* Lista de postulantes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {filteredApplicants.length > 0 ? (
          filteredApplicants.map(applicant => (
            <ApplicantCard 
              key={applicant.id} 
              applicant={applicant} 
              statusColor={getStatusColor(applicant.status)}
              vacancyTitle={vacancies.find(v => v.id === applicant.vacancyId)?.title || applicant.position}
            />
          ))
        ) : (
          <div className="col-span-2 py-8 text-center">
            <p className="text-gray-500 text-lg">No se encontraron postulantes con los filtros seleccionados.</p>
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

export default Applicants;