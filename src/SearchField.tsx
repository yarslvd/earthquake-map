import { GeoSearchControl, MapBoxProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet'
import { useEffect } from 'react';

const SearchField = ({ apiKey }: any) => {
    const provider = new MapBoxProvider({
      params: {
        access_token: apiKey,
      },
    });
  
    // @ts-ignore
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: 'bar'
    });
  
    const map = useMap();

    useEffect(() => {
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);
  
    return null;
};

export default SearchField;