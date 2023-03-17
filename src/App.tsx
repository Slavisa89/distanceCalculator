import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './app/pages/Home/Home';
import { Result } from './app/pages/Result/Result';
 

function App() {
  return (
    <div className="container">
      <div className="white_conteiner">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/result' element={<Result />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
