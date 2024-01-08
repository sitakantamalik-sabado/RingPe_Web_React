import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import API_IP_ADDRESS from '../../../Config';

const Relation=[
    {label:"Father",value:"option1"},
    {label:"Son",value:"option2"},
    {label:"Mother",value:"option3"},
    {label:"Sister",value:"option4"},
    {label:"Brother",value:"option5"} ,
    {label:"Grand Father",value:"option6"},
    {label:"Wife",value:"option7"},
    {label:"Uncle",value:"option8"},
    {label:"Daughter",value:"option9"},
    {label:"Daughter In Low",value:"option10"},
    {label:"Grand Mother",value:"option11"}
]

function Add_Nominee() {
    const[relation,setRelation]=useState([])
    const [name,setName]=useState([])
    const[dob,setDob]=useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${API_IP_ADDRESS}/users/addNominee`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
            name:name,
            relation:relation,
            dob:dob
            }),
          });
          const responseData = await response.json();
          if (responseData.status===true) {
            
            console.log('Nominee Added successful!');
            alert("Nominee Added successful!")
          } else {
       
            console.log('Nominee Added failed.');
            alert("Nominee Added failed")
          }
        } catch (error) {
          console.error('There was a problem with the API request:', error);
        }
      };
    


  return (
    <div>
        
        
  <Box sx={{ mt: 3 }}
   style={{
    padding: "20px",
    boxShadow: "4px 2px 8px 2px #ACB1D6",
    borderRadius: "8px",
    width:"50%",
   fontFamily: "open sans,Helvetica,Arial,sans-serif",
  marginLeft:"20%"
 }}  
  >
        <Container component="main" maxWidth="xs">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{fontSize:"24px",textAlign:"center",color:"green" }}>ADD NOMINEE DETAILS</h2><br/>

           
            <br />
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <TextField
                  required
                  label="Enter Name"
                  InputProps={{ style: { borderRadius: '5px' } }}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <br />
                <TextField
                  id="standard-select-Operator"
                  select
                  label="Relation"
                  InputProps={{ style: { borderRadius: '5px' } }}
                  value={relation}
                  onChange={(e) => {
                    setRelation(e.target.value);
                  }}
                >
                  {Relation.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <TextField
                  required
                  label="DOB"
                  type='date'
                  focused
                  InputProps={{ style: { borderRadius: '5px' } }}
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
               
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '20px', fontSize: '16px' }}
                >
                Update Nominee Detail
                </Button>
                <br />
              </div>
              <div style={{ textAlign: 'left' }}>
    <Button href="Profile_index" variant="text">
     BACK
    </Button>
  </div>
            </form>
          </div>
        </Container>
      </Box>


  
  
  
  </div>
  )
}

export default Add_Nominee