import UserData from './pages/UserData'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MedicalDevice from './pages/MedicalDevice';
import AddDevice from './pages/AddDevice';

import './css/App.css'

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserData />} />
        <Route path='/medical-device' element={<MedicalDevice />} />
        <Route path='/add-device' element={<AddDevice />} />
      </Routes>
    </Router>
  );
}

