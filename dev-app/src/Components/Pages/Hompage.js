import React from 'react';
import './Homepage.css';
import Map from '../Map';

function Homepage() {
return (
    <div>
        <span className="span">Homepage</span>
        <div className="block1">
            <div className="map-component"><Map /></div>
        </div>
    </div>
);
}

export default Homepage;