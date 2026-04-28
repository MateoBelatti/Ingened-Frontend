import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { AuthPage } from './pages/auth.page';
import HomePage from './pages/home.page';
import InformeLP from './pages/informePL';
function App() {

  return (
    <>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/liquidosPenetrantes" element={<InformeLP />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
