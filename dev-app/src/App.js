import { HashRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Developing from "./Components/Pages/Developing";
import Homepage from "./Components/Pages/Hompage";
import Business from "./Components/Pages/Business";
import BostonBusiness from "./Components/Pages/BostonBusiness";


function App() {
    return (
      <div>
        <HashRouter>
          <div className="App">
            <br />
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/business' element={<BostonBusiness />} />
            </Routes>
          </div>
        </HashRouter>
      </div>
    );
  }
/* 
const BostonE = () => {
  return Developing("/se-bpda-main-streets/business", "/se-bpda-main-streets/employment", "/se-bpda-main-streets/spending");
}
const BostonS = () => {
  return Developing("/se-bpda-main-streets/business", "/se-bpda-main-streets/employment", "/se-bpda-main-streets/spending");
}
//
const BrightonB = () => {
  return Business('http://35.168.164.33:5000/brighton', 'Brighton', [42.35, -71.16], 15, "/se-bpda-main-streets/brighton", "/se-bpda-main-streets/brighton/employment", "/se-bpda-main-streets/brighton/spending");
}
const BrightonE = () => {
  return Developing("/se-bpda-main-streets/brighton", "/se-bpda-main-streets/brighton/employment", "/se-bpda-main-streets/brighton/spending");
}
const BrightonS = () => {
  return Developing("/se-bpda-main-streets/brighton", "/se-bpda-main-streets/brighton/employment", "/se-bpda-main-streets/brighton/spending");
}
const ChinatownB = () => {
  return Business('http://35.168.164.33:5000/chinatown', 'Chinatown', [42.3515, -71.061], 17, "/se-bpda-main-streets/chinatown", "/se-bpda-main-streets/chinatown/employment", "/se-bpda-main-streets/chinatown/spending");
}
const ChinatownE = () => {
  return Developing("/se-bpda-main-streets/chinatown", "/se-bpda-main-streets/chinatown/employment", "/se-bpda-main-streets/chinatown/spending");
}
const ChinatownS = () => {
  return Developing("/se-bpda-main-streets/chinatown", "/se-bpda-main-streets/chinatown/employment", "/se-bpda-main-streets/chinatown/spending");
} */

export default App;
