import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import { AuthPage } from './pages/auth.page';
import HomePage from './pages/home.page';
import InformeLP from './pages/informePL';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {

  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            <Route path="/liquidosPenetrantes" element={
                <ProtectedRoute>
                  <InformeLP />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}


export default App
