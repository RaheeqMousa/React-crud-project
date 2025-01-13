import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from'react-router-dom';
import { useEffect } from'react';
import Swal from 'sweetalert2';

export default function Details() {

    const {id}=useParams();
    const { register, handleSubmit, setValue } = useForm();
    const navigate=useNavigate();

    const getDetails= async ()=>{
        const {data}=await axios.get(`https://node-react-10.onrender.com/users/${id}`);
        setValue("userName",data.user.userName);
        setValue("phone",data.user.phone);
        setValue("email",data.user.email);
        console.log(data.user);
    }

    useEffect(()=>{
        getDetails();
    },[])

    const updateUser=async (value)=>{
        const res =await axios.put(`https://node-react-10.onrender.com/users/${id}`,{
        userName:value.userName
            });

        if(res.status==200){
            navigate('/users')
        }
    }

    function displayAlert(value){
        console.log(value);
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
            updateUser(value);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'No action was taken.', 'info');
          }
        });
      }

  return (
    <>
        <form onSubmit={handleSubmit(displayAlert)} className='py-5'>
            <div className='d-flex flex-column gap-4'>
                <div className="form-floating" >
                    <input type="text" className="form-control" id="userName" placeholder="Username" {...register("userName")} />
                    <label htmlFor="userName">Username</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="email" placeholder="Email" disabled {...register("email")} />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" id="phone" placeholder="Phone" disabled {...register("phone")} />
                    <label htmlFor="phone">Phone</label>
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '10rem'}}>Update</button>
            </div>
        </form>  
        
    </>
  )
}
