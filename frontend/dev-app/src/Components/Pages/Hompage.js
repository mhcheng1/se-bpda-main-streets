import React from "react";
import { Container } from "react-bootstrap";
import "./Homepage.css";
import Map from "../Map";
import NavigationBar from "../NavigationBar";

function Homepage() {
  // Input:  None;
  // Output: Navigation bar with links to the other pages in the app;
  //         Map of Greater Boston Area with outlines of all the Main Streets;
  //         Text of BPDA's mission and purpose

  const HomepageBar = () => {
    return NavigationBar("#/business", "#/employment", "#/spending");
  };
  return (
    <div>
      <Container>
        <HomepageBar />
      </Container>
      <div className="homepage-block">
        <div className="homepage-map">
          <Map />
        </div>
        <div className="homepage-generalinfo">
          <p>
            <strong> Boston Main Street District Viewer </strong> is a project
            from the BPDA Research Division and Boston University Spark. This
            interactive map combines public data and anonymized data from
            private companies to visualize the characteristics of Boston Main
            Street Districts and the impact of COVID-19 pandemic on the economic
            prospects of businesses and people in each district. Click the map
            and explore the Main Street Districts that bring our city to life.
          </p>
          <p>
            This is part of broader initiative to understand the current
            environment in Boston. More research produced by the Boston Planning
            and Development Agency can be found on the BPDA Research Website:{" "}
            <a href="http://www.bostonplans.org/research">
              <strong> www.bostonplans.org/research</strong>
            </a>
          </p>
          <p>
            <strong>Source: </strong> Mastercard Geographic Insights; Cuebiq
            Mobility Data*; U.S. Census Bureau. LEHD Origin-Destination
            Employment Statistics 2018, OntheMap; Data Axle; Yelp; Google;
            Yellow Pages; Bing
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
