import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EmployeeDetails = () => {
    

    const navigate = useNavigate()
    const {Id}=useParams()
    const [employee,setEmployee]=useState([])
   const [deactiveEmployee,setDeactiveEmployee]=useState(false)
const [activeEmployee,setActiveEmployee]=useState(true)

    useEffect(()=>{

        const getEmployee= async()=>{
            const res = await axios.get(`http://localhost:8800/api/employee/getemployee/${Id}`)
            setEmployee(res.data[0])
        }
        getEmployee()
    },[Id])
  
   
   const deactiveEmployees=async()=>{
    try {
        setDeactiveEmployee(deactiveEmployee)
    const deactiveData={
        isActive:deactiveEmployee
    }
    
    const res = await axios.put(`http://localhost:8800/api/employee/deactivate/${Id}`,deactiveData)
    alert(res.data)
 
              
               
    } catch (error) {
        console.log(error)
    }
    
   }
//    ------------------------------------------------------------------------------
  const activateEmployeeHandler = async()=>{
try {
    setActiveEmployee (activeEmployee)
    const activeData={
        isActive:activeEmployee
    }
    const res = await axios.put(`http://localhost:8800/api/employee/activate/${Id}`,activeData)
    alert(res.data)
    
} catch (error) {
    console.log(error)
}
  }
    
  return (
    <div>
       <h1 style={{
        marginLeft:"42rem",
       }}>Employee Details</h1>
  
  
     
      
      <Card sx={{ 
     width:"30%" ,
    height:300,
    marginLeft:70,
    marginTop:5,
    backgroundColor:"rgb(10, 181, 118)",
    color:"white",
   
    
    }}>
    <CardContent>
      <Typography sx={{ fontSize: 25 ,fontWeight:400,marginLeft:"8rem",marginTop:"1rem",color:"#555"}}  gutterBottom>
        About Employee:
      </Typography>
      <Typography sx={{ fontSize: 20 ,fontWeight:700 ,marginLeft:"6rem", color:"#555"}} >
      Full Name: {employee?.firstname} {employee?.lastname}
      </Typography>
      
      
      <Typography sx={{ fontSize: 20 ,fontWeight:700,marginLeft:"6rem",color:"#555"}} >
      Email: {employee?.email}
      </Typography>
      <Typography sx={{ fontSize: 20 ,fontWeight:700,marginLeft:"6rem",color:"#555"}} >
      Designation: {employee?.designation}
      </Typography>
      <Typography sx={{ fontSize: 20 ,fontWeight:700,marginLeft:"6rem",color:"#555"}} >
      Employee Status: {employee?.isActive===1? "active":"deactive"}
      </Typography>
      
    </CardContent>
    <CardActions>
    {employee?.isActive===1?<Button onClick={deactiveEmployees}
    style={{backgroundColor:"#555",color:"rgb(10, 181, 118)"}}
    
     >deactivate</Button> :
    <Button onClick={activateEmployeeHandler} style={{backgroundColor:"#555",color:"rgb(10, 181, 118)"}} >activate</Button>}
    
     <Button 
     onClick={() =>  navigate( '/migrateEmploye/' + employee?.eid, { replace: true })} 
     style={{backgroundColor:"#555",color:"rgb(10, 181, 118)" ,marginLeft:"auto"}}
     
     >Migrate</Button>
    </CardActions>
  </Card>
    </div>
  )
}
export default EmployeeDetails
