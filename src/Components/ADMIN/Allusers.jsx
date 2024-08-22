import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Allusers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await axios.get('http://localhost:3000/user'); 
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    }
  }

  async function handleBlock(userId, currentStatus) {
    try {
    
      const newStatus = !currentStatus;
      await axios.patch(`http://localhost:3000/user/${userId}`, {
        blocked: newStatus
      });

      setUsers(users.map(user =>
        user.id === userId ? { ...user, blocked: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  }

  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 border-b text-center">ID</th>
              <th className="px-6 py-3 border-b text-center">Name</th>
              <th className="px-6 py-3 border-b text-center">Email</th>
              <th className="px-6 py-3 border-b text-center">Details</th>
              <th className="px-6 py-3 border-b text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b text-center text-gray-700">{user.id}</td>
                <td className="px-6 py-4 border-b text-center text-gray-700">{user.name}</td>
                <td className="px-6 py-4 border-b text-center text-gray-700">{user.email}</td>
                <td className="px-6 py-4 border-b text-center text-gray-700">
                  <Link to={`${user.id}`}>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors duration-300">
                      See More
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4 border-b text-center text-gray-700">
                  {user.blocked ? (
                    <button 
                      onClick={() => handleBlock(user.id, user.blocked)} 
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition-colors duration-300"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleBlock(user.id, user.blocked)} 
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors duration-300"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Allusers;
