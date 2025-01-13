import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdHeight } from 'react-icons/md';

export default function Users() {
  const [users, setUsers] = useState([]); 

  const getUsers = async () => {
    const {data} = await axios.get('https://node-react-10.onrender.com/users');
    setUsers(data.users); 
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {   
    // delete user from the server
    const res=await axios.delete(`https://node-react-10.onrender.com/users/${id}`);
    getUsers();
    console.log(res);
    
  };

  function displayAlert(id){
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to perform an action on User ID: ${id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Action Confirmed', `Action was performed on User ID: ${id}`, 'success');
        deleteUser(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'No action was taken.', 'info');
      }
    });
  }

  return (
    <>
      <section className="d-flex justify-content-center align-items-center flex-column gap-3 py-4">  
        <h3 className='text-center'>Users List</h3>
          <div className='row gap-3'>
            {users.map(user => (
              <div className="card col-xl-6 col-l-3 col-m-2 col-sm-1" style={{width: '15rem'}} key={user._id}>
                <div className="card-body d-flex justify-content-center align-items-center flex-column gap-4">
                  <h5 className="card-title">Name: {user.userName}</h5>
                  <p className="card-text">Email: {user.email}</p>

                  <div className='d-flex gap-3'>
                     <button onClick={()=>displayAlert(user._id)} className="btn btn-danger">Delete</button>
                    <Link className="btn btn-primary" to={`/users/${user._id}`}>Details</Link>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>  
        </section>

        <Link className='btn btn-primary py-2 fs-5 fw-bold' to={'/create'} style={{width: '10rem'}}>ADD USERS</Link>
    </>
  );
}
