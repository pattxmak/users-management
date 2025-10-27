import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Profile from './pages/Profile';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import Registration from './pages/Registration';
import Navbar from './components/Navbar';
import UserService from './services/UserService';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/profile" element={<Profile />} />

        {UserService.adminOnly() &&
          <>
            <Route path="/admin/user-management" element={<UserManagement />} />
            {/* <Route path="/register" element={<Registration />} /> */}
            {/* <Route path="/users/:userId" element={<UpdateUser />} /> */}
            {/* <Route path="/users/:userId" element={<UpdateUserPage />} /> */}
          </>
        }

      </Routes>
    </Router>
  )
}

export default App
