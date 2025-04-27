import { motion } from 'framer-motion';

const DashboardWidget = ({ title, value, icon, color, percentage, trend }) => {
  return (
    <motion.div 
      className="card p-4"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
      </div>

      {percentage && (
        <div className="mt-4 flex items-center">
          <span 
            className={`text-sm font-medium ${
              trend === 'up'
                ? 'text-green-600'
                : trend === 'down'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '='} {percentage}%
          </span>
          <span className="text-gray-400 text-xs ml-2">desde el mes pasado</span>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardWidget;