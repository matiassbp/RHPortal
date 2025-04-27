import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">RH</span>
              <span className="text-xl font-bold text-white">Portal</span>
            </div>
            <p className="text-gray-400 mt-2">
              Simplificando la gestión de talento
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex space-x-4 mb-4 md:mb-0 md:mr-8">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaEnvelope size={20} />
              </a>
            </div>
            
            <p className="text-gray-400 text-sm">
              © {currentYear} RH Portal. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;