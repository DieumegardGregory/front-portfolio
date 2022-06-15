import { Routes, Route } from 'react-router-dom';
import LoginModule from './1.Admin/components/LoginModule/LoginModule';
import Admin from './1.Admin/Admin';
import ExperiencesBoard from './1.Admin/components/ExperiencesBoard/ExperiencesBoard';
import FormationsBoard from './1.Admin/components/FormationsBoard/FormationsBoard';
import HardskillsBoard from './1.Admin/components/HardskillsBoard/HardskillsBoard';
import SoftskillsBoard from './1.Admin/components/SoftskillsBoard/SofskillsBoard';
import InformationsBoard from './1.Admin/components/InformationsBoard/InformationsBoard';
import ProjectsBoard from './1.Admin/components/ProjectsBoard/ProjectsBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginModule />} />
        <Route path="/admin/:id" element={<Admin />} />
        <Route path="/admin/experiences" element={<ExperiencesBoard />} />
        <Route path="/admin/formations" element={<FormationsBoard />} />
        <Route path="/admin/hardskills" element={<HardskillsBoard />} />
        <Route path="/admin/softskills" element={<SoftskillsBoard />} />
        <Route path="/admin/informations" element={<InformationsBoard />} />
        <Route path="/admin/projects" element={<ProjectsBoard />} />
      </Routes>
    </div>
  );
}

export default App;
