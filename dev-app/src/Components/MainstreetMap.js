import React from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, GeoJSON, Marker, Popup} from 'react-leaflet';
import msdistricts from './Main_Street_Districts.json';
import washington from './streets.json';
import './Map.css'


//TODO: Get json data from flask Api some code below (washington import is temporary to test GeoJSON code)
/*
const [brighton_data, setTitle] = React.useState({});
useEffect(() => {
  fetch('http://35.168.164.33:5000/brighton')
    .then(response => response.json())
    .then(data => {
      setTitle(data)
    })
    .catch(error => console.log(error));
}, {});

async function getJSON() {
  const response = await fetch('http://35.168.164.33:5000/brighton');
  const json = await response.json().then(data => {
    return data;
  });
  return json;
}
*/

//TODO: Fix popups(my sceen shows blank image)
//TODO: make this function a template that takes inputs of the center of the map and the zoom
      //This will make it customizeable for all mainstreets to call this file.
function MainstreetMap() {
    const districtStyle = {
      color: "red",
      fillColor: "red",
      fillOpacity: .4,
    }

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
          <GeoJSON style={districtStyle} data={msdistricts} />
          {washington.features.map((item) =>
              <Marker position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}>
                  <Popup> This is the business: {item.properties.name} </Popup>
              </Marker>
           )}
        </MapContainer>
      </div>
    );
  }

export default MainstreetMap;