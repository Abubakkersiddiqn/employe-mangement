import { Button, TextField } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';

const UpdateCompany = () => {
    const {Id} = useParams()
    const [getCompany , setGetCompany]=useState({})

const [Updateaddress,setUpdateAddress]=useState('')
const [Updatecoordinates, setUpdateCoordinates] = useState({});
const [UpdatecompanyName,setUpadateName]=useState("")
const navigate =useNavigate()

useEffect(()=>{
    const getCompanyById = async()=>{
        const res = await axios.get(`http://localhost:8800/api/company/getcompany/${Id}`)
        setGetCompany(res.data[0])
    }
    getCompanyById()
   
},[Id])


console.log(getCompany?.companyName,"getCompany",UpdatecompanyName)

const UpdatehandleAddressChange = (event) => {
    setUpdateAddress(event.target.value);
  }
  useEffect(()=>{
   const getCoordinates= async()=>{
    const res = await axios
    .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${Updateaddress}.json?access_token=sk.eyJ1IjoiYWJ1YmFra2VyIiwiYSI6ImNsZGV2ZnZwMjBlOTIzdnBpd2V6OHpmYmEifQ.3vu3YNYI_uvr029n9QDYKw`);
        const data = res.data;
        const lat = data.features[0].center[1];
        const lng = data.features[0].center[0];
        setUpdateCoordinates({ lat, lng });
        console.log(Updatecoordinates)
   }
   getCoordinates()
  },[Updateaddress])

    const UpdateformHandler= async(event)=>{
        event.preventDefault();
        try {
            
        
        
        
        
            
            const onUpdateCompany ={
                    companyName:UpdatecompanyName,
                    address:Updateaddress,
                    lat:Updatecoordinates.lat,
                    lng:Updatecoordinates.lng,
                
                }
               const res= await axios.put(`http://localhost:8800/api/company/updatecompany/${Id}`,onUpdateCompany)
              
                alert(res.data)
                navigate('/')
        
        } catch (error) {
            console.log(error)
        }
            
        
        
        
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
    ><span>Current Company Name: </span> <h3>{getCompany.companyName}</h3></div>
<form  className="form-control" onSubmit={UpdateformHandler} >




<TextField type="text" 
 id="outlined-basic" 
 label="Update Company Name" 
 variant="filled"
color='success' 
 onChange={(event)=>setUpadateName(event.target.value)} 
 value={UpdatecompanyName}
 
 />
 

<TextField  
type="text"
label="Update Address" 
variant="filled"
color='success'  

onChange={ UpdatehandleAddressChange}
value={Updateaddress}



/>




<Button
 type="submit" 
 variant="outlined" 
 style={{backgroundColor:"rgb(10, 181, 118)",color:"white"}} 
 
 
 >Update Company</Button>

</form>
</div>
  
  )
}

export default UpdateCompany