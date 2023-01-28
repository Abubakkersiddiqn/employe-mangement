import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'

const UpdateEmployee = () => {
    const [firstname,setfirstName]=useState('')
    const [lastname ,setlastName]= useState('')
    const [email,setEmail]= useState('')
    const [designation,setDesignation]= useState('')
    const [dob,setDOB]= useState('')
    const [isChecked, setIsChecked] = useState(false);
    const {Id} =useParams();
    const navigate =useNavigate()
    const [employee,setEmployee]=useState([])
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    }
    useEffect(()=>{

        const getEmployee= async()=>{
            const res = await axios.get(`http://localhost:8800/api/employee/getemployee/${Id}`)
            setEmployee(res.data[0])
        }
        getEmployee()
    },[Id])
    
    const formHandler=async (event)=>{
        event.preventDefault();
        const onUpdateEmployee ={
                                 firstname:firstname,
                                 lastname:lastname,
                                 email:email,
                                 designation:designation,
                                 dob:dob,
                                 uid:employee.uid,
                                 isActive:isChecked
                                 
        
        }
        try{
            const res=await axios.put(`http://localhost:8800/api/employee/updateEmployee/${Id}`,onUpdateEmployee)
            alert(res.data)
            navigate('/')
            
           }catch(e){console.log(e)}
        }
  return (
    <div>
    <div
    style={{
        display: 'flex',
       alignItems:'center',
       gap:".5rem",
        justifyContent: 'center'
    }}
    ><span>Current Empolyee Name: </span> <h3>{employee.firstname} {employee.lastname}</h3></div>
 
<form className="form">




<TextField type="text" 
 id="outlined-basic" 
 label="Update First Name" 
 variant="filled"
color='success' 
 onChange={(event)=>setfirstName(event.target.value)} 
 value={firstname}
 
 />
 

<TextField  
type="text"
label="Update Last Name" 
variant="filled"
color='success'  
onChange={(event)=>setlastName(event.target.value)} 
value={lastname}

/>
<TextField  
type="email"
label="Update Email" 
variant="filled"
color='success'  
onChange={(event)=>setEmail(event.target.value)} 
value={email}

/>
<TextField  
type="text"
label="Update Designation" 
variant="filled"
color='success'  
onChange={(event)=>setDesignation(event.target.value)} 
value={designation}

/>
<TextField  
type="date"

variant="filled"
color='success'  
onChange={(event)=>setDOB(event.target.value)} 
value={dob}

/>
<FormControlLabel control={<Checkbox checked={isChecked}
                onChange={handleCheckboxChange}  color="success"/>} label="isActive"  />



<Button 
type="submit" 
variant="outlined" 
style={{backgroundColor:"rgb(10, 181, 118)",color:"white"}}
onClick={formHandler}

>Update Employee</Button>

</form>
    </div>
  )
}

export default UpdateEmployee