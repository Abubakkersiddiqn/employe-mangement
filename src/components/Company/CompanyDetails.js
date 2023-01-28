import React, { useEffect, useRef, useState } from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

import EmployeeTable from '../Employee/EmployeeTable';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import ReactMapGL, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './CompanyDetails.css'
import ReactMapGL, { Marker } from 'react-map-gl';


const CompanyDetails = () => {


// const token ='pk.eyJ1IjoiYWJ1YmFra2VyIiwiYSI6ImNsZGN6NnA2azBmZjUzb25yY2wyMmw0MDQifQ.598HjV69Ln_GJ6zJ_KGD6Q'
  const {Id}=useParams();
  console.log(Id)
  
  console.log(useParams)

const [company,setCompany]= useState({})
const mapContainer = useRef(null);
const map = useRef(null);
const [latLng, setLatLng] = useState({
  lat:null,
  lng:null
});

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJ1YmFra2VyIiwiYSI6ImNsZGN6NnA2azBmZjUzb25yY2wyMmw0MDQifQ.598HjV69Ln_GJ6zJ_KGD6Q";

useEffect(()=>{
const fetchCompany= async()=>{
  try{
    const res = await axios.get(`http://localhost:8800/api/company/getcompany/${Id}`)
    setCompany(res.data[0])
   setLatLng({lat:res.data[0].lat,lng:res.data[0].lng})
  
   const map = new mapboxgl.Map({
   container: mapContainer.current,
   style: 'mapbox://styles/mapbox/streets-v12',
   center: [latLng.lng, latLng.lat],
   zoom: 12
   });
   
   map.on("load", () => {
    

    map.resize();
  });
  new mapboxgl.Marker({ color: 'red', rotation: 0 })
.setLngLat([latLng.lng, latLng.lat])
.addTo(map);

  }catch(e){
    console.log(e)
  }
}
fetchCompany();
},[Id,latLng.lat,latLng.lng])

console.log(latLng,'latlnhhh')







console.log(company.lat,company.lng,"cooo")
  return (
    <div>
    <div className='companyDetails'>

<Card sx={{ width: 300 ,
    height:300,
    marginLeft:15,
    marginTop:5,
    backgroundColor:"rgb(10, 181, 118)",
    color:"white",
    borderRadius:"50%"
    
    }}>
    <CardContent>
      <Typography sx={{ fontSize: 25 ,fontWeight:400,marginLeft:"2.5rem",marginTop:"3rem",color:"#555"}}  gutterBottom>
        About Company:
      </Typography>
      <Typography sx={{ fontSize: 20 ,fontWeight:700 ,marginLeft:"6.5rem", color:"#555"}} >
       {company.companyName}
      </Typography>
      <Typography sx={{ fontSize: 15 ,fontWeight:300,marginLeft:"2rem",color:"#555"}} >
      {company.address}
      </Typography>
      
    </CardContent>
    <CardActions>
     
    </CardActions>
  </Card>
  {latLng.lat && latLng.lng &&<div ref={mapContainer} className="map-container" />}
  </div>
  <EmployeeTable company={company}/> 
    </div>
  )
}

export default CompanyDetails
 