import React,{useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './AddEmployee.css'
import { Checkbox, FormControlLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';





const AddEmployee=({closeEmployeeModal})=>{

    const {Id} =useParams();
    console.log(Id,"id")

const [firstname,setfirstName]=useState('')
const [lastname ,setlastName]= useState('')
const [email,setEmail]= useState('')
const [designation,setDesignation]= useState('')
const [dob,setDOB]= useState('')
const [isChecked, setIsChecked] = useState(false);

const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
}
console.log(isChecked)

const formHandler=async (event)=>{
event.preventDefault();
const onAddEmployee ={
                         firstname:firstname,
                         lastname:lastname,
                         email:email,
                         designation:designation,
                         dob:dob,
                         uid:Id,
                         isActive:isChecked
                         

}
try{
    await axios.post('http://localhost:8800/api/employee/addemployee',onAddEmployee)
    closeEmployeeModal()
   }catch(e){console.log(e)}
}
return (
<form className="form">




<TextField type="text" 
 id="outlined-basic" 
 label="First Name" 
 variant="filled"
color='success' 
 onChange={(event)=>setfirstName(event.target.value)} 
 value={firstname}
 
 />
 

<TextField  
type="text"
label="Last Name" 
variant="filled"
color='success'  
onChange={(event)=>setlastName(event.target.value)} 
value={lastname}

/>
<TextField  
type="email"
label="Email" 
variant="filled"
color='success'  
onChange={(event)=>setEmail(event.target.value)} 
value={email}

/>
<TextField  
type="text"
label="Designation" 
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

>Add Employee</Button>

</form>)

}
export default AddEmployee;