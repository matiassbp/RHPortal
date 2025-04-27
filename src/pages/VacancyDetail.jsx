import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaBusinessTime, 
  FaMoneyBillWave, FaArrowLeft, FaEdit, FaTrash, FaCheck, 
  FaUserPlus, FaShareAlt, FaClipboard 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { vacancies } from '../data/vacancies';
import { applicants } from '../data/applicants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const VacancyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState(null);
  const [vacancyApplicants, setVacancyApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    status: ''
  });
  
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899'];
  
  // Status stats para el gráfico
  const getStatusStats = () => {
    const stats = {};
    vacancyApplicants.forEach(applicant => {
      if (!stats[applicant.status]) {
        stats[applicant.status] = 0;
      }
      stats[applicant.status]++;
    });
    
    return Object.keys(stats).map(status => ({
      name: status,
      value: stats[status]
    }));
  };
  
  useEffect(() => {
    // Simular carga de datos
    setLoading(true);
    setTimeout(() => {
      const foundVacancy = vacancies.find(v => v.id === parseInt(id));
      
      if (foundVacancy) {
        setVacancy(foundVacancy);
        setFormData({
          title: foundVacancy.title,
          department: foundVacancy.department,
          location: foundVacancy.location,
          type: foundVacancy.type,
          salary: foundVacancy.salary,
          description: foundVacancy.description,
          requirements: foundVacancy.requirements.join('\n'),
          responsibilities: foundVacancy.responsibilities.join('\n'),
          benefits: foundVacancy.benefits.join('\n'),
          status: foundVacancy.status
        });
        
        // Filtrar postulantes para esta vacante
        const relatedApplicants = applicants.filter(a => a.vacancyId === foundVacancy.id);
        setVacancyApplicants(relatedApplicants);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar la vacante
    // En una aplicación real, esto haría una llamada a la API
    
    // Procesamiento de listas separadas por saltos de línea
    const processedData = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(item => item.trim() !== ''),
      responsibilities: formData.responsibilities.split('\n').filter(item => item.trim() !== ''),
      benefits: formData.benefits.split('\n').filter(item => item.trim() !== '')
    };
    
    // Simulación de actualización
    const updatedVacancy = {
      ...vacancy,
      ...processedData
    };
    setVacancy(updatedVacancy);
    setEditMode(false);
    
    // Mostrar mensaje de éxito
    alert('Información de la vacante actualizada con éxito');
  };
  
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta vacante?')) {
      // Aquí iría la lógica para eliminar la vacante
      // En una aplicación real, esto haría una llamada a la API
      
      // Redireccionar a la lista de vacantes
      navigate('/vacancies');
    }
  };
  
  const copyToClipboard = () => {
    const vacancyUrl = window.location.href;
    navigator.clipboard.writeText(vacancyUrl);
    alert('Enlace de la vacante copiado al portapapeles');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader"></div>
      </div>
    );
  }
  
  if (!vacancy) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Vacante no encontrada</h2>
        <p className="mb-6">La vacante que buscas no existe o ha sido eliminada.</p>
        <Link to="/vacancies" className="btn btn-primary">
          <FaArrowLeft className="mr-2" /> Volver a vacantes
        </Link>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4"
    >
      {/* Navegación de regreso */}
      <div className="mb-6">
        <Link to="/vacancies" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          <FaArrowLeft className="mr-2" /> Volver a vacantes
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {/* Encabezado de la vacante */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <span className={`px-3 py-1 rounded-full text-xs font-medium mr-2 ${
                  vacancy.status === 'Activa' ? 'bg-green-500' : 'bg-gray-500'
                }`}>
                  {vacancy.status}
                </span>
                <span className="text-blue-100">{vacancy.department}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mt-2">{vacancy.title}</h1>
              <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-blue-200" />
                  <span>{vacancy.location}</span>
                </div>
                <div className="flex items-center">
                  <FaBusinessTime className="mr-2 text-blue-200" />
                  <span>{vacancy.type}</span>
                </div>
                <div className="flex items-center">
                  <FaMoneyBillWave className="mr-2 text-blue-200" />
                  <span>{vacancy.salary}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-200" />
                  <span>Publicada el {new Date(vacancy.postedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <button 
                onClick={() => setEditMode(!editMode)}
                className="btn bg-white text-blue-700 hover:bg-blue-50"
              >
                <FaEdit className="mr-2" /> 
                {editMode ? 'Cancelar' : 'Editar'}
              </button>
              <button
                onClick={copyToClipboard}
                className="btn bg-white text-blue-700 hover:bg-blue-50"
              >
                <FaShareAlt className="mr-2" /> 
                Compartir
              </button>
            </div>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="p-6">
          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título de la vacante</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="Tiempo completo">Tiempo completo</option>
                    <option value="Medio tiempo">Medio tiempo</option>
                    <option value="Contrato">Contrato</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Pasantía">Pasantía</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salario</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="Activa">Activa</option>
                    <option value="Cerrada">Cerrada</option>
                    <option value="En pausa">En pausa</option>
                    <option value="Borrador">Borrador</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full h-32"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos (uno por línea)</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full h-32"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsabilidades (uno por línea)</label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full h-32"
                  required
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Beneficios (uno por línea)</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full h-32"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-outline btn-error"
                >
                  <FaTrash className="mr-2" /> Eliminar vacante
                </button>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="btn btn-outline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <FaCheck className="mr-2" /> Guardar cambios
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Columna izquierda - Detalles de la vacante */}
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">Descripción de la vacante</h2>
                  <p className="text-gray-700 mb-6">{vacancy.description}</p>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">Requisitos</h3>
                  <ul className="list-disc pl-5 text-gray-700 mb-6">
                    {vacancy.requirements.map((req, index) => (
                      <li key={index} className="mb-1">{req}</li>
                    ))}
                  </ul>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">Responsabilidades</h3>
                  <ul className="list-disc pl-5 text-gray-700 mb-6">
                    {vacancy.responsibilities.map((resp, index) => (
                      <li key={index} className="mb-1">{resp}</li>
                    ))}
                  </ul>
                  
                  <h3 className="font-semibold text-gray-800 mb-2">Beneficios</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    {vacancy.benefits.map((benefit, index) => (
                      <li key={index} className="mb-1">{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Acciones principales */}
                <div className="bg-gray-50 p-4 rounded-lg mb-8">
                  <h3 className="font-semibold text-gray-800 mb-3">Acciones rápidas</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="btn btn-primary">
                      <FaUserPlus className="mr-2" /> Agregar candidato
                    </button>
                    <button className="btn btn-outline btn-primary">
                      <FaClipboard className="mr-2" /> Duplicar vacante
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      className="btn btn-outline"
                    >
                      <FaShareAlt className="mr-2" /> Compartir
                    </button>
                  </div>
                </div>
                
                {/* Lista de postulantes para esta vacante */}
                <div>
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
                    Postulantes ({vacancyApplicants.length})
                  </h2>
                  
                  {vacancyApplicants.length > 0 ? (
                    <div className="space-y-3">
                      {vacancyApplicants.map((applicant) => (
                        <div 
                          key={applicant.id} 
                          className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <img 
                            src={applicant.avatar} 
                            alt={applicant.name} 
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{applicant.name}</h4>
                            <p className="text-sm text-gray-500">
                              {applicant.status} - {new Date(applicant.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Link 
                            to={`/applicants/${applicant.id}`} 
                            className="btn btn-sm btn-outline"
                          >
                            Ver perfil
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 mb-4">Aún no hay postulantes para esta vacante</p>
                      <button className="btn btn-primary">
                        <FaUserPlus className="mr-2" /> Agregar candidato
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Columna derecha - Estadísticas */}
              <div className="md:col-span-1">
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Resumen</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Postulantes:</span>
                      <span className="font-medium">{vacancyApplicants.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Días activa:</span>
                      <span className="font-medium">
                        {Math.ceil((new Date() - new Date(vacancy.postedDate)) / (1000 * 60 * 60 * 24))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Vistas:</span>
                      <span className="font-medium">{vacancy.views || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tasa de conversión:</span>
                      <span className="font-medium">
                        {vacancy.views ? ((vacancyApplicants.length / vacancy.views) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Gráfico de estados */}
                {vacancyApplicants.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Estados de postulantes</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getStatusStats()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {getStatusStats().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} postulantes`, 'Cantidad']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
                
                {/* Vacantes similares */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Vacantes similares</h3>
                  <div className="space-y-3">
                    {vacancies
                      .filter(v => v.department === vacancy.department && v.id !== vacancy.id)
                      .slice(0, 3)
                      .map(similarVacancy => (
                        <Link 
                          key={similarVacancy.id}
                          to={`/vacancies/${similarVacancy.id}`}
                          className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <h4 className="font-medium">{similarVacancy.title}</h4>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <FaMapMarkerAlt className="mr-1 text-gray-400" size={12} />
                            {similarVacancy.location}
                          </p>
                        </Link>
                      ))}
                    
                    {vacancies.filter(v => v.department === vacancy.department && v.id !== vacancy.id).length === 0 && (
                      <p className="text-gray-500 text-sm">No hay vacantes similares disponibles</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VacancyDetail;