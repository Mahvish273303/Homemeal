import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar.jsx';
import Footer from './components/footer.jsx';

import HomePage from './pages/HomePage.jsx';
import Process from './pages/Process.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Meals from './pages/Meals.jsx';
import MealDetail from './pages/MealDetail.jsx';
import Dashboard from './pages/Dashboard.jsx';

function AppContent() {
  const location = useLocation();
  const hideFooter = ['/dashboard', '/login', '/register'].includes(location.pathname);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/process" element={<Process />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/meals/:id" element={<MealDetail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
