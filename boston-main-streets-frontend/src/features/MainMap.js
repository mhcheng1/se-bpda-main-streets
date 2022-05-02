import React from "react";
import { useSelector } from "react-redux";
import MapItem from "../components/MapItem";
import { GeoJSON, Marker } from "react-leaflet";
import { bostonCenter, nameRule } from "../constants";

const MainMap = () => {

    // redux states
    const districtName = useSelector(({ district }) => district)
    const bostonBoundary = useSelector(({ mapBoundary }) => mapBoundary)
    const bostonDistricts = useSelector(({ mapDistricts }) => mapDistricts)
    const mapBusiness = useSelector(({ mapBusiness }) => mapBusiness)

    // filter district
    const districtData = (districtName === "Boston")
        ? bostonDistricts
        : {
            ...bostonDistricts,
            features: bostonDistricts.features.filter((district) => (
                district.properties.DIST_NAME.replace(nameRule, "-") === districtName
            ))
        }

    const center = (districtName === "Boston")
        ? bostonCenter
        : [districtData.features[0].geometry.coordinates[0][0][1], districtData.features[0].geometry.coordinates[0][0][0]]

    const zoom = (districtName === "Boston") ? 11 : 15

    // local color
    const localStyle = {
        "color": "red"
    }

    if (!bostonBoundary || !bostonDistricts) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <MapItem key={districtName} center={center} zoom={zoom}>
            <GeoJSON data={bostonBoundary} />
            <GeoJSON key={districtName} data={districtData} style={localStyle} />
            {mapBusiness && (
                <Marker position={[mapBusiness.latitude, mapBusiness.longitude]} />
            )}
        </MapItem>
    )
}

export default MainMap