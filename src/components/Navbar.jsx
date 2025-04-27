import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaBriefcase, 
  FaUsers, 
  FaChartLine, 
  FaBars, 
  FaTimes
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { to: '/', text: 'Inicio', icon: <FaHome className="mr-2" /> },
    { to: '/vacancies', text: 'Vacantes', icon: <FaBriefcase className="mr-2" /> },
    { to: '/applicants', text: 'Postulantes', icon: <FaUsers className="mr-2" /> },
    { to: '/tracking', text: 'Seguimiento', icon: <FaChartLine className="mr-2" /> },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">RH</span>
            <span className="text-2xl font-bold text-dark">Portal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center text-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-gray-600 hover:text-primary'
                  }`
                }
              >
                {link.icon}
                {link.text}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-primary focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white px-4 py-2 shadow-inner"
        >
          <div className="flex flex-col space-y-4 py-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center py-2 px-3 rounded-lg ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                {link.icon}
                {link.text}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;