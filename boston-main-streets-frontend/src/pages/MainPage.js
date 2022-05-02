import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TopBar from "../components/TopBar";
import DashBoard from "../components/DashBoard";
import MainMap from "../features/MainMap";

const MainPage = () => {

    return (
        <div>
            <TopBar />
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
        </div>
        
    )
}

export default MainPage