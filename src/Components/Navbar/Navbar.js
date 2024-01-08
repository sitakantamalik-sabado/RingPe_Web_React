 // Navbar.js
import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
import { styled } from '@mui/material/styles';
 import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../Images/ringpe cicle white.png"
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem,  Modal, Badge, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
 import API_IP_ADDRESS from "../../Config";
import { useNavigate } from "react-router-dom";
 import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// import customer from "../images/customerCare.png"
import Tooltip from '@mui/material/Tooltip';
import ReportIcon from '@mui/icons-material/Report';
import Avatar from '@mui/material/Avatar';
 
const style = {
  position: 'absolute',
  top: '45%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border:"none",
  boxShadow: 24,
  p: 2, 
};

const Logo = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(10),
    height: theme.spacing(7),
  }));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userData, setUserData] = useState({});
  const [balance, setBalance] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [customeropen, setCustomeropen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [notificationData, setNotificationData] = useState([]);
  const [count_notifi, setCount_notifi] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openedNotifications, setOpenedNotifications] = useState([]);
  const handlesupportopen = () => setCustomeropen(true)
  const handlesupportclose = () => setCustomeropen(false)
  const [comments, setComments] = useState("");
  const [open1, setOpen1] = React.useState(false);

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const navigate = useNavigate()

  const handleProfile = () => {
    navigate('/Mainpage/Profile')
    handleClose1()
  }

  const handleMinistatement = () => {
    navigate('/Mainpage/Ministatement')
    handleClose1()
  }


  useEffect(() => {
    const storedCount = localStorage.getItem("notificationCount");
    if (storedCount) {
      setCount_notifi(parseInt(storedCount));
    } else {
      setCount_notifi(notificationData.length);
    }
  }, [notificationData.length]);



  const handleNotificationClick = (index) => {
    const updatedNotifications = [...notificationData];
    updatedNotifications[index].clicked = true;

    const notificationId = updatedNotifications[index].grievance_id;
    if (!openedNotifications.includes(notificationId)) {
      const newOpenedNotifications = [...openedNotifications, notificationId];
      setOpenedNotifications(newOpenedNotifications);

      const newCount = count_notifi - 1;
      setCount_notifi(newCount);
      localStorage.setItem("notificationCount", newCount.toString());
    }

    setNotificationData(updatedNotifications);
    setSelectedNotification(updatedNotifications[index]);
  };


  const handleClosePopup = () => {
    setSelectedNotification(null);
  };

 

  const handleLogout = () => {
    return fetch(`${API_IP_ADDRESS}/users/logout`, {
      method: 'GET',
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
       
        if (data.status === 'true') {
          console.log('logout Success !')
          navigate('/');
        } else {
          console.log("Invalid Creadentials")
        }
      })
  }

  useEffect(() => {
    const apiUrl = `${API_IP_ADDRESS}/users/dashboard`;
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        setUserData(responseData.data);
        setBalance(responseData.balance);
      })
      .catch((error) => {
        console.error("There was a problem fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = `${API_IP_ADDRESS}/users/ticketUpdateNotification`;
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        setNotificationData(responseData.data);
        setCount_notifi(responseData.data.length);
      })
      .catch((error) => {
        console.error("There was a problem fetching data:", error);
      });
  }, []);
   

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <nav>
      <AppBar className='nav' sx={{ backgroundColor: '#3746C8' }}>
        <Toolbar>
          {/* Left side - Logo */}
     
         <Link to="/Mainpage"> 
          <Logo alt="Logo" src={logo} /></Link>

          {/* Right side - Icons */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            {/* <IconButton color="inherit">
              <SearchIcon />
            </IconButton> */}

{/* customer support page */}
            <IconButton
            color="inherit"
            href="/Mainpage/Customer_support">
            <Tooltip title="Customer Support">
              <SupportAgentIcon />
            </Tooltip>
          </IconButton>{" "}
             

            <IconButton
            size="large"
            color="inherit"
            onClick={handleOpen}
          >
            <Badge badgeContent={count_notifi} color="secondary">
              <Tooltip title="Noftifications">
                <NotificationsIcon />
              </Tooltip>
            </Badge>
          </IconButton>
            

            <div className='profile_icon' onClick={handleOpen1}>
         <Avatar style={{ width: "30px", height: "30px", color: "blue" }}    />
         <span style={{ marginLeft: '4px' }}>  Hello, {userData.first_name}</span>
           </div>
{/* modal for profile */}
           <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"   >

           <Box  className="modal-page"  >
              <button
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "6px",
                  padding: "5px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "black",
                }}
                onClick={handleClose1}
              >
                X
              </button><br/>
              <Typography id="modal-modal-title" variant="h6" component="h2" display="flex" >

              <Avatar style={{ width: "35px", height: "35px", color: "blue"  }} sx={{ marginLeft: 1 }} /> {""}
                <span style={{ marginLeft: '8px',fontWeight:"bold" }}>Hello, {userData.first_name}{userData.last_name}</span>
                 
                
              </Typography><br/>
               <hr/>
              <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                <div>
                  <div className="element1"
                    onClick={handleProfile}
                    style={{ display: "flex", gap: "3%", cursor: "pointer", alignItems: 'center' }} >
                    <PermIdentityIcon /><p >Edit Profile</p>
                     
                  </div> 
                  <div className="element2" style={{ display: "flex", gap: "3%", cursor: "pointer", alignItems: 'center' }} ><SettingsIcon /> <p>Settings & Privacy</p>
                      </div> 

                  <div className="element3" style={{ display: "flex", gap: "3%", cursor: "pointer", alignItems: 'center' }} ><HelpIcon /><p>Help & Support</p>
                    
                  </div> 
                  <div className="element4" onClick={handleMinistatement} style={{ display: "flex", gap: "3%", cursor: "pointer", alignItems: 'center' }} ><ReportIcon /><p>Mini Statement</p>
                     
                  </div> 

                  <div className="element5" onClick={handleLogout} style={{ display: "flex", gap: "3%", cursor: "pointer", alignItems: 'center' }} onClose={handleClose}> <LogoutIcon /><p> Logout</p>
                     
                  </div> 
                </div>
              </Typography>
            </Box>
        </Modal>


