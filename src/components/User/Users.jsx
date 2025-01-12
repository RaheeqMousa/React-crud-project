import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]); 

  const getUsers = async () => {
    const {data} = await axios.get('https://node-react-10.onrender.com/users');
    setUsers(data.users); 
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>

      <Link className='btn btn-primary' to={'/create'}>Create</Link>
      <div className="container">
        {
          users.map(user => (
            <div key={user._id}> 
              <h2>Name: {user.userName}</h2>
              <p>Email: {user.email}</p>
            </div>
          ))
}
        
      </div>
    </>
  );
}
