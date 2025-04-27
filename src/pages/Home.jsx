import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaUserTie, FaFileAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';
import DashboardWidget from '../components/DashboardWidget';
import { statusStats, departmentStats, timeToHire } from '../data/statuses';
import { vacancies } from '../data/vacancies';
import { applicants } from '../data/applicants';

const Home = () => {
  const [activeVacancies, setActiveVacancies] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [recentHires, setRecentHires] = useState(0);
  const [interviewScheduled, setInterviewScheduled] = useState(0);
  
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#EF4444'];
  
  useEffect(() => {
    // Calculate dashboard stats
    setActiveVacancies(vacancies.filter(vacancy => vacancy.status === 'Activa').length);
    setTotalApplicants(applicants.length);
    setRecentHires(applicants.filter(applicant => applicant.status === 'Contratado').length);
    setInterviewScheduled(applicants.filter(applicant => 
      ['Entrevista RRHH', 'Entrevista técnica', 'Entrevista con gerencia', 'Entrevista final'].includes(applicant.status)
    ).length);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Resumen de actividad de reclutamiento</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/vacancies" className="btn btn-primary">
            Nueva vacante 
          </Link>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardWidget 
          title="Vacantes activas" 
          value={activeVacancies} 
          icon={<FaFileAlt size={24} />} 
          color="#3B82F6" 
          percentage="5" 
          trend="up" 
        />
        <DashboardWidget 
          title="Total postulantes" 
          value={totalApplicants} 
          icon={<FaUserTie size={24} />} 
          color="#10B981" 
          percentage="12" 
          trend="up" 
        />
        <DashboardWidget 
          title="Entrevistas programadas" 
          value={interviewScheduled} 
          icon={<FaChartLine size={24} />} 
          color="#8B5CF6" 
          percentage="3" 
          trend="down" 
        />
        <DashboardWidget 
          title="Contrataciones recientes" 
          value={recentHires} 
          icon={<FaCheckCircle size={24} />} 
          color="#F59E0B" 
          percentage="8" 
          trend="up" 
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Estado de postulaciones</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} postulantes`, 'Cantidad']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Postulantes por departamento</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" name="Postulantes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Time to Hire Trend */}
      <div className="card mb-8">
        <h2 className="text-lg font-semibold mb-4">Tiempo promedio de contratación</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={timeToHire}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} días`, 'Tiempo promedio']} />
              <Line type="monotone" dataKey="días" stroke="#8B5CF6" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Actividad reciente</h2>
        <div className="space-y-4">
          {applicants.slice(0, 5).map((applicant) => (
            <div 
              key={applicant.id} 
              className="flex items-center p-3 rounded-lg transition-colors hover:bg-gray-50"
            >
              <img 
                src={applicant.avatar} 
                alt={applicant.name} 
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div className="flex-1">
                <h4 className="font-medium">{applicant.name}</h4>
                <p className="text-sm text-gray-500">
                  {applicant.status} - {applicant.position}
                </p>
              </div>
              <Link to={`/applicants/${applicant.id}`} className="text-primary hover:text-primary/80">
                <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link to="/applicants" className="text-primary hover:text-primary/80 font-medium text-sm">
            Ver todos los postulantes
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;