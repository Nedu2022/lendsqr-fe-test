import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import UserDetails from './pages/UserDetails/UserDetails';
import './styles/variables.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/dashboard/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
};

export default App;