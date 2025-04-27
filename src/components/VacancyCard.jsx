import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const VacancyCard = ({ vacancy }) => {
  const {
    id,
    title,
    department,
    location,
    type,
    salary,
    posted,
    applicants,
    status
  } = vacancy;

  // Format date
  const formattedDate = new Date(posted).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <motion.div 
      className="card hover:shadow-xl border border-gray-100 hover:border-primary/30 group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-4">{department}</p>
        </div>
        <div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === 'Activa' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-700'
          }`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-2 text-gray-400" />
          {location}
        </div>
        <div className="flex items-center text-gray-600">
          <FaClock className="mr-2 text-gray-400" />
          {type}
        </div>
        <div className="flex items-center text-gray-600">
          <FaMoneyBillWave className="mr-2 text-gray-400" />
          {salary}
        </div>
        <div className="flex items-center text-gray-600">
          <FaCalendarAlt className="mr-2 text-gray-400" />
          {formattedDate}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-gray-600">
          <FaUsers className="mr-2 text-gray-400" />
          <span>{applicants} postulantes</span>
        </div>
        <Link 
          to={`/vacancies/${id}`}
          className="btn btn-outline text-sm"
        >
          Ver detalles
        </Link>
      </div>
    </motion.div>
  );
};

export default VacancyCard;