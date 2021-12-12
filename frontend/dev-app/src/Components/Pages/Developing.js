import React from 'react';
import './Developing.css';
import {Container, Button, Spinner} from 'react-bootstrap';
import NavigationBar from '../NavigationBar';

function Developing(link1, link2, link3) {
    const DistrictBar = () => {
        return NavigationBar(link1, link2, link3);
     }

    return (
        <div>
            <Container><DistrictBar /></Container>
            <div className="Title"><h2>Unfortunately there is no data for this page. Until more data is added, please view the other pages of the various main streets.</h2></div>
            <div className="Loading"> 
                <Spinner animation="border" />
            </div>
        </div>
    );
}

export default Developing;