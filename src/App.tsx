import React from 'react';
import './App.css';
import Footer from './Layouts/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Layouts/Header/Header';
import Main from './Layouts/Main/Main';
import Menu from './Layouts/Menu/Menu';

function App() {
  return (
    <div className='App'>
      <header className='bg-primary text-white'><Header></Header></header>
      <main className='d-flex flex-row'>
        <div className='menu'><Menu></Menu></div>
        <div className='main'><Main></Main></div>
      </main>
      <footer className='fixed-bottom p-3 bg-primary text-white'><Footer></Footer></footer>
    </div>
  );
}

export default App;
