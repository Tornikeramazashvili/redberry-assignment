import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import Landing from './pages/landing/Landing';
import PersonalInformation from './pages/personalInformation/PersonalInformation'
import PersonalExperience from './pages/personalExperience/PersonalExperience';
import PersonalEducation from './pages/personalEducation/PersonalEducation'
import PersonalResume from './pages/personalResume/PersonalResume'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/personalInformation' element={<PersonalInformation />} />
        <Route path='/personalExperience' element={<PersonalExperience />} />
        <Route path='/personalEducation' element={<PersonalEducation />} />
        <Route path='/personalResume' element={<PersonalResume />} />
      </Routes>
    </>
  );
}

export default App;
