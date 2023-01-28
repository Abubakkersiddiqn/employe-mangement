import axios from "axios"
import './EmployeeTable.css'
import { useEffect, useState } from "react"

import Modals from "../Modal/Modal";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeModals from "../Modal/EmployeeModal";
import moment from 'moment'




const EmployeeTable = ({company}) => {
    const URL = `http://localhost:8800/api/employee/${company.id}`
    const navigate = useNavigate()
   const {Id }=useParams()

function useAPi(url) {
  const [data, setData] = useState([])

  useEffect(() => {
    getData()
  }, [company.id])

  const getData = async () => {
    const response = await axios.get(url)
    setData(response.data,"dataaaa")
  }
  

  const removeData = async(id) => {
    try {
        const res=await axios.delete("http://localhost:8800/api/employee/deleteEmployee/" + id)
        alert(res.data)
       
    } catch (error) {
        console.log(error)
    }
  }

  return { data, removeData }
}

     const { data, removeData } = useAPi(URL)

    const renderHeader = () => {
        let headerElement = ['FirstName', 'Lastname', 'Email',"Designation","D.O.B","operation"]

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
console.log(data,"employee")

    const renderBody = () => {
        return data && data.map(({ eid, firstname, lastname,email, designation,dob}) => {
            return (
                
                <tr key={eid}>
                    
                    <td>{firstname}</td>
                    <td>{lastname}</td>
                    <td>{email}</td>
                    <td>{designation}</td>
                    <td>{dob.slice(0, 10)}</td>
                 
                    <td className='operation'>
                    <button className='button' onClick={() =>  navigate('../employee/'+eid, { replace: true })}>View</button>
                    
                    <button className='button' onClick={() =>navigate('/updateEmployee/'+eid)}>Update</button>
                    <button className='button' onClick={() => removeData(eid)}>Delete</button>
                    </td>
                    
                </tr>
                
               
            )
        })
    }

    return (
        <>
            
            <h1 style={{
                marginLeft:"40rem",
            }}>Employee List</h1>
            <EmployeeModals/>
            <table id='employee' style={{
                marginBottom:"2rem"
            }}>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    )
}


export default EmployeeTable