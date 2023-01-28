import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Migrate.css'

const MigrateEmploye = () => {

    const [migrateCompany,setMigrateCompany] =useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [employee,setEmployee]=useState([])
    const {Id} =useParams()
    const navigate =useNavigate()
    console.log(Id,"Id")

    useEffect(()=>{
        const getCompany =async()=>{
            const res = await axios.get('http://localhost:8800/api/company/getallcompany')
            setMigrateCompany(res.data)
        }
        const getEmployee= async()=>{
            const res = await axios.get(`http://localhost:8800/api/employee/getemployee/${Id}`)
            setEmployee(res.data[0])
        }
       
        getCompany()
        getEmployee()
    },[Id])
    console.log(migrateCompany)

    const handleMigrate=async()=>{
        const migrate ={
            uid:selectedOption
        }
        const res = await axios.put(`http://localhost:8800/api/employee/migrateEmployee/${Id}`,migrate);
        alert(res.data)
        navigate('/')

    }

  return (
    <div>
    <h1 style={{
        marginLeft:"42rem",
       }}>Migrate Employee </h1>
      <Card sx={{ 
     width:"30%" ,
    height:300,
    marginLeft:70,
    marginTop:10,
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
      
    </CardContent>
    <CardActions>
     
    </CardActions>
    <div className='dropdown'>

    <h4 style={{color:"#555"}}>select the company to migrate: </h4>
      <select 
        value={selectedOption} 
        onChange={event => setSelectedOption(event.target.value)}
        className="dropdown-select"
      >
        {migrateCompany.map(option => (
         
          <option key={option.id} value={option.id}>
              
            {option.companyName}
          </option>
        ))}
      </select>
     
    </div>
    <Button  onClick={handleMigrate}
    style={{backgroundColor:"#555",color:"rgb(10, 181, 118)",marginLeft:"12rem"}}
    >Migrate</Button>
  </Card>


    </div>
  )
}

export default MigrateEmploye