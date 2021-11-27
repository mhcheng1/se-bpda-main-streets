import React from 'react';
import MainstreetMap from '../MainstreetMap';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
  

function Map() { 
    const [business_data, setData] = React.useState([]);
    React.useEffect(() => {
        fetch('http://35.168.164.33:5000/chinatown')
        .then(response => response.json())
        .then(data => {
            setData(data.geo.features)
        })
        .catch(error => console.log(error));
    }, {});

    return (MainstreetMap(business_data, [42.3515, -71.061], 17));
}

function Chinatown() {

    return (
        <div>
            <span className="span">Chinatown Page</span>
            <div className="block1">
                <div className="map-component"><Map /></div>
            </div>
        </div>
    );
}

export default Chinatown;