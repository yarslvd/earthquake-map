import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import Map from './Map';

function App() {
  const [results, setResults] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<string[]>((new Date().toLocaleDateString()).split('.'));

  const firstUpdate: {current: boolean} = useRef(true);

  useEffect(() => {
    let mounted = true;

    if(firstUpdate.current) {
      firstUpdate.current = false;
      axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${date[2]}-${date[1]}-${date[0] - 17}&minmagnitude=3`)
        .then(res => {
          setResults(res.data);
        })
        .catch(err => console.error(err));
    }

    const interval = setInterval(() => {
      axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${date[2]}-${date[1]}-${date[0] - 17}&minmagnitude=3`)
        .then(res => {
          console.log(res.data);
          setResults(res.data);
        })
        .catch(err => console.error(err));
    }, 10000);

    return () => {
      clearInterval(interval);
      mounted = false;
    }

  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div className='container'>
        {results && <Map {...results}/>}
        <motion.div
          className='info parent'
          layout
          initial={{ borderRadius: 50 }}
          data-isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div layout className="child">
            <h1>{results && results.features.length}</h1>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
