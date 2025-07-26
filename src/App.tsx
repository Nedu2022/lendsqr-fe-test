import { Routes, Route, Navigate } from 'react-router-dom'
import './styles/App.module.scss'
import './styles/variables.scss'
import Login from './pages/Login'


function App() {
  return (
    <Routes>
       <Route path="/login" element={<Login />} />
      {/* <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate to="/login" />} />
      <Route path="/users/:id" element={isLoggedIn ? <UserDetails /> : <Navigate to="/login" />} /> */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default App
