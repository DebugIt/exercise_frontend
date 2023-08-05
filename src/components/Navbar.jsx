import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// drawer
import { Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);



  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar className='bg-[#252525]'>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/">Debug's Exercise Tracker</Link>
                </Typography>

                <button className='px-4 mb-1' onClick={() => setIsOpen(!isOpen)}>
                    <MenuIcon />
                </button>
{/* Drawer  */}
                <Drawer
                anchor='right'
                open={isOpen}
                onClose={()=>setIsOpen(!isOpen)}
                >
                    <Box p={2} width='250px' role='presentation'>
                        <Typography variant='h6' component='div'>
                            Menu
                        </Typography>
                        <div className='mt-12'>
                            <Button color="inherit" onClick={() => setIsOpen(false)}><Link to="/">All Exercises</Link></Button>
                            <Button color="inherit" onClick={() => setIsOpen(false)}><Link to="/create">Create Exercise</Link></Button>
                            <Button color="inherit" onClick={() => setIsOpen(false)}><Link to="/user">Create User</Link></Button>
                            
                            <Button color="inherit" onClick={() => setIsOpen(false)}><a href="https://debugcodes.netlify.app/">My Portfolio website</a></Button>
                        </div>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
        </Box>
        
       
    </>
  )
}

export default Navbar