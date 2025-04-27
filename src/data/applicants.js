export const applicants = [
    {
      id: 1,
      name: "Laura Martínez",
      email: "laura.martinez@email.com",
      phone: "555-123-4567",
      position: "UX/UI Designer",
      appliedDate: "2025-04-18",
      status: "Entrevista técnica",
      avatar: "https://i.pravatar.cc/150?img=1",
      resume: "Laura es una diseñadora UX/UI con 4 años de experiencia, especializada en interfaces de usuario intuitivas y accesibles.",
      skills: ["Figma", "Adobe XD", "User Research", "Wireframing", "Prototyping"],
      education: "Licenciatura en Diseño Digital, Universidad de Barcelona",
      experience: [
        "Senior UX Designer en TechCorp (2023-presente)",
        "UI Designer en Digital Solutions (2021-2023)"
      ],
      statusHistory: [
        { status: "Aplicado", date: "2025-04-18" },
        { status: "Revisión CV", date: "2025-04-20" },
        { status: "Entrevista RRHH", date: "2025-04-22" },
        { status: "Entrevista técnica", date: "2025-04-25" }
      ],
      vacancyId: 1
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      phone: "555-234-5678",
      position: "Frontend Developer",
      appliedDate: "2025-04-15",
      status: "Oferta",
      avatar: "https://i.pravatar.cc/150?img=11",
      resume: "Carlos es un desarrollador frontend con 3 años de experiencia en React y frameworks modernos de JavaScript.",
      skills: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Redux"],
      education: "Ingeniería en Sistemas, Universidad Tecnológica",
      experience: [
        "Frontend Developer en WebSolutions (2023-presente)",
        "Junior Developer en CodeCraft (2022-2023)"
      ],
      statusHistory: [
        { status: "Aplicado", date: "2025-04-15" },
        { status: "Revisión CV", date: "2025-04-16" },
        { status: "Entrevista RRHH", date: "2025-04-18" },
        { status: "Entrevista técnica", date: "2025-04-20" },
        { status: "Challenge técnico", date: "2025-04-22" },
        { status: "Entrevista final", date: "2025-04-24" },
        { status: "Oferta", date: "2025-04-26" }
      ],
      vacancyId: 2
    },
    {
      id: 3,
      name: "Ana Gómez",
      email: "ana.gomez@email.com",
      phone: "555-345-6789",
      position: "HR Business Partner",
      appliedDate: "2025-04-10",
      status: "Contratado",
      avatar: "https://i.pravatar.cc/150?img=5",
      resume: "Ana es una profesional de RRHH con 7 años de experiencia en empresas multinacionales.",
      skills: ["Talent Acquisition", "Employee Relations", "Performance Management", "Compensation & Benefits"],
      education: "Máster en Dirección de RRHH, Universidad Complutense",
      experience: [
        "HR Manager en GlobalTech (2022-presente)",
        "HR Business Partner en Innovate Inc (2020-2022)",
        "HR Generalist en ServicePro (2018-2020)"
      ],
      statusHistory: [
        { status: "Aplicado", date: "2025-04-10" },
        { status: "Revisión CV", date: "2025-04-11" },
        { status: "Entrevista RRHH", date: "2025-04-13" },
        { status: "Entrevista con gerencia", date: "2025-04-15" },
        { status: "Entrevista final", date: "2025-04-17" },
        { status: "Oferta", date: "2025-04-19" },
        { status: "Contratado", date: "2025-04-22" }
      ],
      vacancyId: 3
    },
    {
      id: 4,
      name: "Miguel Fernández",
      email: "miguel.fernandez@email.com",
      phone: "555-456-7890",
      position: "Product Manager",
      appliedDate: "2025-04-08",
      status: "Rechazado",
      avatar: "https://i.pravatar.cc/150?img=8",
      resume: "Miguel es un Product Manager con experiencia en productos digitales y metodologías ágiles.",
      skills: ["Product Strategy", "Agile", "Scrum", "User Stories", "Market Research"],
      education: "MBA en Gestión de Productos, ESADE Business School",
      experience: [
        "Product Manager en SoftwareX (2021-presente)",
        "Associate Product Manager en AppDev (2019-2021)"
      ],
      statusHistory: [
        { status: "Aplicado", date: "2025-04-08" },
        { status: "Revisión CV", date: "2025-04-09" },
        { status: "Entrevista RRHH", date: "2025-04-11" },
        { status: "Entrevista técnica", date: "2025-04-14" },
        { status: "Rechazado", date: "2025-04-16" }
      ],
      vacancyId: 4
    },
    {
      id: 5,
      name: "Sofía López",
      email: "sofia.lopez@email.com",
      phone: "555-567-8901",
      position: "Data Analyst",
      appliedDate: "2025-04-05",
      status: "Challenge técnico",
      avatar: "https://i.pravatar.cc/150?img=3",
      resume: "Sofía es una analista de datos con experiencia en SQL, Python y visualización de datos.",
      skills: ["SQL", "Python", "Tableau", "Power BI", "Excel Avanzado", "R"],
      education: "Licenciatura en Estadística, Universidad Autónoma",
      experience: [
        "Data Analyst en DataCorp (2022-presente)",
        "Business Analyst en InfoTech (2021-2022)"
      ],
      statusHistory: [
        { status: "Aplicado", date: "2025-04-05" },
        { status: "Revisión CV", date: "2025-04-07" },
        { status: "Entrevista RRHH", date: "2025-04-10" },
        { status: "Entrevista técnica", date: "2025-04-15" },
        { status: "Challenge técnico", date: "2025-04-20" }
      ],
      vacancyId: 5
    },
    {
      id: 6,
      name: "Javier Torres",
      email: "javier.torres@email.com",
      phone: "555-678-9012",
      position: "Marketing Specialist",
      appliedDate: "2025-04-02",
      status: "Contratado",
      avatar: "https://i.pravatar.cc/150?img=12",
      resume: "Javier es un especialista en marketing digital con enfoque en campañas de redes sociales y SEO.",
      skills: ["Social Media Marketing", "SEO", "Content Marketing", "Email Marketing", "Google Analytics"],
      education: "Licenciatura en Marketing, ESIC Business School",
      experience: [
        "Digital Marketing Specialist en MarketPro (2023-presente)",
        "Social Media Manager en MediaGroup (2021-2023)"
      ],
      statusHistory: [
        { status: "Aplicado", date: "2025-04-02" },
        { status: "Revisión CV", date: "2025-04-03" },
        { status: "Entrevista RRHH", date: "2025-04-05" },
        { status: "Entrevista con gerencia", date: "2025-04-08" },
        { status: "Entrevista final", date: "2025-04-10" },
        { status: "Oferta", date: "2025-04-12" },
        { status: "Contratado", date: "2025-04-15" }
      ],
      vacancyId: 6
    }
  ];