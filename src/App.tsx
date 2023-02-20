import { useState } from 'react';
import { useGetEarthquakesQuery } from './store/earthquakeApi';

import Map from './Map';

function App() {
  const [view, setView] = useState<string>('2.5_day.geojson')
  const [date, setDate] = useState<string[]>((new Date().toLocaleDateString()).split('.'));
  // const {data, isLoading} = useGetEarthquakesQuery(`query?format=geojson&starttime=${date[2]}-${date[1]}-${date[0]}&minmagnitude=3`, {
  //   pollingInterval: 10000,
  // });
  const {data, isLoading} = useGetEarthquakesQuery(view, {
    pollingInterval: 10000,
  });

  const handleClick = () => {
    setView('1.0_month.geojson');
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className='container'>
        {!isLoading && <Map />}
        <button onClick={handleClick}>waawdawd</button>
      </div>
    </div>
  );
}

export default App;
