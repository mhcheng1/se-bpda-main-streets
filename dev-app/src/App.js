import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from 'react';
import Developing from "./Components/Pages/Developing";
import Homepage from "./Components/Pages/Hompage";
import Business from "./Components/Pages/Business";
import BostonBusiness from "./Components/Pages/BostonBusiness";
import Employment from "./Components/Pages/Employment";
import Spending from "./Components/Pages/Spending"


function App() {
  //This is temporary (only Boston)
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
    return Spending("/se-bpda-main-streets/chinatown", "/se-bpda-main-streets/chinatown/employment", "/se-bpda-main-streets/chinatown/spending");
  }

  const WashingtonGateWayB = () => {
    return Business('http://35.168.164.33:5000/washingtongateway', 'Washington Gateway', [42.34, -71.07], 15, "/se-bpda-main-streets/washingtongateway", "/se-bpda-main-streets/washingtongateway/employment", "/se-bpda-main-streets/washingtongateway/spending");
  } 
  const WashingtonGateWaynE = () => {
    return Employment('http://35.168.164.33:5000/washingtongateway/employment', 'Washington Gateway', [42.34, -71.07], 15, "/se-bpda-main-streets/washingtongateway", "/se-bpda-main-streets/washingtongateway/employment", "/se-bpda-main-streets/washingtongateway/spending");
  }
  const WashingtonGateWayS = () => {
    return Spending('http://35.168.164.33:5000/washingtongateway/spending', 'Washington Gateway', [42.34, -71.07], 15, "/se-bpda-main-streets/washingtongateway", "/se-bpda-main-streets/washingtongateway/employment", "/se-bpda-main-streets/washingtongateway/spending");
  }

  return (
    <div>
      <Router>
        <br />
        <Routes>
            <Route path='/se-bpda-main-streets/' element={<Homepage/>} />
            <Route path='/se-bpda-main-streets/business' element={<BostonBusiness/>} />
            <Route path='/se-bpda-main-streets/employment' element={<BostonE/>} />
            <Route path='/se-bpda-main-streets/spending' element={<BostonS/>} />
            <Route path='/se-bpda-main-streets/brighton' element={<BrightonB/>} />
            <Route path='/se-bpda-main-streets/brighton/employment' element={<BrightonE/>} />
            <Route path='/se-bpda-main-streets/brighton/spending' element={<BrightonS/>} />
            <Route path='/se-bpda-main-streets/chinatown' element={<ChinatownB/>} />
            <Route path='/se-bpda-main-streets/chinatown/employment' element={<ChinatownE/>} />
            <Route path='/se-bpda-main-streets/chinatown/spending' element={<ChinatownS/>} />
            <Route path='/se-bpda-main-streets/washingtongateway' element={<WashingtonGateWayB/>} />
            <Route path='/se-bpda-main-streets/washingtongateway/employment' element={<WashingtonGateWaynE/>} />
            <Route path='/se-bpda-main-streets/washingtongateway/spending' element={<WashingtonGateWayS/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
