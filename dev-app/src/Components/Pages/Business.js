import React from 'react';
import {Container} from 'react-bootstrap';
import MainstreetMap from '../MainstreetMap';
import NavigationBar from '../NavigationBar';
import BarGraph from '../BarGraph';
import './Business.css';

function BusinessData(url, coordinates, zoom) { 
    const [business_data, setData] = React.useState([]);
    const [industry_graph, setGraph1] = React.useState([]);
    const [employee_graph, setGraph2] = React.useState([]);
    const [stats, setStats] = React.useState([]);
    React.useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setStats(data.busi_info);
            setGraph2(data.employment_graph.data);
            setData(data.geo.features);
            setGraph1(data.industry_graph.data);
        })
        .catch(error => console.log(error));
    }, {});
    
    return ([MainstreetMap(business_data, coordinates, zoom), industry_graph, employee_graph, stats]);
}

function Business(url, msname, coordinates, zoom, link1, link2, link3) {
    const DistrictBar = () => {
        return NavigationBar(link1, link2, link3);
     }
    const business = BusinessData(url, coordinates, zoom);
    const BusinessGraph = () => {
        return BarGraph(business[1], 1, 7, "number_of_businesses", "industry");
     }
     const SizeGraph = () => {
        return BarGraph(business[2], 1, 7, "number_of_employees", "industry");
     }

    return (
        <div>
            <Container><DistrictBar /></Container>
            <div>
                <div className="business-title">
                    <h2>{msname} Business Data</h2>
                </div>
            </div>
            <div className="business-box">
                <div className="business-map"> {business[0]} </div>
                <div className="business-generalinfo"> 
                    <p>Total number of businesses: <strong> {business[3][0]} </strong></p> 
                    <p>Estimated number of employees: <strong> {business[3][1]} </strong></p>
                    <p>Average employment size: <strong> {business[3][2]} </strong></p>
                    <div className="business-graph1title">
                        <h6>Industrial Distribution of Businesses in {msname}</h6>
                        <div className="business-graph1"><BusinessGraph/></div>
                    </div>
                    <div className="business-graph2title">
                        <h6>Number of Businesses in {msname} Main Street Districts by Size</h6>
                        <div className="business-graph2"><SizeGraph/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Business;