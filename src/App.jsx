import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Commande from './pages/Commande/Commande.jsx';
import PreviewPoster from './pages/PreviewPoster/PreviewPoster.jsx';

// Home (vitrine) sur "/" et formulaire de commande sur "/commande".
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/commande" element={<Commande />} />
      {/* Route de preview dev (non publique) : calibrage design du poster. */}
      <Route path="/preview-poster" element={<PreviewPoster />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
