import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then((response) => setUsers(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.UserID}>{user.Name} - {user.NationalID}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
