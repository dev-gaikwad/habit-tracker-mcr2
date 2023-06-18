import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ArchivePage from './pages/Archive/ArchivePage';
import { HabitContextProvider } from './context/HabitContext';
import Details from './pages/Details/Details';

const App = () => {
  return (
    <>
      <Router>
        <HabitContextProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/archive' element={<ArchivePage />} />
            <Route path='/details/:title' element={<Details />} />
          </Routes>
        </HabitContextProvider>
      </Router>
    </>
  );
};

export default App;
