import React from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, GeoJSON, Marker, Popup, Poly} from 'react-leaflet';
import msdistricts from './Main_Street_Districts.json';
import boston from './Boston_Boundary.json'
import './Map.css'

function Map() {
    const districtStyle = {
      color: "red",
      fillColor: "red",
      fillOpacity: .5,
      clickable: true,
    }

    const bostonStyle = {
      color: "black",
      fillOpacity: 0,
    }
//TODO: Need to make the whole Polygon 
    return (
      <div>
        <MapContainer
          center={[42.35, -71.07]}
          zoom={11.4}
          scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON style={bostonStyle} data={boston} />
          <GeoJSON style={districtStyle} data={msdistricts} />
          {msdistricts.features.map((item) =>
              <Marker position={[42.35, -71.07]}>
                <Popup> {item.properties.NAME} <br /> Follow Link for more detail: </Popup>
              </Marker>,
           )}
        </MapContainer>
      </div>
    );
  }

export default Map;