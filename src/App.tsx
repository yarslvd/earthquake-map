import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Tooltip, CircleMarker } from 'react-leaflet';
import axios from 'axios';

import { pointTypes } from './types/types';

function App() {
  const [position, setPosition] = useState<Number[]>([49.9935, 36.2304]);
  const [results, setResults] = useState<any>();

  useEffect(() => {
    const date = (new Date().toLocaleDateString()).split('.');

    axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${date[2]}-${date[1]}-${date[0]}&minmagnitude=3`)
      .then(res => {
        console.log(res.data);
        setResults(res.data);
      })
      .catch(err => console.log(err));
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setPosition([coords.latitude, coords.longitude]);
    });

  }, []);

  return (
    <div>
      <MapContainer
        center={position}
        zoom={12}
        minZoom={4}
        maxBounds={[[90, -180], [-90, 180]]}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {results && results.features.map((el: pointTypes) => (
            <CircleMarker
              center={[el.geometry.coordinates[1], el.geometry.coordinates[0]]}
              key={el.id}
              pathOptions={{ fillColor: 'red', color: '#ff5959' }}
              radius={Math.pow(2, el.properties.mag) / 2}
            >
              <Tooltip>
                {`${el.properties.place || 'No exact location'} - ${el.properties.mag}`}
              </Tooltip>
            </CircleMarker>
          ))}
      </MapContainer>
    </div>
  );
}

export default App;
