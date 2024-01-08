import React, { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import API_IP_ADDRESS from "../../Config";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';

const style = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: 550,
  bgcolor: 'background.paper',
  borderRadius: "5px",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Profile() {
  const [userData, setUserData] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const apiUrl = `${API_IP_ADDRESS}/users/profile`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setUserData(responseData.data);

      })
      .catch((error) => {
        console.error('There was a problem fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = `${API_IP_ADDRESS}/users/profileInfo`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        setUserData(responseData.data);

      })
      .catch((error) => {
        console.error('There was a problem fetching data:', error);
      });
  }, []);

  return (
    <div style={{marginTop:"70px",marginBottom:"70px"}}  >
      <Box >
        <Container component="main" maxWidth="xs" style={{
          padding: "20px",
          boxShadow: "4px 4px 8px 2px #3746C8",
          backgroundColor:"#3746C8",
          borderRadius: "8px",
          width: "60%",
          fontFamily: "open sans,Helvetica,Arial,sans-serif",
        }}>
          <div style={{ textAlign: "center" }}>
            <img style={{ width: "16%" }} src="https://assetscdn1.paytm.com/frontendcommonweb/9fd9626b.svg" />
            <div>
              <p style={{ color: "white" }}> {userData.first_name} {userData.last_name}</p>
              <p style={{ color: "white" }}>{userData.email}</p>

            </div>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }} >
              <Button variant="outlined" style={{ justifyContent: "space-evenly",backgroundColor:"white" }} onClick={handleOpen} >

                <MenuItem>
                  <ListItemIcon>
                    <ManageAccountsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>  Profile Info  </ListItemText>
                </MenuItem>

              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <button
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "6px",
                      padding: "5px",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "black",
                    }}
                    onClick={handleClose}
                  >
                    X
                  </button>

                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    <div style={{ textAlign: "center", color: "green" }}>
                      <img style={{ width: "15%" }} src="https://assetscdn1.paytm.com/frontendcommonweb/9fd9626b.svg" />
                    </div>
                  </Typography>
                  <hr />
                  <div> 

                    <div>
                      <div style={{ display: "flex" }}>Name: <p style={{ color: "#70aed6" }}>{userData.first_name} {userData.last_name}</p> </div> 
                      <div style={{ display: "flex" }}>Email: <p style={{ color: "#70aed6" }}>{userData.email}</p> </div> 
                      <div style={{ display: "flex" }}>DOB: <p style={{ color: "#70aed6" }}> {userData.dob}</p> </div> 
                      <div style={{ display: "flex" }}>Mobile: <p style={{ color: "#70aed6" }}>{userData.mobile}</p> </div>   
                      <div style={{ display: "flex" }}>Last Login: <p style={{ color: "#70aed6" }}>{userData.last_login}</p> </div> 
                      <div style={{ display: "flex" }}>Wallet Login: <p style={{ color: "#70aed6" }}> {userData.wallet_no}</p> </div> 
                      <div style={{ display: "flex" }}>Address: <p style={{ color: "#70aed6" }}> {userData.address}</p> </div> 

                    </div>
                  </div>
                  <br />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <div> <Button
                      href='profile'
                      variant="contained"
                      color="primary">
                      BACK
                    </Button>   </div>


                    <div> <Button href='Profile_Index' variant="contained"
                      color="primary"> EDIT </Button>
                    </div>


                  </div>
                </Box>

              </Modal>


              <br />
              <Button href='Profile_Index' variant="outlined" style={{backgroundColor:"white"}} >
                <MenuItem>
                  <ListItemIcon>
                    <BorderColorOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>Edit Profile </ListItemText>
                </MenuItem>
              </Button>
              <br />
              <Button href='Add_address' variant="outlined" style={{backgroundColor:"white"}} >

                <MenuItem>
                  <ListItemIcon>
                    <HomeOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>  Address book  </ListItemText>
                </MenuItem>

              </Button>

              <br />
              <Button variant="outlined" style={{backgroundColor:"white"}} >

                <MenuItem>
                  <ListItemIcon>
                    <HelpCenterOutlinedIcon />
                  </ListItemIcon >
                  <ListItemText > {""}{""}   Help Center </ListItemText>
                </MenuItem>

              </Button>
              <br />
              <Button variant="outlined" style={{backgroundColor:"white"}}>

                <MenuItem>
                  <ListItemIcon>
                    <InfoOutlinedIcon style={{marginRight:"40px"}} />
                  </ListItemIcon>
                  <ListItemText>About  Us </ListItemText>
                </MenuItem>
              </Button>
              <br />
              <br />
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

export default Profile;
