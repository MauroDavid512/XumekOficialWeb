import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import UserBar from './components/UserBar';
import Nosotres from './components/Principal/Nosotres';
import Participa from './components/Principal/Participa';
import Trabajo from './components/Principal/Trabajo';
import Users from './components/Principal/Administracion/Users';
import ArticleDetail from './components/ArticleDetail';
import Home from './components/Home';
import Editor from './components/Editor'
import Cards from './components/Cards';
import SearchResult from './components/SearchResult';
import { useSelector } from 'react-redux';

import Sell from './components/Sell'
import { Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';

function App() {

  const { loggedIn, user} = useSelector(state => state)

  return (
    <div className="App">
      <NavBar />
      <div className='navSpace'></div>
      <div className='bigContainer'>
        {loggedIn? <UserBar/> : false}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/nosotres" element={<Nosotres />}></Route>
          <Route path="/participa" element={<Participa />}></Route>
          <Route path="/trabajo" element={<Trabajo />}></Route>
          <Route path="/admin" element={<AdminPanel/>}></Route>
          <Route path="/admin/:t" element={<AdminPanel/>}></Route>
          <Route path="/editor" element={<Editor/>}></Route>
          <Route path="/articles" element={<Cards/>}></Route>
          <Route path="/article/:id" element={<ArticleDetail/>}></Route>
          <Route path="/search_result" element={<SearchResult/>}></Route>
        </Routes>
      <div className='bottomSpace'></div>
      </div>


      <Sell />
    </div>
  );
}

export default App;
