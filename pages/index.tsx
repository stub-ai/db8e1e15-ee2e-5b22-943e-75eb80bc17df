import { useEffect, useState } from 'react';
import axios from 'axios';
import WineForm from '../components/WineForm';

interface Wine {
  id: number;
  name: string;
  type: string;
  year: string;
  origin: string;
}

const Home = () => {
  const [wines, setWines] = useState<Wine[]>([]);

  useEffect(() => {
    const fetchWines = async () => {
      const res = await axios.get('/api/wines');
      setWines(res.data);
    };

    fetchWines();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">Wines</h1>
      <WineForm />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wines.map((wine) => (
          <div key={wine.id} className="border p-4 rounded-lg">
            <h2 className="text-2xl font-bold">{wine.name}</h2>
            <p>Type: {wine.type}</p>
            <p>Year: {wine.year}</p>
            <p>Origin: {wine.origin}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;