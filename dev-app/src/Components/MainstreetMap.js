import React from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, GeoJSON, Marker, Popup} from 'react-leaflet';
import msdistricts from './Main_Street_Districts.json';
import './Map.css'

//TODO: Fix popups(my sceen shows blank image)
function MainstreetMap(district_data, map_coor, map_zoom) {

    const districtStyle = {
      color: "red",
      fillColor: "red",
      fillOpacity: .4,
    }

    return (
      <div>
        <MapContainer
          center={map_coor}
          zoom={map_zoom}
          scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON style={districtStyle} data={msdistricts} />
          {district_data.map((item) =>
              <Marker position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}>
                  <Popup> This is the business: {item.properties.name} </Popup>
              </Marker>
           )}
        </MapContainer>
      </div>
    );
  }

export default MainstreetMap;