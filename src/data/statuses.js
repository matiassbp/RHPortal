export const statuses = [
    {
      id: 1,
      name: "Aplicado",
      description: "Candidato ha enviado su aplicación",
      color: "#9CA3AF", // Gris
      icon: "FaFileAlt",
      order: 1
    },
    {
      id: 2,
      name: "Revisión CV",
      description: "Equipo de RRHH está evaluando el CV",
      color: "#3B82F6", // Azul
      icon: "FaSearch",
      order: 2
    },
    {
      id: 3,
      name: "Entrevista RRHH",
      description: "Primera entrevista con Recursos Humanos",
      color: "#60A5FA", // Azul claro
      icon: "FaComments",
      order: 3
    },
    {
      id: 4,
      name: "Entrevista técnica",
      description: "Evaluación técnica con el equipo",
      color: "#8B5CF6", // Violeta
      icon: "FaCode",
      order: 4
    },
    {
      id: 5,
      name: "Challenge técnico",
      description: "Prueba práctica para evaluar habilidades",
      color: "#6366F1", // Índigo
      icon: "FaTasks",
      order: 5
    },
    {
      id: 6,
      name: "Entrevista con gerencia",
      description: "Entrevista con gerentes y líderes",
      color: "#EC4899", // Rosa
      icon: "FaUserTie",
      order: 6
    },
    {
      id: 7,
      name: "Entrevista final",
      description: "Última ronda de entrevistas",
      color: "#F59E0B", // Ámbar
      icon: "FaHandshake",
      order: 7
    },
    {
      id: 8,
      name: "Oferta",
      description: "Oferta laboral enviada al candidato",
      color: "#10B981", // Verde
      icon: "FaFileSignature",
      order: 8
    },
    {
      id: 9,
      name: "Contratado",
      description: "Candidato ha aceptado la oferta",
      color: "#059669", // Verde oscuro
      icon: "FaCheckCircle",
      order: 9
    },
    {
      id: 10,
      name: "Rechazado",
      description: "No seleccionado para continuar",
      color: "#EF4444", // Rojo
      icon: "FaTimesCircle",
      order: 10
    }
  ];
  
  // Datos para el dashboard
  export const statusStats = [
    { name: "Aplicados", value: 120 },
    { name: "En revisión", value: 45 },
    { name: "Entrevistas", value: 30 },
    { name: "Ofertas", value: 12 },
    { name: "Contratados", value: 8 },
    { name: "Rechazados", value: 25 }
  ];
  
  export const departmentStats = [
    { name: "Tecnología", value: 35 },
    { name: "Marketing", value: 22 },
    { name: "Producto", value: 27 },
    { name: "Ventas", value: 18 },
    { name: "RRHH", value: 10 },
    { name: "Finanzas", value: 8 }
  ];
  
  export const timeToHire = [
    { name: "Ene", días: 25 },
    { name: "Feb", días: 22 },
    { name: "Mar", días: 20 },
    { name: "Abr", días: 18 },
    { name: "May", días: 15 },
    { name: "Jun", días: 17 }
  ];