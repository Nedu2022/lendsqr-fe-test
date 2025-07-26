import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
// import Dashboard from './pages/Dashboard/Dashboard';
import './styles/App.module.scss';
import './styles/variables.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
