import React from "react";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import msdistricts from "./GeoJSON/Main_Street_Districts.json";
import "./Map.css";

function MainstreetMap(district_data, map_coor, map_zoom) {
  // Input:  district_data is a geojson formatted data that creates the markers of the map;
  //         map_coor is list of coordinates for where the map will be positioned;
  //         map_zoom is an int that will be used to zoom into the map
  // Output: A map of a Main Street with pinpoints that represent the location of a business

  const districtStyle = {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.4,
  };

  return (
    <div>
      <MapContainer center={map_coor} zoom={map_zoom} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON style={districtStyle} data={msdistricts} />
        {district_data.map((item) => (
          <Marker
            position={item.geometry.coordinates}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [15, 30] })}
          >
            <Popup>
              {" "}
              This is the business: <b>{item.properties.name}</b>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MainstreetMap;
