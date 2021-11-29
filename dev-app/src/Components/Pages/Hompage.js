import React from 'react';
import {Container} from 'react-bootstrap';
import './Homepage.css';
import Map from '../Map';
import NavigationBar from '../HPNavbar';

function Homepage() {
return (
    <div>
        <Container><NavigationBar /></Container>
        <div className="block1">
            <div className="map-component"><Map /></div>
        </div>
        <div className="title"><h1> Homepage </h1> </div>
            <div className="generalinfo"> 
                <p>Total number of businesses for all main streets: XXX </p> 
                <p>Estimated number of employees for all main streets: XXX </p>
                <p>Average employment size for all main street businesses: XXX </p>
            </div>
    </div>
);
}

export default Homepage;