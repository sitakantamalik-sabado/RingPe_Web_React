import React from 'react'
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function Set_Cap() {
    const [d_Usage,setD_Usage] = useState('option1')
    const handleD_Usage =(e)=>{
        setD_Usage(e.target.value)
    }
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
 <h2 style={{fontSize:"24px",textAlign:"center",color:"green" }}>Set Usage CAP</h2><br/>

            
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "20px", fontSize: "16px" }}
          >
            Enable Usage CAP
          </Button>
          <br/>

         
          <InputLabel  id="demo-customized-select-label">
            Daily Usage CAP
          </InputLabel>
          <Select
            required
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            label="Daily Usage CAP"
            defaultValue="option1"
            value={d_Usage}
            fullWidth
            onChange={handleD_Usage}
          >
            <MenuItem value='option1' >What was your childhood nickname?</MenuItem>
            <MenuItem value='option2'>What is the name of your favorite childhood friend?</MenuItem>
            <MenuItem value='option3'>What is the middle name of your youngest child?</MenuItem>
            <MenuItem value='option4'>What is your oldest sibling's middle name?</MenuItem>
          </Select>
          <br />

     

          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: "20px", fontSize: "16px" }}
          >
            Done
          </Button>
          <br />
        </div>
      


       
          </div>
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

export default Set_Cap
