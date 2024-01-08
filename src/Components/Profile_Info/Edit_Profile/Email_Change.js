import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuItem from '@mui/material/MenuItem';
import API_IP_ADDRESS from '../../../Config';
import { useNavigate } from 'react-router-dom';

const Reason = [
  { label: 'Reason 1', value: 'reason1' },
  { label: 'Reason 2', value: 'reason2' },
  { label: 'Reason 3', value: 'reason3' },
];

function Email_Change() {
  const [newEmail, setNewEmail] = useState('');
  const [reason, setReason] = useState('');
  const [confirmNewEmail,setConfirmNewEmail]=useState("")
  const [passFailedMessage, setPassFailedMessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newEmail !== confirmNewEmail) {
        alert("New Email don't match");
      } else {
      const response = await fetch(`${API_IP_ADDRESS}/users/emailUpdate`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          newemail: newEmail,
          email_change_reason: reason,
        }),
      });
      const responseData = await response.json();
      if (responseData.status===true) {
       
        console.log('Email change was successful!');
        alert("Email Changed Sucessful")
        //  navigate('Mainpage/Profile')
      } else {
        
        console.log('Email change failed.');
        setPassFailedMessage(responseData.message)
        alert(passFailedMessage)
      }
    } 
  }
    catch (error) {
      console.error('There was a problem with the API request:', error);
    }
  };

  return (
    <div>

      <Box sx={{ mt: 12 }} >
        <Container component="main" maxWidth="xs" 
         style={{
         padding: "20px",
         boxShadow: "4px 2px 8px 2px #ACB1D6",
         borderRadius: "8px",
         backgroundColor:"#3746c8",
         width:"50%",
        fontFamily: "open sans,Helvetica,Arial,sans-serif",
      }}>
 <div style={{ textAlign: 'center' }}>

 <h2 style={{fontSize:"24px",textAlign:"center",color:"white" }}>UPDATE EMAIL</h2><br/>

             
         
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
                  placeholder="Enter New Email"
                  InputProps={{ style: { borderRadius: '5px',backgroundColor:"white" } }}
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
                <br />
                <TextField
                  required
                  placeholder="Re-Enter New Email"
                  InputProps={{ style: { borderRadius: '5px',backgroundColor:'white' } }}
                  onChange={(e) => {
                    setConfirmNewEmail(e.target.value);
                  }}
                />
                <br />
                 
                <TextField
                 id="outlined-textarea"
                  select
                  
                  // label="Email Change Reason"
                  placeholder="Email Change Reason"
                  multiline
                  InputProps={{ style: { borderRadius: '5px',backgroundColor:"white" } }}
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                >
                  {Reason.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: '20px', fontSize: '16px' }}
                >
                  Done
                </Button>
                <br />
              </div>
            </form>
          </div>
          <div style={{ textAlign: 'left' }}>
        <Button href="Profile_Index" variant="text">
          BACK
        </Button>
      </div>
          
        </Container>
      </Box>

    </div>
  );
}

export default Email_Change;

