import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddPost from './pages/AddPost';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<AddPost />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;