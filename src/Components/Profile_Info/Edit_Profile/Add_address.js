import React from 'react'
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import API_IP_ADDRESS from '../../../Config';
import {   Container } from "@mui/material";

function Add_address() {
  const [line1 ,setLine1]=useState([])
  const [line2,setLine2]=useState([])
  const [zipcode,setZipcode]=useState([])
  const [city,setCity]=useState([])
  const [state ,setState]=useState([])
  const [country,setCountry]=useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_IP_ADDRESS}/users/addAddress`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          line1: line1,
          line2: line2,
          zipcode:zipcode,
          city:city,
          state:state,
          country:country
        }),
      });
      const responseData = await response.json();
      if (responseData.status===true) {
      
        console.log('Add Address successful!...');
      } else {
       
        console.log('Add Address failed....');
      }
    } catch (error) {
      console.error('There was a problem with the API request:', error);
    }
  };
  return (
    <div>

    <Box sx={{ mt: 3 }} >
            <Container component="main" maxWidth="xm"  style={{
             padding: "20px",
             boxShadow: "4px 2px 8px 2px #ACB1D6",
             borderRadius: "8px",
             width:"70%",
            fontFamily: "open sans,Helvetica,Arial,sans-serif"  }}>

    <div>
      
      <h2 style={{fontSize:"24px",textAlign:"center",color:"green" }}>ADD ADDRESS</h2><br/>
    <form onSubmit={handleSubmit}>
      <div style={{textAlign:"center"}}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '35ch' },
      }}
      noValidate
      autoComplete="off"
     >
      <TextField 
      id="outlined-basic" 
      label="Line1"
       variant="outlined" 
       value={line1}
       onChange={(e) => {
        setLine1(e.target.value);
      }}
       />
      <TextField 
      id="outlined-basic" 
      label="Line2" 
      variant="outlined" 
      value={line2}
       onChange={(e) => {
        setLine2(e.target.value);
      }}
      /><br/>
      <TextField  
      id="outlined-basic"
      label="City" 
       variant="outlined" 
       value={city}
       onChange={(e) => {
        setCity(e.target.value);
      }}
       />
      <TextField 
      id="outlined-basic" 
      label="State" 
      variant="outlined"
      value={state}
      onChange={(e) => {
      setState(e.target.value);
     }} 
     /><br/>

      <TextField 
      id="outlined-basic" 
      label="Country" 
      variant="outlined"
      value={country}
      onChange={(e) => {
      setCountry(e.target.value);
     }} 
     />
      <TextField 
      id="outlined-basic" 
      label="Zipcode" 
      variant="outlined" 
      value={zipcode}
      onChange={(e) => {
      setZipcode(e.target.value);
     }} 
      />
      
    </Box>
    </div><br/>
    <div style={{textAlign:"center"}}>
    <Button
       type="submit"
       variant="contained"
      color="primary">
       Submit
      </Button>
    </div>
   
    </form>
    </div>




    <div style={{ textAlign: 'left' }}>
        <Button href="Profile" variant="text" >
         BACK
        </Button>
         </div> 

        </Container>
      </Box>   
    </div>

  )
}

export default Add_address