import React from 'react';
import MainstreetMap from '../MainstreetMap';
import NavigationBar from '../MSNavbar';
import './Layout.css'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
import {Container} from 'react-bootstrap'; 

const msname = "Chinatown";

function BusinessData() { 
    const [business_data, setData] = React.useState([]);
    const [industry_graph, setGraph1] = React.useState([]);
    React.useEffect(() => {
        fetch('http://35.168.164.33:5000/chinatown')
        .then(response => response.json())
        .then(data => {
            setData(data.geo.features)
            setGraph1(data.industry_graph.data)

        })
        .catch(error => console.log(error));
    }, {});
    
    return ([MainstreetMap(business_data, [42.3515, -71.061], 17), industry_graph]);
}

function Chinatown() {
    const DistrictBar = () => {
        return NavigationBar("/chinatown", "/chinatown/employment", "/chinatown/spending");
     }
    const business = BusinessData();
    return (
        <div>
            <Container><DistrictBar /></Container>
            <div className="map"> {business[0]} </div>
            <div className="street"> <h2>{msname} Main Street </h2> </div>
            <div className="generalinfo"> 
                <p>Total number of businesses: XXX </p> 
                <p>Estimated number of employees: XXX </p>
                <p>Average employment size: XXX </p>
            
            </div>
            <div className="graph1title"><h5>Industrial Distribution of Businesses in {msname}</h5></div>
            <div className="graph1">
            <BarChart
                    width={600}
                    height={200}
                    data={business[1]}
                    barGap={2}
                    layout="vertical"
                    barCategoryGap="20%"
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis type="number"/>
                    <YAxis type="category" tick={{fontSize: 7}} width={300} dataKey="industry"/>
                    <Tooltip />
                    <Bar dataKey="business_num" fill="blue" />
                </BarChart>
            </div>
        </div>
    );
}

export default Chinatown;