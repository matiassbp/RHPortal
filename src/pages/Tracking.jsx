import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaBusinessTime,
    FaDownload, FaArrowLeft, FaAngleRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import StatusStepper from '../components/StatusStepper';
import { applicants } from '../data/applicants';
import { vacancies } from '../data/vacancies';
import { statuses } from '../data/statuses';

const Tracking = () => {
    const { id } = useParams();
    const [applicant, setApplicant] = useState(null);
    const [vacancy, setVacancy] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular carga de datos
        setLoading(true);
        setTimeout(() => {
            const foundApplicant = applicants.find(a => a.id === parseInt(id)) ||
                applicants[0]; // Fallback a primer aplicante si no se encuentra
            setApplicant(foundApplicant);

            const foundVacancy = vacancies.find(v => v.id === foundApplicant.vacancyId);
            setVacancy(foundVacancy);

            setLoading(false);
        }, 500);
    }, [id]);

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

    // Función para obtener los pasos del proceso
    const getProcessSteps = () => {
        // Obtenemos los estados por los que ha pasado el aplicante
        const applicantSteps = applicant.statusHistory.map(history => ({
            name: history.status,
            date: history.date,
            completed: true,
            current: history.status === applicant.status
        }));

        // Obtenemos todos los estados posibles ordenados
        const allSteps = statuses
            .sort((a, b) => a.order - b.order)
            .map(status => ({
                name: status.name,
                description: status.description,
                color: status.color,
                order: status.order,
                completed: applicantSteps.some(step => step.name === status.name),
                current: applicant.status === status.name,
                date: applicantSteps.find(step => step.name === status.name)?.date || null
            }));

        return allSteps;
    };

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
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2 text-blue-200" />
                                    <span>Aplicó el {new Date(applicant.appliedDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
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
                                <FaAngleRight className="ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    {/* Columna izquierda - Información del candidato */}
                    <div className="md:col-span-1">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">Resumen del candidato</h2>
                            <p className="text-gray-700 mb-4">{applicant.resume}</p>

                            <h3 className="font-semibold text-gray-800 mb-2">Educación</h3>
                            <p className="text-gray-700 mb-4">{applicant.education}</p>

                            <h3 className="font-semibold text-gray-800 mb-2">Experiencia</h3>
                            <ul className="list-disc pl-5 text-gray-700 mb-4">
                                {applicant.experience.map((exp, index) => (
                                    <li key={index} className="mb-1">{exp}</li>
                                ))}
                            </ul>

                            <h3 className="font-semibold text-gray-800 mb-2">Habilidades</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
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

                    {/* Columna derecha - Progreso del proceso */}
                    <div className="md:col-span-2">
                        <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">Seguimiento del proceso</h2>

                        {/* Timeline de estados */}
                        <div className="mb-8">
                            <StatusStepper currentStatus={applicant.status} statusHistory={applicant.statusHistory} />
                        </div>

                        {/* Historial de estados */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-gray-800 mb-3">Historial detallado</h3>
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
                            <h3 className="font-semibold text-gray-800 mb-3">Acciones</h3>
                            <div className="flex flex-wrap gap-2">
                                <button className="btn btn-outline">
                                    Programar entrevista
                                </button>
                                <button className="btn btn-outline">
                                    Enviar mensaje
                                </button>
                                <button className="btn btn-outline">
                                    Actualizar estado
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Tracking;