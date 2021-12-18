import React from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  FeatureGroup,
  Popup,
  Polygon,
} from "react-leaflet";
import streets from "./GeoJSON/Main_Street_Districts.json";
import boston from "./GeoJSON/Boston_Boundary.json";
import "./Map.css";

function Map() {
  // Input:  None;
  // Output: An interactive map of Greater Boston outlined in black with all the main streets highlighted in red

  const districtStyle = {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.5,
    clickable: true,
  };

  const bostonStyle = {
    color: "black",
    fillOpacity: 0,
  };

  return (
    <div>
      <MapContainer
        center={[42.315, -71.09]}
        zoom={11.5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON style={bostonStyle} data={boston} />
        {streets.features.map((item) => (
          <FeatureGroup pathOptions={districtStyle}>
            <Popup>
              Mainstreet: {item.properties.NAME} <br />{" "}
              <a href={item.properties.URL}>Click for more info</a>
            </Popup>
            <Polygon
              positions={item.geometry.coordinates.map((lst) =>
                lst.map((coord) => [coord[1], coord[0]])
              )}
            />
          </FeatureGroup>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
