import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import DashBoard from "../components/DashBoard";
import MainMap from "../features/MainMap";

const MainPage = () => {

    return (
        <Container fluid>
            <Row>
                <Col>
                    <MainMap />
                </Col>
                <Col>
                    <DashBoard />
                </Col>
            </Row>
        </Container>
    )
}

export default MainPage