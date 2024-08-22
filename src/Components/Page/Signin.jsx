import React, { useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios'

function Sign() {
    
    const navigate=useNavigate()
    const initialValue={name:"",email:"",password:"",cnfrm_password:"",cart:[]};
    const[formValues,setFormValues]=useState(initialValue)
    const[formErrors,setFormErrors]=useState({})
    
    function handleChange(e){
        const{name,value}=e.target;
        
        setFormValues({...formValues,[name]:value})
    }
    function handleSubmit(e){
        e.preventDefault()
       
        
        if(validate()){
            navigate('/Login')
            const {cnfrm_password,...newFormValues}=formValues
            axios.post("http://localhost:3000/user",newFormValues)
        } 
    }

    
    function validate(){
        const errors={};
        if(!formValues.name)
            errors.name="name is required";
        
        if(!formValues.email)
            errors.email="Email is required";
        else if(!/\S+@\S+\.\S+/.test(formValues.email))
            errors.email="Email is invalid"
        
        if(!formValues.password)
            errors.password="Password is required";
        else if(formValues.password.length<8){
            errors.password="Password should contain 8 characters";
        }
        if(formValues.password !== formValues.cnfrm_password)
            errors.cnfrm_password="Password do not match"
        setFormErrors(errors)
        
        return Object.keys(errors).length===0;
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 w-full absolute top-0 z-50">
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <h2 class="text-2xl font-bold mb-6 text-center text-red-700">SignUp</h2>
        <form onSubmit={handleSubmit}>
        <div >
        <label for ="name" class="block text-red-700 text-sm font-bold mb-2">Name:</label>
        <input type='text' id="name" name="name" value={formValues.name} onChange={handleChange} class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" ></input>
        {formErrors.name&&(
            <p className='text-red-500 text-sm mt-1'>{formErrors.name}</p>
        )}
      </div>
        <div >
        <label for ="email" class="block text-red-700 text-sm font-bold mb-2">Email:</label>
        <input type='email' id="email" name="email" value={formValues.email} onChange={handleChange} class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" ></input>
        {formErrors.email&&(
            <p className='text-red-500 text-sm mt-1'>{formErrors.email}</p>
        )}
      </div>
      <div>
        <labell for='password'class='block text-red-700 text-sm font-bold mb-2'> Password:</labell>
        <input type='password' id="password" name="password" value={formValues.password} onChange={handleChange} class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" ></input>
        {formErrors.password&&(
            <p className='text-red-500 text-sm mt-1'>{formErrors.password}</p>
        )}
      </div>
      <div>
        <labell for='cnfrm_password'class='block text-red-700 text-sm font-bold mb-2'>Confirm Password:</labell>
        <input type='password' id="cnfrm_password" name="cnfrm_password" value={formValues.cnfrm_password}  onChange={handleChange} class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black" ></input>
        {formErrors.cnfrm_password&&(
            <p className='text-red-500 text-sm mt-1'>{formErrors.cnfrm_password}</p>
        )}
      </div>
      <button type='submit' class="w-full bg-red-500 text-white py-3 rounded-md mt-5 hover:bg-red-700">SignUp</button>

        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <Link to='/Login' className='text-red-600 hover:underline'>Login</Link>
        </p>
        </div>
    
    </div>
  )
}

export default Sign