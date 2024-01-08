import React from 'react'
import { Button, FormControl, MenuItem, TextField } from "@mui/material";
import { Box, Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState } from 'react';
import API_IP_ADDRESS from '../../../Config';

const Occupation =[
  {label:"House Wife",value:"option1"},
  {label:"Retired",value:"option2"},
  {label:"Salaried",value:"option3"},
  {label:"Self Employed",value:"option4"},
  {label:"Self Employed Professional",value:"option5"},
  {label:"Student Above 18 years",value:"option6"},
  {label:"Politicians",value:"option7"},
  {label:"Others",value:"option8"}
]
const Earning=[
  {label:"Lessthan 1 Lakh per Annum",value:"option1"},
  {label:"Rs 1 to 3 Lakh per Annum",value:"option2"},
  {label:"3 Lakh to 10 Lakh per Annum",value:"option3"},
  {label:"Rs 10 L to Rs 30 Lakh per Annum",value:"option4"},
  {label:"More than Rs. 30 Lakh per Annum",value:"option5"},

]

function Income_Verification() {
  const [occupation,setOccupation]=useState([])
  const [earning, setEarning]=useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch( `${API_IP_ADDRESS}/users/IncomeVerification`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          occupation: occupation,
          earning: earning ,
        }),
      });
      const responseData = await response.json();
      if (responseData.status===true) {
        
        console.log('Income Varification  successful!');
        alert('Income Varification  successful!')
      } else {
       
        console.log('Income varification failed.');
      }
    } catch (error) {
      console.error('There was a problem with the API request:', error);
    }
  };
  
  return (
    <div>
    



<Box sx={{ mt: 3 }} >
        <Container component="main" maxWidth="xs" 
         style={{
         padding: "20px",
         boxShadow: "4px 2px 8px 2px #ACB1D6",
         borderRadius: "8px",
         width:"50%",
        fontFamily: "open sans,Helvetica,Arial,sans-serif",
      }}>
 <div style={{ textAlign: 'center' }}>
 <h2 style={{fontSize:"24px",textAlign:"center",color:"green" }}>INCOME VARIFICATION</h2><br/>
          
        <br />
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
               <TextField
                  id="standard-select-Operator"
                  select
                  label="Select Occupation"
                  InputProps={{ style: { borderRadius: '5px' } }}
                  value={occupation}
                  onChange={(e) => {
                    setOccupation(e.target.value);
                  }}
                >
                  {Occupation.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <br/>
                <TextField
                  id="standard-select-Operator"
                  select
                  label="Select Income"
                  InputProps={{ style: { borderRadius: '5px' } }}
                  value={earning}
                  onChange={(e) => {
                    setEarning(e.target.value);
                  }}
                >
                  {Earning.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                  <br/> 
             <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '20px', fontSize: '16px' }}>
                  Done
          </Button>
          </div>
          </form>
          </div>
          <br/>
          <div style={{ textAlign: 'left' }}>
        <Button href="Profile_Index" variant="text">
          BACK
        </Button>
      </div> 
        </Container>
      </Box>
  </div>
  )
}

export default Income_Verification
