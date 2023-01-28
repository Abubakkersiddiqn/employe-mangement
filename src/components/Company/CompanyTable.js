import axios from "axios"
import './Table.css'
import { useEffect, useState } from "react"

import Modals from "../Modal/Modal";
import { useNavigate, useParams } from "react-router-dom";




const CompanyTable = () => {
    const URL = 'http://localhost:8800/api/company/getallcompany'
    
    const navigate = useNavigate()
   const {Id }=useParams()

function useAPi(url) {
  const [data, setData] = useState([])

  const companyHandler=(currentcompany)=>{
    setData((precompany)=>{
      return [...precompany,currentcompany];
    })
  }
  console.log(companyHandler)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get(url)
    setData(response.data)
  }

  const removeData = async(id) => {
    try {
        const res=await axios.delete("http://localhost:8800/api/company/deletecompany/" + id)
        alert(res.data)

       
    } catch (error) {
        console.log(error)
    }
  }

  return { data, removeData }
}

     const { data, removeData } = useAPi(URL)

    const renderHeader = () => {
        let headerElement = [ 'name', 'address', 'operation']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    console.log(data.id)
    

    const renderBody = () => {
        return data && data.map(({ id, companyName, address, }) => {
            return (
                
                <tr key={id}>
                    
                    <td>{companyName}</td>
                    <td>{address}</td>
                   
                    <td className='operation'>
                    <button className='button' onClick={() =>  navigate('/company/'+id)}>View</button>
                    
                    <button className='button' onClick={() =>navigate('/updatecompany/' + id)}>Update</button>
                    <button className='button' onClick={() => removeData(id)}>Delete</button>
                    </td>
                    
                </tr>
                
               
            )
        })
    }

    return (
        <>
            
            <h1 id='title'>Company List</h1>
            <Modals/>
            <table id='employee'>
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


export default CompanyTable