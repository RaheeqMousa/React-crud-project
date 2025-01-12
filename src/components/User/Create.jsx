import React from 'react'
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from 'axios';

export default function Create() {

    const { register, control, handleSubmit } = useForm();
    const registerUser=async (data)=>{
        // Make API call to save user data here
        const response= await axios.post(`https://node-react-10.onrender.com/users`,data);
        
        console.log(response);
    }
  return (
    <>
    <form onSubmit={handleSubmit(registerUser)}>
        <div>
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    </form>  
    
    <DevTool control={control} />
    </>
  )


}
