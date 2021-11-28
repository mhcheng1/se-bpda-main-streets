import React from 'react';
import MainstreetMap from '../MainstreetMap';
import NavigationBar from '../MSNavbar';
import './Layout.css'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function BusinessData() { 
    const [business_data, setData] = React.useState([]);
    const [industry_graph, setGraph1] = React.useState([]);
    React.useEffect(() => {
        fetch('http://35.168.164.33:5000/brighton')
        .then(response => response.json())
        .then(data => {
            setData(data.geo.features)
            setGraph1(data.industry_graph.data)

        })
        .catch(error => console.log(error));
    }, {});
    
    return ([MainstreetMap(business_data, [42.35, -71.16], 15), industry_graph]);
}

function Brighton() {
    const business = BusinessData();
    return (
        <div>
            <Container><NavigationBar /></Container>
            <div className="map"> {business[0]} </div>
            <div className="graph1">
                <BarChart
                    width={400}
                    height={300}
                    data={business[1]}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="industry" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="business_num" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
}

export default Brighton;