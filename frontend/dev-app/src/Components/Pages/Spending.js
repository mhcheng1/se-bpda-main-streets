import React from 'react';
import {Container} from 'react-bootstrap';
import MainstreetMap from '../MainstreetMap';
import NavigationBar from '../NavigationBar';
import SpendingLineGraph from '../SpendingLineGraph';
import TripsLineGraph from '../TripsLineGraph';
import './Spending.css';


function BusinessData(url, coordinates, zoom) { 
    const [business_data, setData] = React.useState([]);
    const [in_person_spending_graph, setGraph1] = React.useState([]);
    const [trips_graph, setGraph2] = React.useState([]);
    React.useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setGraph2(data.trips);
            setData(data.geo.features);
            setGraph1(data.in_person_spending);
        })
        .catch(error => console.log(error));
    }, {});
    
    return ([MainstreetMap(business_data, coordinates, zoom), in_person_spending_graph, trips_graph]);
}

function Spending(url, msname, coordinates, zoom, link1, link2, link3) {
    const DistrictBar = () => {
        return NavigationBar(link1, link2, link3);
     }
     const business = BusinessData(url, coordinates, zoom);
     const SpendingGraph = () => {
         return SpendingLineGraph(business[1], "date", "share")
     }
     const TripsGraph = () => {
         return TripsLineGraph(business[2], "date", "trips")
     }

    return (
        <div>
            <Container><DistrictBar /></Container>
            <div>
                <div className="spending-title">
                    <h2>{msname} Spending and Moblity Data</h2>
                </div>
            </div>
            <div className="spending-box">
                <div className="spending-map"> {business[0]} </div>
                <div className="spending-graphs">
                    <div className="spending-linegraph1-title">
                        <h4>Spending Distribution in {msname}</h4>
                        <div className="spending-linegraph1"><SpendingGraph/></div>
                    </div>
                    <div className="spending-linegraph2-title">
                        <h4>Trip Distribution in {msname}</h4>
                        <div className="spending-linegraph2"><TripsGraph/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Spending;