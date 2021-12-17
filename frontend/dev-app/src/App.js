import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Developing from "./Components/Pages/Developing";
import Homepage from "./Components/Pages/Hompage";
import Business from "./Components/Pages/Business";
import BostonBusiness from "./Components/Pages/BostonBusiness";
import Employment from "./Components/Pages/Employment";
import Spending from "./Components/Pages/Spending";

function App() {
  // Input:  None
  // Output: Routes to all the different pages in the app
  // Description: The routes are being manually set with HashRouter

  const BostonEmployment = () => {
    return Developing("#/business", "#/employment", "#/spending");
  };
  const BostonSpending = () => {
    return Developing("#/business", "#/employment", "#/spending");
  };
  const BrightonB = () => {
    return Business(
      "https://se-bpda.buspark.io/brighton",
      "Brighton",
      [42.35, -71.16],
      15,
      "#/brighton",
      "#/brighton/employment",
      "#/brighton/spending"
    );
  };
  const BrightonE = () => {
    return Developing(
      "#/brighton",
      "#/brighton/employment",
      "#/brighton/spending"
    );
  };
  const BrightonS = () => {
    return Developing(
      "#/brighton",
      "#/brighton/employment",
      "#/brighton/spending"
    );
  };
  const ChinatownB = () => {
    return Business(
      "https://se-bpda.buspark.io/chinatown",
      "Chinatown",
      [42.3515, -71.061],
      17,
      "#/chinatown",
      "#/chinatown/employment",
      "#/chinatown/spending"
    );
  };
  const ChinatownE = () => {
    return Developing(
      "#/chinatown",
      "#/chinatown/employment",
      "#/chinatown/spending"
    );
  };
  const ChinatownS = () => {
    return Developing(
      "#/chinatown",
      "#/chinatown/employment",
      "#/chinatown/spending"
    );
  };
  const FourCornersB = () => {
    return Business(
      "https://se-bpda.buspark.io/fourcorners",
      "Four Corners",
      [42.301, -71.0779],
      15.5,
      "#/fourcorners",
      "#/fourcorners/employment",
      "#/fourcorners/spending"
    );
  };
  const FourCornersE = () => {
    return Developing(
      "#/fourcorners",
      "#/fourcorners/employment",
      "#/fourcorners/spending"
    );
  };
  const FourCornersS = () => {
    return Developing(
      "#/fourcorners",
      "#/fourcorners/employment",
      "#/fourcorners/spending"
    );
  };
  const AllstonVillageB = () => {
    return Business(
      "https://se-bpda.buspark.io/allstonvillage",
      "Allston Village",
      [42.353, -71.134],
      15.5,
      "#/allstonvillage",
      "#/allstonvillage/employment",
      "#/allstonvillage/spending"
    );
  };
  const AllstonVillageE = () => {
    return Developing(
      "#/allstonvillage",
      "#/allstonvillage/employment",
      "#/allstonvillage/spending"
    );
  };
  const AllstonVillageS = () => {
    return Developing(
      "#/allstonvillage",
      "#/allstonvillage/employment",
      "#/allstonvillage/spending"
    );
  };
  const WashingtonGatewayB = () => {
    return Business(
      "https://se-bpda.buspark.io/washingtongateway",
      "Washington Gateway",
      [42.34, -71.07],
      15,
      "#/washingtongateway",
      "#/washingtongateway/employment",
      "#/washingtongateway/spending"
    );
  };
  const WashingtonGatewayE = () => {
    return Employment(
      "https://se-bpda.buspark.io/washingtongateway/employment",
      "Washington Gateway",
      [42.34, -71.07],
      15,
      "#/washingtongateway",
      "#/washingtongateway/employment",
      "#/washingtongateway/spending"
    );
  };
  const WashingtonGatewayS = () => {
    return Spending(
      "https://se-bpda.buspark.io/washingtongateway/spending",
      "Washington Gateway",
      [42.34, -71.07],
      15,
      "#/washingtongateway",
      "#/washingtongateway/employment",
      "#/washingtongateway/spending"
    );
  };

  return (
    <div>
      <HashRouter>
        <div className="App">
          <br />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/business" element={<BostonBusiness />} />
            <Route path="/employment" element={<BostonEmployment />} />
            <Route path="/spending" element={<BostonSpending />} />

            <Route path="/brighton" element={<BrightonB />} />
            <Route path="/brighton/employment" element={<BrightonE />} />
            <Route path="/brighton/spending" element={<BrightonS />} />

            <Route path="/chinatown" element={<ChinatownB />} />
            <Route path="/chinatown/employment" element={<ChinatownE />} />
            <Route path="/chinatown/spending" element={<ChinatownS />} />

            <Route path="/fourcorners" element={<FourCornersB />} />
            <Route path="/fourcorners/employment" element={<FourCornersE />} />
            <Route path="/fourcorners/spending" element={<FourCornersS />} />

            <Route path="/allstonvillage" element={<AllstonVillageB />} />
            <Route
              path="/allstonvillage/employment"
              element={<AllstonVillageE />}
            />
            <Route
              path="/allstonvillage/spending"
              element={<AllstonVillageS />}
            />

            <Route path="/washingtongateway" element={<WashingtonGatewayB />} />
            <Route
              path="/washingtongateway/employment"
              element={<WashingtonGatewayE />}
            />
            <Route
              path="/washingtongateway/spending"
              element={<WashingtonGatewayS />}
            />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
