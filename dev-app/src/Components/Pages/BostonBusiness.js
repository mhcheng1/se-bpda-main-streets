import React from 'react';
import { Container } from 'react-bootstrap';
import Map from '../Map';
import NavigationBar from '../NavigationBar';
import BarGraph from '../BarGraph';
import './Business.css';

function BusinessData() {
    const [industry_graph, setGraph1] = React.useState([]);
    const [employee_graph, setGraph2] = React.useState([]);
    const [stats, setStats] = React.useState([]);
    React.useEffect(() => {
        fetch('https://se-bpda.buspark.io/')
            .then(response => response.json())
            .then(data => {
                setStats(data.busi_info);
                setGraph2(data.employment_graph.data);
                setGraph1(data.industry_graph.data);
                console.log(data.busi_info)
            })
            .catch(error => console.log(error));
    }, {});

    return ([industry_graph, employee_graph, stats]);
}

function BostonBusiness() {
    const DistrictBar = () => {
        return NavigationBar("#/business", "#/employment", "#/spending");
    }
    const business = BusinessData();
    const BarGraph1 = () => {
        return BarGraph(business[0], 1, 7, "number_of_businesses", "industry");
     }
     const BarGraph2 = () => {
        return BarGraph(business[1], 1, 7, "number_of_employees", "industry");
     }

    return (
        <div>
            <Container><DistrictBar /></Container>
            <div>
                <div className="business-title">
                    <h2>All Main Street Data</h2>
                </div>
            </div>
            <div className="business-box">
                <div className="business-map"><Map/></div>
                <div className="business-generalinfo"> 
                    <p>Total number of businesses: <b> {business[2][0]} </b> </p> 
                    <p>Estimated number of employees: <b> {business[2][1]} </b></p>
                    <p>Average employment size: <b> {business[2][2]} </b></p>
                    <div className="business-graph1title">
                        <h6>Industrial Distribution of Businesses in all Main Streets</h6>
                        <div className="business-graph1"><BarGraph1/></div>
                    </div>
                    <div className="business-graph2title">
                        <h6>Number of Businesses in all Main Street Districts by Size</h6>
                        <div className="business-graph2"><BarGraph2/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BostonBusiness;