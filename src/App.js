import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Coins from './components/Coins/Coins';
import DetailsPage from './components/DetailsPage/DetailsPage';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Cart from './components/Cart/Cart';
import { addToLocalStorage } from './utilities/localStorageDb';
import useCoins from './hooks/useCoins';
import useCart from './hooks/useCart';
import Search from './components/Search/Search';
import Profile from './components/Profile/Profile';
import RequreAuth from './components/RequreAuth/RequreAuth';
import Contact from './components/Contact/Contact';

export const PathContext = React.createContext();

// bg-slate-800
function App() {
  const { pathname } = useLocation()
  const path = pathname;

  const [coins] = useCoins()
  const [crypto, setCrypto] = useCart(coins);

  let newCart = [];
  const addToCart = (selectedCoin) => {
    const exist = crypto.find(cryp => cryp.id === selectedCoin.id)
    if (exist) {
      const rest = crypto.filter(cryp => cryp.id !== selectedCoin.id)
      exist.quantity = exist.quantity + 1;
      newCart = [...rest, exist]
    }
    else {
      selectedCoin.quantity = 1;
      newCart = [...crypto, selectedCoin]
    }
    setCrypto(newCart);
    addToLocalStorage(selectedCoin.id)
  }


  return (
    <PathContext.Provider value={path}>
      <div className='App text-white min-h-[100vh]' style={pathname.includes('/home') || pathname.length <= 1 ? { backgroundColor: 'transparent' } : { backgroundColor: '#0f172a' }}>
        <Header crypto={crypto} />
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/home' element={<Home></Home>} />
          <Route path='/coins' element={<Coins addToCart={addToCart}></Coins>} />
          <Route path='/details/:id' element={<DetailsPage addToCart={addToCart}></DetailsPage>} />
          <Route path='/search' element={<Search addToCart={addToCart}></Search>} />
          <Route path='/contact' element={
            <RequreAuth>
              <Contact></Contact>
            </RequreAuth>
          } />
          <Route path='/cart' element={
            <RequreAuth>
              <Cart crypto={crypto}></Cart>
            </RequreAuth>
          } />
          <Route path='/profile' element={<Profile crypto={crypto}></Profile>} />
          <Route path='*' element={<PageNotFound></PageNotFound>} />
        </Routes>
      </div>
    </PathContext.Provider>
  );
}

export default App;
