import React from "react";
import "./Developing.css";
import { Container, Spinner } from "react-bootstrap";
import NavigationBar from "../NavigationBar";

function Developing(link1, link2, link3) {
  // Input:  link 1, 2, 3: links to the other pages of the app in a string
  // Output: Navigation bar with links to the other pages in the app;
  //         A spinning wheel animation to indicate work that is in progress

  const DistrictBar = () => {
    return NavigationBar(link1, link2, link3);
  };

  return (
    <div>
      <Container>
        <DistrictBar />
      </Container>
      <div className="Title">
        <h2>
          Unfortunately there is no data for this page. Until more data is
          added, please view the other pages of the various main streets.
        </h2>
      </div>
      <div className="Loading">
        <Spinner animation="border" />
      </div>
    </div>
  );
}

export default Developing;
