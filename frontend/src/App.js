import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import SignUp from './pages/signup';
import Contact from './pages/contact';
import AllSmoothies from './pages/allsmoothies';
import AddSmoothies from './pages/addsmoothies';
import Login from './pages/login';
import Favorites from './pages/favorites';
import Trending from './pages/trending';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/allsmoothies' element={<AllSmoothies />} /> 
        <Route path='/addsmoothies' element={<AddSmoothies />} /> 
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/trending' element={<Trending />} />
      </Routes>
    </Router>
  );
}

export default App;
