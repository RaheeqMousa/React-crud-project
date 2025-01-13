import React from 'react'
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

export default function Create() {

    const { register, control, handleSubmit } = useForm();

    const navigate=useNavigate();

    const registerUser=async (data)=>{
        // Make API call to save user data here

        try{
            const response= await axios.post(`https://node-react-10.onrender.com/users`,data);
            
            if(response.status===201){
                Swal.fire("User Added Successfully", "User Added successfully!", "success");
                navigate('/users');
            }
        }catch(e){
            Swal.fire("ERROR 500", "AN ERROR OCCURED", "error");
        }
        
    }
  return (
    <>
    <form onSubmit={handleSubmit(registerUser)} className='py-5'>
        <div className='d-flex flex-column gap-3'>
            <div className="form-floating">
                <input type="text" className="form-control" id="userName" placeholder="Username" {...register("userName")} />
                <label htmlFor="userName">Username</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="password" placeholder="Password" {...register("password")}/>
                <label htmlFor="password">Password</label>
            </div>

            <div className="form-floating">
                <input type="email" className="form-control" id="email" placeholder="Email" {...register("email")} />
                <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" id="phone" placeholder="Phone" {...register("phone")}/>
                <label htmlFor="phone">Phone</label>
            </div>
            <button type="submit" className="btn btn-primary" style={{width: '8rem'}}>Submit</button>
        </div>
    </form>  
    
    <DevTool control={control} />
    </>
  )


}
