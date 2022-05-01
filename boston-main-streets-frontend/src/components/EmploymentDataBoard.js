import React from "react";
import { Row, Col, CardGroup, Accordion } from "react-bootstrap";
import CardItem from "./CardItem";

const EmploymentDataBoard = () => {

    const cardTitles = [
        "Estimated Number of Employees:",
        "Total Number of Businesses:",
        "Average Employment Size:"
    ]

    return (
        <>
            <Row>
                <Col>
                    <CardGroup>
                        {cardTitles.map((title, index) => (
                            <CardItem key={index} title={title} text={1010} />
                        ))}
                    </CardGroup>
                </Col>
            </Row>

            <Row>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Business</Accordion.Header>
                        <Accordion.Body>1010</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Employment</Accordion.Header>
                        <Accordion.Body>1010</Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Mobility and Spending</Accordion.Header>
                        <Accordion.Body>1010</Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
        </>
    )
}

export default EmploymentDataBoard