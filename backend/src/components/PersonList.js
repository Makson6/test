// // src/components/PersonList.js

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PersonList = () => {
//     const [persons, setPersons] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:3000/persons')
//             .then(response => {
//                 setPersons(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the persons!', error);
//             });
//     }, []);

//     return (
//         <div>
//             <h1>Person List</h1>
//             <ul>
//                 {persons.map(person => (
//                     <li key={person.id}>
//                         {person.name} - {person.age} - <img src={person.imageUrl} alt={person.name} width="50" />
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PersonList;


// src/components/PersonList.js
import React from 'react';

const PersonList = ({ persons }) => {
    return (
        <div>
            {persons.map(person => (
                <div key={person.id}>
                    <h3>{person.name}</h3>
                    <p>Age: {person.age}</p>
                    <img src={person.imageUrl} alt={person.name} width="100" />
                </div>
            ))}
        </div>
    );
};

export default PersonList;
