import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Account from './pages/account';
import FindSmoothies from './pages/find_smoothies';
import Favorites from './pages/favorites';
  
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/account' component={Account} />
        <Route path='/find_smoothies' component={FindSmoothies} />
        <Route path='/favorites' component={Favorites} />
      </Routes>
    </Router>
  );
}
  
export default App;