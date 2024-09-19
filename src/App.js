import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MedicalDevice from './pages/MedicalDevice';
import Hospital from './pages/Hospital';
import './css/App.css'

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Hospital />} />
        <Route path='/medical-device' element={<MedicalDevice />} />
      </Routes>
    </Router>
  );
}