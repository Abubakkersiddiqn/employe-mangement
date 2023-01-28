import React,{useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AddCompany.css'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';






const AddCompany=({closeModal})=>{

const [companyName,setName]=useState('')
const [address,setAddress]=useState('')
const [coordinates, setCoordinates] = useState({});


   
const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }
  useEffect(()=>{
   const getCoordinates= async()=>{
    const res = await axios
    .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=sk.eyJ1IjoiYWJ1YmFra2VyIiwiYSI6ImNsZGV2ZnZwMjBlOTIzdnBpd2V6OHpmYmEifQ.3vu3YNYI_uvr029n9QDYKw`);
        const data = res.data;
        const lat = data.features[0].center[1];
        const lng = data.features[0].center[0];
        setCoordinates({ lat, lng });
        console.log(coordinates)
   }
   getCoordinates()
  },[address])

 const formHandler= async(event)=>{
event.preventDefault();
try {
    




    
    const onAddCompany ={
            companyName:companyName,
            address:address,
            lat:coordinates.lat,
            lng:coordinates.lng,
        
        }
       const postData= await axios.post('http://localhost:8800/api/company/addcompany',onAddCompany)
       console.log(postData)
        closeModal()

} catch (error) {
    console.log(error)
}
    



  } 




return (
<form  className="form-control" onSubmit={formHandler} >




<TextField type="text" 
 id="outlined-basic" 
 label="Company Name" 
 variant="filled"
color='success' 
 onChange={(event)=>setName(event.target.value)} 
 value={companyName}
 
 />
 

<TextField  
type="text"
label="Address" 
variant="filled"
color='success'  

onChange={ handleAddressChange}
value={address}



/>




<Button
 type="submit" 
 variant="outlined" 
 style={{backgroundColor:"rgb(10, 181, 118)",color:"white"}} 
 
 
 >Add Company</Button>

</form>)

}
export default AddCompany;

// const onAddCompany ={
//     companyName:companyName,
//     address:address,
//     lat:coordinates.lat,
//     lng:coordinates.lng,

// }

