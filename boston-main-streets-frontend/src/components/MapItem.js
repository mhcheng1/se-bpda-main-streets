import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Control from "react-leaflet-custom-control";
import DistrictList from "../features/DistrictList";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // about project modal
    const aboutProject = "Boston Main Street District Viewer is a project from the BPDA research Division and Boston University Spark. This interactive map combines public data and anonymized data from private companies to visualize the characteristics of Boston Main Street Districts and the impact of the COVID-19 pandemic on the economic prospects of businesses and people in each district. Click on the map and explore the Main Street Districts that bring our city to life.\nThis is a part of a broader initiative to understand the current environment in Boston.More research produced by the Boston Planning and Development Agency can be found on the BPDA Research Website: www.bostonplans.org / research."


    return (
        <>
            <React.Fragment>
                <Button onClick={handleOpen} style={{backgroundColor: '#0066cc', color: 'white'}}>About the Project</Button>
                <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            About the Project <Button onClick={handleClose} >X</Button>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {aboutProject}
                        </Typography>
                        <p></p>
                        <img src="https://anad.org/wp-content/uploads/2017/09/BU-logo.png" width="100" height="70"></img>
                        <img src="https://www.southbostontoday.com/wp-content/uploads/2020/04/1200px-BPDA_Logo-696x238.png" width="200" height="70"></img>
                    </Box>
                </Modal>
            </React.Fragment>
        </>
    );
}

const MapItem = (props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
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
                    <div>
                        <ChildModal />
                    </div>
                </Control>
            </MapContainer>
        </>
    )
}

export default MapItem