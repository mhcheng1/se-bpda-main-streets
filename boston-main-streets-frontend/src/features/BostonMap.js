import React, { useEffect, useState } from "react";
import MapBlock from "../components/MapItem";
import { GeoJSON, Marker, Popup } from "react-leaflet";
import { bostonCenter } from "../constants";
import { useSelector } from "react-redux";

const BostonMap = () => {

    // map data
    const bostonBoundary = useSelector(({mapBoundary}) => mapBoundary)
    const bostonDistricts = useSelector(({mapDistricts}) => mapDistricts)

    // local color
    const localStyle = {
        "color": "red"
    }

    // wait for map data
    if (!bostonBoundary || !bostonDistricts) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <MapBlock center={bostonCenter} zoom={11}>
            <GeoJSON data={bostonBoundary} />
            <GeoJSON data={bostonDistricts} style={localStyle} />
        </MapBlock>
    )
}

export default BostonMap