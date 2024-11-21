import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch users when the component mounts
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);  // Set users to the response data
                setLoading(false);  // Set loading to false after data is fetched
            } catch (err) {
                setError('Error fetching users.');  // Set error message in case of failure
                setLoading(false);  // Set loading to false even if there's an error
            }
        };

        fetchUsers();  // Call the function to fetch users
    }, []);  // Empty dependency array to ensure this runs once when the component mounts

    // Handle loading state
    if (loading) {
        return <div>Loading users...</div>;
    }

    // Handle error state
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}>  {/* Use unique key for each user */}
                            <strong>{user.name}</strong> - {user.email}
                        </li>
                    ))
                ) : (
                    <li>No users found.</li>  {/* Show this if the list is empty */}
                )}
            </ul>
        </div>
    );
};

export default UserList;
