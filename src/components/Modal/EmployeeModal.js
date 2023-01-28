import React from 'react';

import Modal from 'react-modal';
import AddCompany from '../Company/AddCompany';

import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import AddEmployee from '../Employee/AddEmployee';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    backgroundColor:"#555",
    
   
    transform: 'translate(-50%, -50%)',
    width:'40%'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function EmployeeModals() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
    <Button type="submit" onClick={openModal} variant="outlined" style={{backgroundColor:"rgb(10, 181, 118)",color:"#555",marginLeft:"10rem",marginBottom:"1rem",border:'none'}}>Add Employee</Button>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
        <button style={{backgroundColor:"rgb(10, 181, 118)"}} onClick={closeModal}><CloseIcon/></button>
      
       
          <AddEmployee closeEmployeeModal={closeModal}/>
       
      </Modal>
    </div>
  );
}
export default EmployeeModals