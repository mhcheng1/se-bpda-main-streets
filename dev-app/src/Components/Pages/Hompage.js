import React from 'react';
import {Container} from 'react-bootstrap';
import './Homepage.css';
import Map from '../Map';
import NavigationBar from '../NavigationBar';

function Homepage() {
    const HomepageBar = () => {
        return NavigationBar("/se-bpda-main-streets/business", "/se-bpda-main-streets/employment", "/se-bpda-main-streets/spending");
     }
    return (
        <div>
            <Container><HomepageBar /></Container>
            <div className="block1">
                <div className="map-component"><Map /></div>
            </div>
                <div className="generalinfo"> 
                    <p>Some info</p> 
                </div>
        </div>
    );
}

export default Homepage;