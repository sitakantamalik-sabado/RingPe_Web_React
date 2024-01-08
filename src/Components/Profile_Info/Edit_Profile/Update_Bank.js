import React,{useState,useEffect} from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom'
import { TextField } from "@mui/material";
import { Box, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import API_IP_ADDRESS from '../../../Config';

const Reason = [
    { label: 'Existing Account Is closed', value: 'reason1' },
    { label: 'I want to use a new Account', value: 'reason2' },
  ];

function Update_Bank() {
    const location = useLocation();
    const navigate = useNavigate();
    const [accountHoldername , setaccountHoldername] = useState('');
    const [bankName, setbankName] = useState('');
    const [ifscCode, setifscCode] = useState('');
    const [accountNumber, setaccountNumber] = useState('');
    const [reason, setreason] = useState('');
    const [userData,setUserData]=useState("")
    const [bankData,setBankData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [reEnterAccountNumber,setReEnterAccountNumber]=useState('');
    //Add bank account


   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (accountNumber !== reEnterAccountNumber){
            alert(" Account Number don't match");
        }else{
        const response = await fetch(`${API_IP_ADDRESS}/users/addBankAccount`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
         account_name : accountHoldername,
         bank_name: bankName,
         ifsc_code:ifscCode,
         account_number:accountNumber,
         account_update_reason:reason
        }),
      });
      const responseData = await response.json();
      if (responseData.status===true) {
  
        alert('Account Updated  successful!');
        navigate('/Mainpage/Profile_Index')
        // window.location.reload()
      } else {
      
        console.log('Account Updated failed.');
      }
    }
    } catch (error) {
      console.error('There was a problem with the API request:', error);
    }
  };

  return (
    <div>
    <div>
    <Box sx={{ mt: 3 }} 
          style={{
            padding: "20px",
            boxShadow: "4px 2px 8px 2px #ACB1D6",
            borderRadius: "8px",
            width:"50%",
           fontFamily: "open sans,Helvetica,Arial,sans-serif",
          marginLeft:"20%"
         }}   >
      
           <h2 style={{fontSize:"24px",textAlign:"center",color:"green" }}>UPDATE YOUR BANK ACCOUNT</h2><br/>

        <Container component="main" maxWidth="xm">
          <div style={{ textAlign: "center" }}>
            
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                label="Account Holder Name"
                value={accountHoldername}
                InputProps={{ style: { borderRadius: "5px" } }}
                onChange={(e) => {
                  setaccountHoldername(e.target.value);
                }}

              />
              <br />
              <TextField
                required
                label="Bank Name"
                value={bankName}
                InputProps={{ style: { borderRadius: "5px" } }}
                onChange={(e) => {
                  setbankName(e.target.value);
                }}
              />
              <br />
              <TextField
                required
                label="Account Number"
                value={accountNumber}
                InputProps={{ style: { borderRadius: "5px" } }}
                onChange={(e) => {
                  setaccountNumber(e.target.value);
                }}
              />
              <br />

              <TextField
                required
                label="Re-Enter Account Number"
                value={reEnterAccountNumber}
                onChange={(e) => {
                    setReEnterAccountNumber(e.target.value);
                  }}
                InputProps={{ style: { borderRadius: "5px" } }}
              />
              <br />

              <TextField
                required
                label="IFSC Code"
                value={ifscCode}
                InputProps={{ style: { borderRadius: "5px" } }}
                onChange={(e) => {
                  setifscCode(e.target.value);
                }}
              />
              <br />
              {/* <TextField
                required
                label="Account Update Reason"
                value={reason}
                InputProps={{ style: { borderRadius: "5px" } }}
                onChange={(e) => {
                  setreason(e.target.value);
                }}
              /> */}
                 <TextField
                  id="standard-select-Operator"
                  select
                  label="Account Update Reason"
                  InputProps={{ style: { borderRadius: '5px' } }}
                  value={reason}
                  onChange={(e) => {
                    setreason(e.target.value);
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
            //   href='Mainpage/Link_Bank'
                variant="contained"
                color="primary"
                style={{ borderRadius: "10px", fontSize: "16px" }}
                onClick={handleSubmit} 
              >
              Update Account Details
              </Button>
              <br />
            </div>
            <div style={{ textAlign: 'left' }}>
      <Button href="Profile_index" variant="text">
        BACK
      </Button>
       </div>
          </div>
        </Container>
      </Box>
    </div>
         </div>
  )
}

export default Update_Bank