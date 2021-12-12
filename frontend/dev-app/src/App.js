import { HashRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Developing from "./Components/Pages/Developing";
import Homepage from "./Components/Pages/Hompage";
import Business from "./Components/Pages/Business";
import BostonBusiness from "./Components/Pages/BostonBusiness";
import Employment from "./Components/Pages/Employment";
import Spending from "./Components/Pages/Spending";


function App() {

  const BostonEmployment = () => {
    return Developing("#/business", "#/employment", "#/spending");
  }
  const BostonSpending = () => {
    return Developing("#/business", "#/employment", "#/spending");
  }

  const BrightonB = () => {
    return Business('https://se-bpda.buspark.io/brighton', 'Brighton', [42.35, -71.16], 15, "#/brighton", "#/brighton/employment", "#/brighton/spending");
  }
  const BrightonE = () => {
    return Developing("#/brighton", "#/brighton/employment", "#/brighton/spending");
  }
  const BrightonS = () => {
    return Developing("#/brighton", "#/brighton/employment", "#/brighton/spending");
  }

  const ChinatownB = () => {
    return Business('https://se-bpda.buspark.io/chinatown', 'Chinatown', [42.3515, -71.061], 17, "#/chinatown", "#/chinatown/employment", "#/chinatown/spending");
  }
  const ChinatownE = () => {
    return Developing("#/chinatown", "#/chinatown/employment", "#/chinatown/spending");
  }
  const ChinatownS = () => {
    return Developing("#/chinatown", "#/chinatown/employment", "#/chinatown/spending");
  }

  const WashingtonGatewayB = () => {
    return Business('https://se-bpda.buspark.io/washingtongateway', 'Washington Gateway', [42.34, -71.07], 15, "#/washingtongateway", "#/washingtongateway/employment", "#/washingtongateway/spending");
  }
  const WashingtonGatewayE = () => {
    return Employment('https://se-bpda.buspark.io/washingtongateway/employment', 'Washington Gateway', [42.34, -71.07], 15, "#/washingtongateway", "#/washingtongateway/employment", "#/washingtongateway/spending");
  }
  const WashingtonGatewayS = () => {
    return Spending('https://se-bpda.buspark.io/washingtongateway/spending', 'Washington Gateway', [42.34, -71.07], 15, "#/washingtongateway", "#/washingtongateway/employment", "#/washingtongateway/spending");
  }

    return (
      <div>
        <HashRouter>
          <div className="App">
            <br />
            <Routes>
              <Route path='/' element={<Homepage/>} />
              <Route path='/business' element={<BostonBusiness/>} />
              <Route path='/employment' element={<BostonEmployment/>} />
              <Route path='/spending' element={<BostonSpending/>} />

              <Route path='/brighton' element={<BrightonB/>} />
              <Route path='/brighton/employment' element={<BrightonE/>} />
              <Route path='/brighton/spending' element={<BrightonS/>} />

              <Route path='/chinatown' element={<ChinatownB/>} />
              <Route path='/chinatown/employment' element={<ChinatownE/>} />
              <Route path='/chinatown/spending' element={<ChinatownS/>} />

              <Route path='/washingtongateway' element={<WashingtonGatewayB/>} />
              <Route path='/washingtongateway/employment' element={<WashingtonGatewayE/>} />
              <Route path='/washingtongateway/spending' element={<WashingtonGatewayS/>} />
            </Routes>
          </div>
        </HashRouter>
      </div>
    );
  }

export default App;
