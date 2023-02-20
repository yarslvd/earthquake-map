import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Tooltip, CircleMarker } from 'react-leaflet';;

import { pointTypes } from './types/types';
import SearchField from './SearchField';

const Map = () => {
    const results = useSelector((state: any) => state.earthquakeApi.queries[Object.keys(state.earthquakeApi.queries)[0]].data);

    return (
        <MapContainer
            center={[49.9935, 36.2304]}
            zoom={12}
            minZoom={4}
            maxBounds={[[90, -180], [-90, 180]]}
            className="map-container"
        >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=cFuvfvmemoUFlzG1zCrM"
            />
            {results && results.features.map((el: pointTypes) => (
                <CircleMarker
                    center={[el.geometry.coordinates[1], el.geometry.coordinates[0]]}
                    key={el.id}
                    pathOptions={{ fillColor: 'red', color: '#ff5959' }}
                    radius={Math.pow(2, el.properties.mag) / 2}
                >
                <Tooltip>
                    <h4>{el.properties.place || 'No exact location'}</h4>
                    {`Magnitude: ${el.properties.mag}`}
                </Tooltip>
                </CircleMarker>
            ))}
            <SearchField apiKey={'pk.eyJ1IjoieWFyc2x2ZCIsImEiOiJjbGVkNWliZnowM3M3M3ZwMmFrcjB6ZXluIn0.8ipyFZInCxMaSuchTH3fNA'} />
      </MapContainer>
    );
};

export default Map;