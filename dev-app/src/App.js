import Homepage from "./Components/Pages/Hompage";
import Brighton from "./Components/Pages/Brighton";
import Chinatown from "./Components/Pages/Chinatown";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React from 'react';


function App() {
  return (
    <div>
      <Router>
        <br />
        <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/brighton' element={<Brighton/>} />
            <Route path='/chinatown' element={<Chinatown/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
