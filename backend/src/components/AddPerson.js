import React, { useState } from 'react';
import axios from 'axios';

const AddPerson = () => {
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
            const response = await axios.post('http://localhost:3000/persons', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Person added:', response.data);
        } catch (error) {
            console.error('There was an error adding the person!', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
            }
        }
    };

    return (
        <div>
            <h1>Add Person</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
                <button type="submit">Add Person</button>
            </form>
        </div>
    );
};

export default AddPerson;
// import React, { useState } from 'react';
// import axios from 'axios';

// const AddPerson = () => {
//     const [name, setName] = useState('');
//     const [age, setAge] = useState('');
//     const [image, setImage] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('age', age);
//         formData.append('image', image);

//         try {
//             const response = await axios.post('http://localhost:3000/persons', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('Person added:', response.data);
//         } catch (error) {
//             console.error('There was an error adding the person!', error);
//             if (error.response) {
//                 console.error('Error response data:', error.response.data);
//             }
//         }
//     };

//     return (
//         <div>
//             <h1>Add Person</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
//                 <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
//                 <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
//                 <button type="submit">Add Person</button>
//             </form>
//         </div>
//     );
// };

// export default AddPerson;
