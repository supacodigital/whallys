import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Commande from './pages/Commande/Commande.jsx';

// Home (vitrine) sur "/" et formulaire de commande sur "/commande".
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/commande" element={<Commande />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
