import React from 'react';
import './App.css';
import Footer from './Layouts/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Layouts/Header/Header';
import Main from './Layouts/Main/Main';

function App() {
  return (
    <div className='App'>
      <header className='border-bottom p-3 bg-primary text-white'><Header></Header></header>
      <main className='py-3 flex-fill'><Main></Main></main>
      <footer className='fixed-bottom p-3 border-top bg-primary text-white'><Footer></Footer></footer>
    </div>
  );
}

export default App;
