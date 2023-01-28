import React from 'react'
import './NavBar.css'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';



const NavBar = () => {
 
  return (
  

<div className='navbar'>
  
    <Box  >
      <AppBar position="static" style={{backgroundColor:"rgb(10, 181, 118)"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,color:"#555"}} >
           MANAGE
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  

  )
}

export default NavBar
