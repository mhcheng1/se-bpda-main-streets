import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultDistrict } from "../reducers/districtReducer";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, ButtonGroup, Button} from "react-bootstrap";
import EmploymentDataBoard from "./EmploymentDataBoard";
import BusinessBoard from "../features/BusinessBoard";
import { removeMapBusiness } from "../reducers/mapBusinessReducer";

const DashBoard = () => {

    const [tab, setTab] = useState("Employment Data")

    // redux states
    const districtName = useSelector(({ district }) => district)
    const dispatch = useDispatch()

    // react router
    const history = useHistory()

    // go back to boston page
    const handleBack = () => {
        dispatch(defaultDistrict())
        dispatch(removeMapBusiness())
    }

    return (
        <Container fluid style={{"height": "100vh"}}>
            <Row className="justify-content-md-center">
                <Col>
                    <ButtonGroup>
                        <Button variant="outline-primary"><i className="bi bi-arrow-bar-left"></i></Button>
                        <Button variant="outline-primary" onClick={() => {setTab("Employment Data")}}>Employment Data</Button>
                        <Button variant="outline-primary" onClick={() => {setTab("Life & Culture")}}>Life & Culture</Button>
                        <Button variant="outline-primary" onClick={() => {setTab("Businesses")}}>Businesses</Button>
                    </ButtonGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h1>
                        {districtName}
                        <Button variant="outline-primary" onClick={() => handleBack()}><i className="bi bi-house-door"></i></Button>
                    </h1>
                </Col>
            </Row>

            {tab === "Employment Data" && <EmploymentDataBoard />}
            {tab === "Businesses" && <BusinessBoard />}
        </Container>
    )
}

export default DashBoard