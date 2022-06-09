import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './shared/components/header/Header';
import Footer from './shared/components/footer/Footer';
import Main from './shared/components/main/Main';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='App'>
      <header className='border-bottom p-3 bg-primary text-white'><Header></Header></header>
      <main className='py-3 flex-fill'><Main></Main></main>
      <footer className='fixed-bottom p-3 border-top bg-primary text-white'><Footer></Footer></footer>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
