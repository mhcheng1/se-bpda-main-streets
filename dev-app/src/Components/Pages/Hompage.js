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
    </div>
);
}

export default Homepage;