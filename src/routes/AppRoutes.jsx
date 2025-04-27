import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Vacancies from '../pages/Vacancies';
import Applicants from '../pages/Applicants';
import Tracking from '../pages/Tracking';
import VacancyDetail from '../pages/VacancyDetail';
import ApplicantDetail from '../pages/ApplicantDetail';
import Layout from '../components/Layout';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="vacancies" element={<Vacancies />} />
          <Route path="vacancies/:id" element={<VacancyDetail />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="applicants/:id" element={<ApplicantDetail />} />
          <Route path="tracking" element={<Tracking />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;