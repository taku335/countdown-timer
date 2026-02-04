import { HashRouter, Route, Routes } from 'react-router-dom';
import Timer from './pages/Timer.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Timer />} />
      <Route path="/time" element={<Timer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>
);

export default App;
