import { useState, useEffect, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const MapControls = () => {
    const results = useSelector((state: any) => state.earthquakeApi.queries[Object.keys(state.earthquakeApi.queries)[0]].data);
    console.log(results);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [search, setSearch] = useState('');

    console.log(results);

    const handleChange = async (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        console.log(results);
    }

    return (
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
          <input type="text" onChange={handleChange} style={{ zIndex: '99999' }}/>
        </motion.div>
    );
}

export default MapControls;