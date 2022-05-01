import React from "react";
import { Row, Button } from "react-bootstrap";
import CardItem from "../components/CardItem";
import { useSelector } from "react-redux";
import { nameRule } from "../constants";

const BusinessesBoard = () => {
    
    // get businesses data
    const businessData = useSelector(({business}) => business)

    return (
        <Row className="overflow-scroll">
            {businessData.map((business, index) => (
                <CardItem key={index} title={business.business_name} text={`address: ${business.street_address}`}>
                    <Button variant="link">report issue</Button>
                </CardItem>
            ))}
        </Row>
    )
}

export default BusinessesBoard