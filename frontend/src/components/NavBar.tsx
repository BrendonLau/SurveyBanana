import { AppBar, Typography } from '@mui/material'
import React from 'react'

const NavBar = () => {
  return (
    <AppBar sx={{ flexDirection: 'row', boxShadow: 3, bgcolor: 'white', color: 'black' }}>
        <p className='ml-[1em]'>Welcome John Doe!</p>
        <Typography variant='h5' sx={{ flexGrow: 1, marginRight: '7em', fontWeight: 'bold' }}>
          Survey Banana
        </Typography>
    </AppBar>
  )
}

export default NavBar
