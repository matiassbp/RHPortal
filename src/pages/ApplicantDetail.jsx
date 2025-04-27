import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaBusinessTime, 
  FaDownload, FaArrowLeft, FaEdit, FaTrash, FaCheck
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { applicants } from '../data/applicants';
import { vacancies } from '../data/vacancies';
import { statuses } from '../data/statuses';

const ApplicantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState(null);
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
    notes: ''
  });
  
  useEffect(() => {
    // Simular carga de datos
    setLoading(true);
    setTimeout(() => {
      const foundApplicant = applicants.find(a => a.id === parseInt(id));
      
      if (foundApplicant) {
        setApplicant(foundApplicant);
        setFormData({
          name: foundApplicant.name,
          email: foundApplicant.email,
          phone: foundApplicant.phone,
          status: foundApplicant.status,
          notes: foundApplicant.notes || ''
        });
        
        const foundVacancy = vacancies.find(v => v.id === foundApplicant.vacancyId);
        setVacancy(foundVacancy);
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
    // Aquí iría la lógica para actualizar el aplicante
    // En una aplicación real, esto haría una llamada a la API
    
    // Simulación de actualización
    const updatedApplicant = {
      ...applicant,
      ...formData
    };
    setApplicant(updatedApplicant);
    setEditMode(false);
    
    // Mostrar mensaje de éxito
    alert('Información del postulante actualizada con éxito');
  };
  
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este postulante?')) {
      // Aquí iría la lógica para eliminar el aplicante
      // En una aplicación real, esto haría una llamada a la API
      
      // Redireccionar a la lista de postulantes
      navigate('/applicants');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader"></div>
      </div>
    );
  }
  
  if (!applicant) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Postulante no encontrado</h2>
        <p className="mb-6">El postulante que buscas no existe o ha sido eliminado.</p>
        <Link to="/applicants" className="btn btn-primary">
          <FaArrowLeft className="mr-2" /> Volver a postulantes
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
        <Link to="/applicants" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          <FaArrowLeft className="mr-2" /> Volver a postulantes
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {/* Encabezado del perfil */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:mr-6 mb-4 md:mb-0">
                <img 
                  src={applicant.avatar} 
                  alt={applicant.name} 
                  className="w-24 h-24 rounded-full border-4 border-white object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold">{applicant.name}</h1>
                <p className="text-blue-100 text-lg">{applicant.position}</p>
                <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center">
                    <FaEnvelope className="mr-2 text-blue-200" />
                    <span>{applicant.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-2 text-blue-200" />
                    <span>{applicant.phone}</span>
                  </div>
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
              <button className="btn bg-white text-blue-700 hover:bg-blue-50">
                <FaDownload className="mr-2" /> 
                CV
              </button>
            </div>
          </div>
        </div>
        
        {/* Estado actual prominente */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-3 md:mb-0">
              <span className="text-gray-600 mr-2">Estado actual:</span>
              <span 
                className="px-3 py-1 rounded-full text-white font-medium"
                style={{ backgroundColor: statuses.find(s => s.name === applicant.status)?.color || '#9CA3AF' }}
              >
                {applicant.status}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-2">Vacante:</span>
              <Link 
                to={`/vacancies/${vacancy?.id || '#'}`}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                {vacancy?.title || applicant.position}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Contenido principal */}
        <div className="p-6">
          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
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
                  >
                    {statuses.map((status) => (
                      <option key={status.name} value={status.name}>{status.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Añade notas o comentarios sobre el postulante..."
                ></textarea>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="btn btn-outline btn-error"
                >
                  <FaTrash className="mr-2" /> Eliminar postulante
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
              {/* Columna izquierda - Información del candidato */}
              <div className="md:col-span-1">
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">Información personal</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Fecha de aplicación</h3>
                      <p className="text-gray-700 flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-500" />
                        {new Date(applicant.appliedDate).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Educación</h3>
                      <p className="text-gray-700">{applicant.education}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Experiencia</h3>
                      <ul className="list-disc pl-5 text-gray-700">
                        {applicant.experience.map((exp, index) => (
                          <li key={index} className="mb-1">{exp}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Habilidades</h3>
                      <div className="flex flex-wrap gap-2">
                        {applicant.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Columna derecha - Detalles y progreso */}
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">Resumen del candidato</h2>
                  <p className="text-gray-700 mb-6">{applicant.resume}</p>
                  
                  {applicant.notes && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h3 className="font-semibold text-gray-800 mb-2">Notas</h3>
                      <p className="text-gray-700">{applicant.notes}</p>
                    </div>
                  )}
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">Historial del proceso</h2>
                  <div className="space-y-4">
                    {applicant.statusHistory.map((history, index) => (
                      <div key={index} className="flex items-start">
                        <div 
                          className="w-3 h-3 rounded-full mt-1.5 mr-3"
                          style={{ backgroundColor: statuses.find(s => s.name === history.status)?.color || '#9CA3AF' }}
                        ></div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <p className="font-medium">{history.status}</p>
                            <p className="text-gray-500 text-sm">
                              {new Date(history.date).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">
                            {statuses.find(s => s.name === history.status)?.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Acciones disponibles */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Acciones rápidas</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="btn btn-outline">
                      Programar entrevista
                    </button>
                    <button className="btn btn-outline">
                      Enviar mensaje
                    </button>
                    <Link to={`/tracking`} className="btn btn-outline">
                      Ver seguimiento
                    </Link>
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

export default ApplicantDetail;