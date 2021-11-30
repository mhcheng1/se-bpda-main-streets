import React from 'react';
import {Container} from 'react-bootstrap';
import NavigationBar from '../NavigationBar';

function Spending(url, msname, coordinates, zoom, link1, link2, link3) {
    const DistrictBar = () => {
        return NavigationBar(link1, link2, link3);
     }

    return (
        <div>
            <Container><DistrictBar /></Container>
        </div>
    );
}

export default Spending;