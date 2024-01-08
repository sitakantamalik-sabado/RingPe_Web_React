import React from "react";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Box,  Container, CircularProgress } from "@mui/material";

function Customer_support() {
  const [comments, setComments] = useState("");
  return (
    <div style={{marginTop:"80px",marginBottom:"70px"}}>

    <Box sx={{ mt: 3 }} >
            <Container component="main" maxWidth="xm"  style={{
             padding: "20px",
             boxShadow: "4px 2px 8px 2px #ACB1D6",
             borderRadius: "8px",
             width:"70%",
            fontFamily: "open sans,Helvetica,Arial,sans-serif"  }}>
    

    <div>
      <div>
        <TextField
          required
          id="comments"
          label="Comments"
          value={comments}
          multiline
          rows={2}
          style={{width:"100%"}}
          onChange={(e) => {
            setComments(e.target.value);
            
          }} /><br/><br/>
        
        <div style={{textAlign:"center"}}>
          <Button variant="contained">Submit</Button>
        </div>

        <br />

        <div style={{ display:"flex",textAlign:"center",justifyContent:'center' }}>
          <Button href="tel:+918999999999">
            <CallIcon />Call
          </Button><br/>
          <Button href="mailto:someone@yoursite.com">
            <EmailIcon /> Email
          </Button><br/>
          <Button href="https://wa.me/+919999999999">
            <WhatsAppIcon /> WhatsApp 
          </Button>
        </div>


      </div>
    </div>

    <div style={{ textAlign: 'left' }}>
        <Button href="Mainpage" variant="text" >
         BACK
        </Button>
         </div> 

        </Container>
      </Box>   
    </div>
  );
}

export default Customer_support;
