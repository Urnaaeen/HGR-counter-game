import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './screens/mainPage';
import Page1 from './screens/learn';
import Page2 from './screens/think';
import Page3 from './screens/pathGame';
import PausePage from './screens/pause';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page1/pause" element={<PausePage />} />
      </Routes>
    </Router>
  );
}

export default App;
