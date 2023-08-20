import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails';
import Header from './components/Header';
import DrawerNav from './components/DrawerNav';
import Footer from './components/Footer';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <DrawerNav />
      <Header />

      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coins/:id" element={<CoinDetails />} />
        <Route path='/search' element={<Search />} />
        <Route path="*" element={<Home />} />
        
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
