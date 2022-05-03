import React from "react";
import { Card } from "react-bootstrap";

const CardItem = (props) => {

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Text>{props.title}</Card.Text>
                <h4>{props.text}</h4>
            </Card.Body>
            {props.children}
        </Card>
    )
}

export default CardItem