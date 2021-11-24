import Homepage from "./Components/Pages/Hompage";
import Brighton from "./Components/Pages/Brighton";
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
