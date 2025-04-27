import { useState } from 'react';
import { FaFileAlt, FaSearch, FaComments, FaCode, FaTasks, FaUserTie, FaHandshake, FaFileSignature, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const StatusStepper = ({ currentStatus, statusHistory }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const statusIcons = {
    'Aplicado': <FaFileAlt />,
    'Revisión CV': <FaSearch />,
    'Entrevista RRHH': <FaComments />,
    'Entrevista técnica': <FaCode />,
    'Challenge técnico': <FaTasks />,
    'Entrevista con gerencia': <FaUserTie />,
    'Entrevista final': <FaHandshake />,
    'Oferta': <FaFileSignature />,
    'Contratado': <FaCheckCircle />,
    'Rechazado': <FaTimesCircle />
  };
  
  const statusColors = {
    'Aplicado': '#9CA3AF',
    'Revisión CV': '#3B82F6',
    'Entrevista RRHH': '#60A5FA',
    'Entrevista técnica': '#8B5CF6',
    'Challenge técnico': '#6366F1',
    'Entrevista con gerencia': '#EC4899',
    'Entrevista final': '#F59E0B',
    'Oferta': '#10B981',
    'Contratado': '#059669',
    'Rechazado': '#EF4444'
  };
  
  const getStatusColor = (status) => statusColors[status] || '#9CA3AF';
  
  // Sort status history by date
  const sortedHistory = [...statusHistory].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );
  
  // Status for the stepper
  const commonStatuses = [
    'Aplicado',
    'Revisión CV',
    'Entrevista RRHH',
    'Entrevista técnica',
    'Oferta',
    'Contratado'
  ];
  
  // Check if current status is in common statuses, otherwise use special rendering
  const isSpecialStatus = !commonStatuses.includes(currentStatus);
  const isRejected = currentStatus === 'Rechazado';
  
  // Find current status index
  const currentStatusIndex = sortedHistory.findIndex(s => s.status === currentStatus);
  
  // Function to format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Estado de postulación</h3>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          {showDetails ? 'Ver resumen' : 'Ver detalles'}
        </button>
      </div>
      
      {!showDetails ? (
        // Simple stepper for common statuses
        <div className="relative">
          {/* Progress bar */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded">
            <motion.div 
              className="h-full rounded" 
              style={{ 
                backgroundColor: getStatusColor(currentStatus),
                width: isRejected ? '50%' : `${Math.min(100, (currentStatusIndex / (commonStatuses.length - 1)) * 100)}%`
              }}
              initial={{ width: 0 }}
              animate={{ width: isRejected ? '50%' : `${Math.min(100, (currentStatusIndex / (commonStatuses.length - 1)) * 100)}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          
          {/* Steps */}
          <div className="flex justify-between relative">
            {commonStatuses.map((status, index) => {
              const isPast = sortedHistory.some(s => s.status === status);
              const isCurrent = status === currentStatus;
              
              // Skip future steps if rejected
              if (isRejected && !isPast && !isCurrent) {
                return null;
              }
              
              return (
                <div 
                  key={status}
                  className="flex flex-col items-center"
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      isPast || isCurrent 
                        ? 'bg-white border-2 shadow-md' 
                        : 'bg-gray-200'
                    }`}
                    style={{ 
                      borderColor: (isPast || isCurrent) ? getStatusColor(isCurrent ? status : sortedHistory[currentStatusIndex].status) : 'transparent',
                      color: (isPast || isCurrent) ? getStatusColor(isCurrent ? status : sortedHistory[currentStatusIndex].status) : '#9CA3AF'
                    }}
                  >
                    {statusIcons[status] || <FaFileAlt />}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${
                    isPast || isCurrent ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {status}
                  </span>
                </div>
              );
            })}
            
            {/* Special rejected status */}
            {isRejected && (
              <div 
                className="flex flex-col items-center absolute" 
                style={{ right: '25%' }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center z-10 bg-white border-2 shadow-md"
                  style={{ borderColor: getStatusColor('Rechazado'), color: getStatusColor('Rechazado') }}
                >
                  <FaTimesCircle />
                </div>
                <span className="mt-2 text-xs font-medium text-gray-700">
                  Rechazado
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Detailed timeline
        <div className="mt-4 space-y-4">
          {sortedHistory.map((step, index) => (
            <motion.div 
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-white shadow-md"
                style={{ color: getStatusColor(step.status) }}
              >
                {statusIcons[step.status] || <FaFileAlt />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold" style={{ color: getStatusColor(step.status) }}>
                    {step.status}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(step.date)}
                  </span>
                </div>
                {index < sortedHistory.length - 1 && (
                  <div className="ml-5 h-6 border-l-2 border-dashed my-1" style={{ borderColor: 'rgba(156, 163, 175, 0.5)' }}></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusStepper;