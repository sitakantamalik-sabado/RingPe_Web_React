import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import API_IP_ADDRESS from '../../../Config';

function Change_Password() {
  const navigate = useNavigate();
  const [password, setpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passFailedMessage, setPassFailedMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newpassword !== confirmPassword) {
        alert("New Passwords don't match");
      } else {
      const response = await fetch(`${API_IP_ADDRESS}/users/passwordUpdate` , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          password: password,
          newpassword: newpassword,
        }),
      });
      const responseData = await response.json();
      if (responseData.status===true) {
        
        console.log('password change was successful!');
        alert("Password Changed Sucessful")
        navigate('/')
      } else {
      
        console.log('password change failed.');
        setPassFailedMessage(responseData.message)
        alert(passFailedMessage)
        //Malik@4242
      }
      }
    } 
    catch (error) {
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
 
 <h2 style={{fontSize:"24px",textAlign:"center",color:"green" }}>CHANGE PASSWORD</h2><br/>

     
         
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>

                <TextField
                  required
                  label="Current Password"
                  InputProps={{ style: { borderRadius: '5px' } }}
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                <br />
                <TextField
                  required
                  label="Enter New Password"
                  value={newpassword}
                  InputProps={{ style: { borderRadius: '5px' } }}
                  onChange={(e) => {
                    setnewpassword(e.target.value);
                  }}
                />
                <br />
                <TextField
                  required
                  label="Re-Enter New Password"
                  value={confirmPassword}
                  InputProps={{ style: { borderRadius: '5px' } }}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              
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

export default Change_Password;


