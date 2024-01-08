import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Box, Container, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link } from "react-router-dom";

import API_IP_ADDRESS from '../../../Config';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import ListItemButton from '@mui/material/ListItemButton';

function Profile_Index() {
  const [userData, setUserData] = useState()

  useEffect(() => {
    const apiUrl =`${API_IP_ADDRESS}/users/getBankAccount`;
    fetch(apiUrl, {
      method: 'GET',

      credentials: "include",
    })
      .then((response) => response.json())
      .then((responseData) => {
        const data = JSON.stringify(responseData.data)
        const data2 = JSON.parse(data)
 
        setUserData(responseData.data);
 
      })
      .catch((error) => {
        console.error('There was a problem fetching data:', error);
      });

  }, [])
  




  return (
    <div  style={{marginTop:"60px",marginBottom:"80px"}}>
      <Box   >
        <Container component="main"   style={{
         padding: "20px",
         boxShadow: "4px 2px 8px 2px #ACB1D6",
         backgroundColor:"#3746C8",
         borderRadius: "8px",
         width:"40%",
        fontFamily: "open sans,Helvetica,Arial,sans-serif",
       
      }}>
        <div style={{textAlign:"center"}}>   <img   src="https://assetscdn1.paytm.com/frontendcommonweb/9fd9626b.svg"/><br/><br/>
    </div>
   
        <h2 style={{fontSize:"24px",textAlign:"center",color:"white" }}>EDIT INFORMATION</h2><br/>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                
              }}
            >
                   
                 {/* <Button  variant="outlined" className="nav-link"  >
                 <Link  to="/Mainpage/Email_Change" state={{ data: userData }} >
              <ListItemButton>
        <ListItemIcon>
        <MarkEmailReadOutlinedIcon /> 
        </ListItemIcon>
        <ListItemText primary="Change Email Address" />
      </ListItemButton>
      </Link>
      </Button> */}
      <Button variant="outlined" className="nav-link" style={{ textDecoration: "none",backgroundColor:"white" }}>
  <Link to="/Mainpage/Email_Change" state={{ data: userData }} style={{ textDecoration: "none" }}>
    <ListItemButton>
      <ListItemIcon>
        <MarkEmailReadOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Change Email Address" />
    </ListItemButton>
  </Link>
</Button>

              <br />

             
                <Button  variant="outlined" style={{ textDecoration: "none" ,backgroundColor:"white"}} >
                <Link  to="/Mainpage/Change_Password" state={{ data: userData }} style={{ textDecoration: "none" }} >
              <ListItemButton>
        <ListItemIcon>
        <LockClockOutlinedIcon style={{marginLeft:"-18%"}} /> 
        </ListItemIcon>
        <ListItemText primary="Change Password" />
      </ListItemButton>
      </Link>
      </Button>
              <br />

             
                  <Button  variant="outlined" style={{ textDecoration: "none" ,backgroundColor:"white"}} >
                  <Link  to="/Mainpage/T_Pin" state={{ data: userData }} style={{ textDecoration: "none" }}>
              <ListItemButton>
        <ListItemIcon>
        <PushPinOutlinedIcon  style={{marginLeft:"-130%"}}/> 
        </ListItemIcon>
        <ListItemText primary="T-PIN" />
      </ListItemButton>
      </Link>
      </Button>


              <br />
              <Button  variant="outlined"  style={{ textDecoration: "none",backgroundColor:"white" }}>
              <Link  to="/Mainpage/Set_Cap" state={{ data: userData }} style={{ textDecoration: "none" }}>
              <ListItemButton>
        <ListItemIcon>
        <AccessibleOutlinedIcon   style={{marginLeft:"-65%"}}/> 
        </ListItemIcon>
        <ListItemText primary="Set Usage Cap" />
      </ListItemButton>
      </Link>
      </Button>
              
            
              <br />

         {/* <Button href='/Mainpage/Link_Bank' variant="outlined" state={{ data: userData }} >
              <ListItemButton>
        <ListItemIcon>
        <AccountBalanceOutlinedIcon /> 
        </ListItemIcon>
        <ListItemText primary="Update Bank Account" />
      </ListItemButton>
      </Button> */}
              

                 <Button variant="outlined" style={{ textDecoration: "none",backgroundColor:"white" }}>
                    <Link  to="/Mainpage/Link_Bank" state={{ data: userData }} style={{ textDecoration: "none" }}>
                    <ListItemButton>
        <ListItemIcon >  
        <AccountBalanceOutlinedIcon /> 
        </ListItemIcon>
        <ListItemText primary="Update Bank Account" />
      </ListItemButton>
                  </Link>
                </Button>
              <br />

      
                <Button  variant="outlined"  style={{ textDecoration: "none" ,backgroundColor:"white"}}>
                <Link  to="/Mainpage/Income_Verification" state={{ data: userData }} style={{ textDecoration: "none" }}>
              <ListItemButton>
        <ListItemIcon>
        <CurrencyExchangeOutlinedIcon /> 
        </ListItemIcon>
        <ListItemText primary="Income Verification" />
      </ListItemButton>
      </Link>
      </Button>
              <br />
            </div>
          </div>
          <div style={{ textAlign: 'left',color:"white" }}>
        <Button href="Profile" variant="text" >
         BACK
        </Button>
      </div> 
      </Container>
      </Box>
      
    </div>
  );
}

export default Profile_Index;
