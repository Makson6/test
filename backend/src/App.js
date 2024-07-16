import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [photo, setPhoto] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/person');
      setPeople(response.data);
    } catch (error) {
      console.error('Error fetching people', error);
    }
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearch(query);
    try {
      const response = await axios.get(`http://localhost:3001/api/person/search?query=${query}`);
      setPeople(response.data);
    } catch (error) {
      console.error('Error searching people', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', photo);
    formData.append('upload_preset', 'makdavid'); // Remplacez par votre upload preset

    try {
      const uploadResponse = await axios.post('https://api.cloudinary.com/v1_1/Makson6/image/upload', formData);
      const photoUrl = uploadResponse.data.secure_url;

      const newPerson = { name, country, language, photo: photoUrl };
      await axios.post('http://localhost:3001/api/person', newPerson);
      fetchPeople();
    } catch (error) {
      console.error('Error creating person', error);
    }
  };

  return (
    <div className="App">
      <h1>Person Manager</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
      />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button type="submit">Add Person</button>
      </form>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <img src={person.photo} alt={person.name} width="50" />
            <p>{person.name} - {person.country} - {person.language}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
