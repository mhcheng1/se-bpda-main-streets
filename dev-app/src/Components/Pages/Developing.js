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
            <div className="Title"><h2>This page is still under development.</h2></div>
            <div className="Loading"> 
                <Spinner animation="border" />
            </div>
        </div>
    );
}

export default Developing;