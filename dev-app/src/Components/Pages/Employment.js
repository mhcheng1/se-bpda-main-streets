import React from 'react';
import {Container} from 'react-bootstrap';
import NavigationBar from '../NavigationBar';
import BarGraph from '../BarGraph';
import MainstreetMap from '../MainstreetMap';
import './Employment.css';

function EmploymentData(url, coordinates, zoom) { 
    const [business_data, setData] = React.useState([]);
    const [age_graph, setGraph1] = React.useState([]);
    const [income_graph, setGraph2] = React.useState([]);
    const [gender_graph, setGraph3] = React.useState([]);
    const [race_graph, setGraph4] = React.useState([]);
    const [education_graph, setGraph5] = React.useState([]);
    React.useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setData(data.geo.features);
            setGraph1(data.age_distribution);
            setGraph2(data.monthly_income);
            setGraph3(data.gender);
            setGraph4(data.racial_distribution);
            setGraph5(data.education_distribution);
        })
        .catch(error => console.log(error));
    }, {});
    
    return ([MainstreetMap(business_data, coordinates, zoom), age_graph, income_graph, gender_graph, race_graph, education_graph]);
}

function Employment(url, msname, coordinates, zoom, link1, link2, link3) {
    const DistrictBar = () => {
        return NavigationBar(link1, link2, link3);
     }
    const business = EmploymentData(url, coordinates, zoom);
    const AgeGraph = () => {
        return BarGraph(business[1], 0, 15,"Count", "Age");
     }
     const IncomeGraph = () => {
        return BarGraph(business[2], 0, 15, "Count", "Income");
     }
     const GenderGraph = () => {
        return BarGraph(business[3], 0, 15, "Count", "Gender");
    }
     const RaceGraph = () => {
        return BarGraph(business[4], 0, 15,"Count", "Race");
     }
     const EducationGraph = () => {
        return BarGraph(business[5], 0, 15, "Count", "Education");
     }

    return (
        <div>
            <Container><DistrictBar /></Container>
            <div>
                <div className="employment-title">
                    <h2>{msname} Employment Data</h2>
                </div>
            </div>
            <div className="employment-box">
                <div className="employment-map"> {business[0]} </div>
                <div className="employment-graphs">
                    <div className="employment-graph1-title">
                        <h6> Monthly Income for {msname} Employees</h6>
                        <div className="employmnent-graph1"><IncomeGraph/></div>
                    </div>
                    <div className="employment-graph2-title">
                        <h6> Gender Distribution in {msname}</h6>
                        <div className="employment-graph2"><GenderGraph/></div>
                    </div>
                    <div className="employment-graph3-title">
                        <h6> Race Distribution in {msname}</h6>
                        <div className="employment-graph3"><RaceGraph/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employment;