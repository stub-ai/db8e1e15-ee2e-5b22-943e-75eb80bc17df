import { useState, FormEvent } from 'react';
import axios from 'axios';

const WineForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [origin, setOrigin] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await axios.post('/api/wines', { name, type, year, origin });
    if (res.data) {
      alert('Wine added!');
    } else {
      alert('Something went wrong.');
    }
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="year">Year</label>
        <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="origin">Origin</label>
        <input type="text" id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
      </div>
      <button type="submit">Add Wine</button>
    </form>
  );
};

export default WineForm;