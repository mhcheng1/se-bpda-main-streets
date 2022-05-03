import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultDistrict } from "../reducers/districtReducer";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, ButtonGroup} from "react-bootstrap";
import EmploymentBoard from "../features/EmploymentBoard";
import BusinessBoard from "../features/BusinessBoard";
import { removeMapBusiness } from "../reducers/mapBusinessReducer";
import Button from '@mui/material/Button';


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
    
    const buttonStyle = {
          backgroundImage: "url(" + "https://patronicity.s3.amazonaws.com/static/SponsorLogos/BMS_Icon_NoTag_RGB.JPG" + ")"
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
                    <h1>
                        {districtName.replace('-', ' ').toUpperCase()}
                        <Button variant="text" size="small" onClick={() => handleBack()}>
                            <img src="https://patronicity.s3.amazonaws.com/static/SponsorLogos/BMS_Icon_NoTag_RGB.JPG" width="30" alt="folder"/>
                        </Button> 
                    </h1>
            </Row>

            {tab === "Employment Data" && <EmploymentBoard />}
            {tab === "Businesses" && <BusinessBoard />}
        </Container>
    )
}

export default DashBoard