{/* modal for notification */}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box>
              <div className="notification_style">
                <button
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "6px",
                    padding: "5px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "black",
                  }}
                  onClick={handleClose}
                >
                  X
                </button>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  color="black"
                ><br/>
                  Notifications
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 0, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                    onClick={handleClose}
                  >
                    {notificationData.map((notification, index) => (
                      <div
                        key={notification.grievance_id}
                        style={{
                          backgroundColor: notification.clicked ? "#fff" : "#eee",
                          padding: "1px 1px 1px 6px",
                          borderRadius: "10px",
                          marginBottom: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleNotificationClick(index)}
                      >
                        <p>{notification.issue}</p>
                        <p style={{ fontSize: "12px" }}>
                          Hey User! {userData.first_name}, Your Status has
                          changed, your Transaction Id :
                          {notification.transaction_ref_id}
                        </p>
                      </div>
                    ))}
                  </Box>
                </Typography>
              </div>
            </Box>
          </Modal>
          
          <div>

            {selectedNotification && (
              <div className="popup_Notification">
                <button
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    padding: "5px",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "28px",
                  }}
                  onClick={handleClosePopup}
                >
                  &times;
                </button>
                <div style={{ width: "100%", padding: "20px 0px 10px 0px" }}>
                  <h3 style={{ color: "black" }}>Your Ticket Status</h3>
                  <br />
                  <p>
                    Complaint Satus:{" "}
                    <span style={{ color: "black" }}>
                      {selectedNotification.complaint}
                    </span>{" "}
                  </p>
                  <p>Resolution: {selectedNotification.resolution} </p>
                  <p> Transaction Date: {selectedNotification.transaction_date}</p>
                  <p>Transaction Amount: {selectedNotification.transaction_amount}</p>
                  <p>Transaction Id: {selectedNotification.transaction_ref_id} </p>
                </div>
              </div>
            )}
          </div>






          </div>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;

