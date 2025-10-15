import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LeftHandSidePane from './components/LeftHandSidePane';
import Calendar from './components/Calendar';

function Settings() {
  return <div>Ustawienia content here</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <LeftHandSidePane />
      <main style={{ marginLeft: 240, padding: 16, flex: 1 }}>
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/calendar" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
