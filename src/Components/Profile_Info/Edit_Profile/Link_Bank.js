import React, { useState ,useEffect} from 'react';
import { TextField } from "@mui/material";
import { Box, Container, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import API_IP_ADDRESS from '../../../Config';

function Link_Bank() {
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

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setBankData(data)
        setIsLoading(false);
      }, 2000);
    }
    
  }, []);
 
const data = location.state?.data
 

useEffect(()=>{
  if (data) {
    setBankData(data)
  }
},[bankData])
 

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (accountNumber !== reEnterAccountNumber){
        alert(" Account Number don't match");
    }else{
      const response = await fetch( `${API_IP_ADDRESS}/users/addBankAccount`, {
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
       
         alert('Account addedd  successful!');
        navigate('/Mainpage/Profile_Index')
        // window.location.reload()
      } else {
       
        console.log('Account addedd failed.');
      }
    }
    } catch (error) {
      console.error('There was a problem with the API request:', error);
    }
  };
  return (
    <div>
      
    <div><br/>
      {
      bankData ?(
        <div 
         style={{
          padding: "20px",
          boxShadow: "4px 2px 8px 2px #ACB1D6",
          borderRadius: "8px",
          width:"50%",
         fontFamily: "open sans,Helvetica,Arial,sans-serif",
        marginLeft:"20%"
       }}>
        
         <div >
        
         <h2 style={{fontSize:"24px",textAlign:"center",color:"green" }}>USER BANK DETAILS</h2><br/>

         <div style={{fontSize:"24px"}}>
         <p>Account Holder Name: {bankData.account_name} </p><br/>
         <p>Account Number: {bankData.account_number}</p><br/>
         <p>Bank Name: {bankData.bank_name}</p><br/>
         <p>IFSC Code: {bankData.ifsc_code}</p><br/>

         </div>

         <br/>

         <div style={{textAlign:"center"}}>
           <Button
                 href="Update_Bank"
                 variant="contained"
                 color="primary"
                 style={{  fontSize: "16px" }}
               >
                Update bank
               </Button>

               <Button
                href="Add_Nominee"  
                 variant="contained"
                 color="primary"
                 style={{   fontSize: "16px",marginLeft:"30px" }}
               >
                 Add Nominee
               </Button>
         </div>

          <br/>     
       </div>
       <Button href="Profile_Index" variant="text">
          BACK
         </Button>
      
               </div>
      ):(
        <div>
   
            <Box sx={{ mt: 3 }} 
            style={{
              padding: "20px",
              boxShadow: "4px 2px 8px 2px #ACB1D6",
              borderRadius: "8px",
              width:"50%",
             fontFamily: "open sans,Helvetica,Arial,sans-serif",
            marginLeft:"20%"
           }} >
        <Container component="main" maxWidth="xs">
          <div style={{ textAlign: "center" }}>
            <h3>Link / Add  Bank Account</h3><hr/>
            <br />
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
                InputProps={{ style: { borderRadius: "5px" } }}
                onChange={(e) => {
                  setReEnterAccountNumber(e.target.value);
                }}
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
              <Button
                variant="contained"
                color="primary"
                style={{ borderRadius: "20px", fontSize: "16px" }}
                onClick={handleSubmit} 
              >
                ADD
              </Button>
              <br />
              <div style={{ textAlign: 'left' }}>
    <Button href="Profile_Index" variant="text">
     BACK
    </Button>
  </div>
            </div>
          </div>
        </Container>
      </Box>
    </div>
      )}
    </div>
    
    </div>
  )
}

export default Link_Bank
