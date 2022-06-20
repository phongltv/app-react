import React from 'react';
import './App.css';
import Footer from './Layouts/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Layouts/Header/Header';
import Main from './Layouts/Main/Main';
import Menu from './Layouts/Menu/Menu';
import ReactDOM from 'react-dom';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import BookDetail from './Pages/BookDetail/BookDetail';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
function App() {
  // const main = ReactDOM.createPortal(<BookDetail />,
  // document.getElementById('main') as HTMLElement,
  // );
  

  return (
    <div className='App'>
      <header className='bg-primary text-white'><Header></Header></header>
      <main className='d-flex flex-row'>
        <div className='menu'><Menu></Menu></div>
        <div  id='main'>

          <Outlet />

        </div>
      </main>
      <footer className='fixed-bottom p-3 bg-primary text-white'><Footer></Footer></footer>
    </div>
  );
}

export default App;
