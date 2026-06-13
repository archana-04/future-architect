import { Navigate, Route, Routes } from 'react-router-dom';
import { FutureProvider } from './context/FutureContext';
import { Home } from './pages/Home';
import { Results } from './pages/Results';

export function App() {
  return (
    <FutureProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FutureProvider>
  );
}

export default App;
