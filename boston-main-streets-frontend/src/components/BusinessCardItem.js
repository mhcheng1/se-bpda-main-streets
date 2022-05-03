import React from "react";
import { Card } from "react-bootstrap";

const BusinessCardItem = (props) => {
    return (
        <Card border="primary">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
            </Card.Body>
            {props.children}
        </Card>
    )
}

export default BusinessCardItem;