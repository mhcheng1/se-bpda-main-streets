import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { Button, Modal } from "react-bootstrap";
import DistrictList from "../features/DistrictList";

const MapItem = (props) => {

    const [showModal, setShowModal] = useState(false)

    // about project modal
    const aboutProject = "Boston Main Street District Viewer is a project from the BPDA research Division and Boston University Spark. This interactive map combines public data and anonymized data from private companies to visualize the characteristics of Boston Main Street Districts and the impact of the COVID-19 pandemic on the economic prospects of businesses and people in each district. Click on the map and explore the Main Street Districts that bring our city to life.\nThis is a part of a broader initiative to understand the current environment in Boston.More research produced by the Boston Planning and Development Agency can be found on the BPDA Research Website: www.bostonplans.org / research."
    const projectModal = () => (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>About the Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{aboutProject}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {setShowModal(false)}}>Close</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )

    return (
        <MapContainer center={props.center} zoom={props.zoom} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.children}
            <Control position={"topleft"}>
                <DistrictList />
            </Control>
            <Control position={"bottomleft"}>
                {showModal && projectModal()}
                <Button variant="primary" onClick={() => {setShowModal(true)}}>About the Project</Button>
            </Control>
        </MapContainer>
    )
}

export default MapItem