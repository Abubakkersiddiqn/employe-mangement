

import {BrowserRouter, Route,Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CompanyDetails from "./components/Company/CompanyDetails";
import CompanyTable from "./components/Company/CompanyTable";
import './App.css'

import EmployeeDetails from "./components/Employee/EmployeeDetails";
import MigrateEmploye from "./components/Employee/MigrateEmploye";
import UpdateCompany from "./components/Company/UpdateCompany";
import UpdateEmployee from "./components/Employee/UpdateEmployee";






function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
    
        <Routes>
          <Route path="/">
          
         
           <Route index element={ <CompanyTable/>}></Route>
          <Route path='company/:Id' element={<CompanyDetails />} ></Route> 
          <Route path='employee/:Id' element={<EmployeeDetails/>}></Route>
          <Route path='migrateEmploye/:Id' element={<MigrateEmploye/>}></Route>
          <Route path='updatecompany/:Id' element={<UpdateCompany/>}></Route>
          <Route path='updateEmployee/:Id' element={<UpdateEmployee/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
     
      
     
    
    </div>
  );
}

export default App;
