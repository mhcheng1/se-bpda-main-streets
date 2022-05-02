import React from "react";
import { Row, Col, CardGroup, Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import CardItem from "../components/CardItem";

const EmploymentBoard = () => {

    // calcuate summary
    const districtName = useSelector(({district}) => district)
    const businesses = useSelector(({business}) => business)
    const totalEmp = businesses.map((business) => business.estimated_employment).reduce((a, b) => a+b, 0)
    const totalBusiness = businesses.length
    const averageEmp = Math.floor(totalEmp / totalBusiness)

    const cardTitles = [
        { title: "Estimated Number of Employees:", text: totalEmp },
        { title: "Total Number of Businesses:", text: totalBusiness },
        { title: "Average Employment Size:", text: averageEmp }
    ]

    if (businesses.length === 0) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            <Row>
                <Col>
                    <CardGroup>
                        {cardTitles.map((card, index) => (
                            <CardItem key={index} title={card.title} text={card.text} />
                        ))}
                    </CardGroup>
                </Col>
            </Row>

            {(districtName !== "Boston") ? (
                <Row>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Employment</Accordion.Header>
                            <Accordion.Body>1010</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Mobility</Accordion.Header>
                            <Accordion.Body>1010</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Spending</Accordion.Header>
                            <Accordion.Body>1010</Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            ) : <></>}
        </>
    )
}

export default EmploymentBoard