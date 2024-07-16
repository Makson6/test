// src/components/PersonForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PersonForm = ({ fetchPersons }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:3000/persons', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchPersons();
        } catch (error) {
            console.error('Error creating person:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div>
                <label>Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
            </div>
            <button type="submit">Add Person</button>
        </form>
    );
};

export default PersonForm;