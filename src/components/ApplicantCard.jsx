import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaEye, FaEnvelope } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ApplicantCard = ({ applicant, statusColor, vacancyTitle }) => {
  // Calcular tiempo desde la aplicación
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const appliedDate = new Date(dateString);
    const diffTime = Math.abs(now - appliedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="p-5">
        <div className="flex items-center">
          <img 
            src={applicant.avatar} 
            alt={applicant.name} 
            className="w-14 h-14 rounded-full object-cover mr-4"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">{applicant.name}</h3>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3">
              <span className="text-gray-600 text-sm">{applicant.position}</span>
              <span 
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: statusColor }}
              ></span>
              <span className="text-gray-600 text-sm">{applicant.status}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <FaCalendarAlt className="mr-2" />
            <span>Aplicó {getTimeAgo(applicant.appliedDate)}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <span className="truncate flex-1">{vacancyTitle}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <a href={`mailto:${applicant.email}`} className="text-gray-500 hover:text-gray-700">
            <FaEnvelope />
          </a>
          
          <Link 
            to={`/tracking/${applicant.id}`}
            className="btn btn-sm btn-primary"
          >
             Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
};

ApplicantCard.propTypes = {
  applicant: PropTypes.object.isRequired,
  statusColor: PropTypes.string,
  vacancyTitle: PropTypes.string
};

ApplicantCard.defaultProps = {
  statusColor: '#9CA3AF',
  vacancyTitle: 'Posición no especificada'
};

export default ApplicantCard;