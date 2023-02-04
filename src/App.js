import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Landing from './pages/landing/Landing';
import PersonalInformation from './pages/personalInformation/PersonalInformation'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/personalInformation' element={<PersonalInformation />} />
      </Routes>
    </>
  );
}

export default App;
