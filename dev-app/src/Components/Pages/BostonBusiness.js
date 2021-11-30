import React from 'react';
import {Container} from 'react-bootstrap';
import Map from '../Map';
import NavigationBar from '../NavigationBar';
import BarGraph from '../BarGraph';
import './Business.css';

function BusinessData() { 
    const [industry_graph, setGraph1] = React.useState([]);
    const [employee_graph, setGraph2] = React.useState([]);
    const [stats, setStats] = React.useState([]);
    React.useEffect(() => {
        fetch('http://35.168.164.33:5000/')
        .then(response => response.json())
        .then(data => {
            setStats(data.busi_info);
            setGraph2(data.employment_graph.data);
            setGraph1(data.industry_graph.data);
        })
        .catch(error => console.log(error));
    }, {});
    
    return ([industry_graph, employee_graph, stats]);
}

function BostonBusiness() {
    const DistrictBar = () => {
        return NavigationBar("/se-bpda-main-streets/business", "/se-bpda-main-streets/employment", "/se-bpda-main-streets/spending");
     }
    const business = BusinessData();
    const BarGraph1 = () => {
        return BarGraph(business[0], "number_of_businesses", "industry");
     }
     const BarGraph2 = () => {
        return BarGraph(business[1], "number_of_employees", "industry");
     }

    return (
        <div>
            <Container><DistrictBar /></Container>
            <div className="map"><Map/></div>
            <div className="street"> <h2>All Main Streets </h2> </div>
            <div className="generalinfo"> 
                <p>Total number of businesses: <b> {business[2][0]} </b> </p> 
                <p>Estimated number of employees: <b> {business[2][1]} </b></p>
                <p>Average employment size: <b> {business[2][2]} </b></p>
            </div>
            <div className="graph1title"><h6>Industrial Distribution of Businesses in all Main Streets</h6></div>
            <div className="graph1"><BarGraph1/></div>
            <div className="graph2title"><h6>Number of Businesses in all Main Street Districts by Size</h6></div>
            <div className="graph2"><BarGraph2/></div>
        </div>
    );
}

export default BostonBusiness;