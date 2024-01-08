import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  CircularProgress,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";
import DialogContentText from "@mui/material/DialogContentText";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "./Mobile_Postpaid.css";
import { Box, Container, OutlinedInput, FormHelperText } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import API_IP_ADDRESS from "../../../Config";
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';




function Mobile_postpaid() {
  const location = useLocation();
  const [selectedOption, setSelectedOption] = React.useState("option1");
  const [userData, setUserData] = useState({});
  const [billerNames, setBillerNames] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState("");
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState([]);
  const [ip, setIp] = useState("");
  const ip_address = location.state?.data;
  const [mobileError, setMobileError] = useState("");
  const [open, setOpen] = React.useState(false);
  const [billDetails, setBillDetails] = React.useState({});
  const [selectedBillerId, setSelectedBillerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [refId, setRefId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [paymentResponseModalOpen, setPaymentResponseModalOpen] = useState(false);
  const handleClose1 = () => setOpen(false);

  const [paylocation, setPaylocation] = useState('')

  useEffect(() => {
    fetch("https://api.ipify.org/?format=json")
      .then((res) => res.json())
      .then((data) => {

        setIp(data.ip);
      });
  }, []);

  useEffect(() => {
    const apiUrl = `${API_IP_ADDRESS}/bills/getMobilePostpaidOperators`;
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
        if (responseData.status === true) {
          setBillerNames(responseData.data);

        } else {
          console.error(
            "API response status is not true:",
            responseData.message
          );
        }
      })
      .catch((error) => {
        console.error("There was a problem fetching data:", error);
      });
  }, []);

  const handleMobileNumberChange = (e) => {
    const inputPhoneNumber = e.target.value.slice(0, 10); // Limit the input to 10 characters
    setMobileNumber(inputPhoneNumber);
    // Regular expression for a 10-digit mobile number
    const phoneRegex = /^\d{10}$/;
    // Check if the input matches the phone number pattern
    if (!phoneRegex.test(inputPhoneNumber)) {
      setMobileError("Please Enter a Valid 10-digit Mobile Number");
    } else {
      setMobileError("");
    }
  };

  // const handleBillerChange = (event) => {
  //   const selectedBiller = event.target.value;
  //   setSelectedBiller(selectedBiller);
  //   const selectedBillerId = billerNames.find(
  //     (biller) => biller.biller_name === selectedBiller
  //   ).biller_id;
  //   setSelectedBillerId(selectedBillerId);
  // };

  const handleBillerChange = (event, newValue) => {
    if (newValue) {
      setSelectedBiller(newValue.biller_name || "");
      setSelectedBillerId(newValue.biller_id || "");
    } else {
      setSelectedBiller("");
      setSelectedBillerId("");
    }
  };



  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpenDialog(true);
  };
  //const navigate = useNavigate();
  const handlePay = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        mobile: mobileNumber,
        ip: ip,
        mac: "30-03-C8-AC-15-F4",
        billerId: selectedBillerId,
        refId: refId,
        amount: amount,
      };


      const response = await fetch(
        `${API_IP_ADDRESS}/bills/mobilePostpaidBillPay`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();

      if (data.status === true) {
        setPaymentStatus("success");
        setBillDetails(data.data.result.payload);
        setPaymentResponseModalOpen(true);
      } else {
        setPaymentStatus("failure");

      }
    } catch (err) {

      setPaymentStatus("failure");
    }
  };
  const renderResponseScreen = () => {
    if (paymentStatus === "success") {
      return (
        <div>
          <h2>Payment Successful!</h2>
          {/* Render other success-related information */}
        </div>
      );
    } else if (paymentStatus === "failure") {
      return (
        <div>
          <h2>Payment Failed!</h2>
          {/* Render other failure-related information */}
        </div>
      );
    } else {
      // Render something while waiting for the API response
      return <p>Waiting for payment response...</p>;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${API_IP_ADDRESS}/bills/fetchBills`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        mobile: mobileNumber,
        ip: ip,
        mac: "30-03-C8-AC-15-F4",
        billerId: selectedBillerId,
        // refId: refId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.status === true) {
          setBillDetails(data.data.result.payload);
          //    let amount= billDetails.amount;
          //    let refId= billDetails.refId;
          setRefId(data.data.result.payload.refId);
          setAmount(data.data.result.payload.amount);
          handleOpen();
        } else {
          console.log("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => setLoading(false));
  };

  const postUserData = async (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${API_IP_ADDRESS}/payment_gateway/webbillpayumoney`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        refId: refId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.status === true) {
          const location = data.redirectUrl
          setPaylocation(location)
          window.location.href = location
        } else {
          console.log("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => setLoading(false));
  };


  return (

    <div>
      <Box sx={{ mt: 3 }} >
        <Container component="main" maxWidth="xm">
          <div>
            <div>
                <div>

                  {/* <TextField
                      label="Mobile Number"
                      variant="standard"
                      type="number"
                      value={mobileNumber}
                      onChange={handleMobileNumberChange}
                      error={!!mobileError}
                      helperText={mobileError}
                    />
                    <br /> */}
                  <FormControl fullWidth   variant="standard"  >
                    <OutlinedInput
                      sx={{
                        m: 1,
                        height: '40px',
                         width:"100%",
                        paddingLeft:"3%",
                        backgroundColor: 'white',
                        borderRadius: '50px',
                      }}
                      required
                      placeholder="Enter Mobile No *"
                      type="number"
                      autoFocus
                      value={mobileNumber}
                      maxLength={10}
                      onChange={handleMobileNumberChange}
                      error={!!mobileError}
                      helperText={mobileError}
                    />
                  </FormControl>
                  <FormHelperText style={{ color: 'white', textAlign: "center" }}> {mobileError}</FormHelperText>



                  {/* <FormControl variant="standard" fullWidth >
                      <Autocomplete
                        options={billerNames}
                        getOptionLabel={(option) => option.biller_name}
                        value={billerNames.find((biller) => biller.biller_id === selectedBillerId) || null}
                        onChange={handleBillerChange}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Operator" variant="standard"   />
                        )}
                      />
                    </FormControl> */}
                  
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <Autocomplete
                      options={billerNames}
                      getOptionLabel={(option) => option.biller_name}
                      value={billerNames.find((biller) => biller.biller_id === selectedBillerId) || null}
                      onChange={handleBillerChange}
                      
                      renderInput={(params) => (
                        <TextField  {...params} placeholder="Select an Options *"   
                        sx={{
                          width: "100%",  
                       
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "50px",
                              backgroundColor:"white",
                              height: "40px",
                              padding: "1px",
                       
                            legend: {
                              marginLeft: "30px"
                            }
                          },
                          "& .MuiAutocomplete-inputRoot": {
                            paddingLeft: "20px !important",
                            borderRadius: "50px"
                          },
                          "& .MuiInputLabel-outlined": {
                            paddingLeft: "20px"
                          },
                          "& .MuiInputLabel-shrink": {
                            marginLeft: "20px",
                            paddingLeft: "10px",
                            paddingRight: 0,
                            background: "white",
                            
                          }
                        }} />
                      )}
                    />
                  </FormControl>
                  <br />
                  <br /><br /><br /><br />
                  <div style={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      {loading && (
                        <CircularProgress
                          size={24}
                          style={{

                            color: "white"
                          }}
                        />
                      )}
                      Fetch Bill
                    </Button>
                  </div>
                
              </div>
            </div>


            <div >
              <Dialog open={open}>
                <DialogTitle style={{backgroundColor:"#3746c8",textAlign:"center"}}>Bill Details</DialogTitle>
                <DialogContent style={{backgroundColor:"#3746c8"}}>
                  {billDetails && Object.keys(billDetails).length > 0 ? (
                    <div>
                      <p>Amount: {billDetails.amount}</p>
                      <p>Account Holder Name: {billDetails.accountHolderName}</p>
                      <p>Mobile Number: {mobileNumber}</p>
                      <p>Bill Number: {billDetails.billNumber}</p>
                      <p>Due Date: {billDetails.dueDate}</p>
                      <p>Bill Date: {billDetails.billDate}</p>
                      <p>RefId:{billDetails.refId}</p>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                  <br /> 
                  <div style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={postUserData}>
                      Proceed to Pay
                    </Button>
                  </div>
                </DialogContent>

                <DialogActions>

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
                    onClick={handleClose1}
                  >
                    X
                  </button>
                </DialogActions>

              </Dialog>
            </div>





            <Dialog
              open={paymentResponseModalOpen}
              onClose={() => setPaymentResponseModalOpen(false)}
            >
              <DialogTitle>Payment Response Details</DialogTitle>
              <DialogContent>
                {renderResponseScreen()}
                <p>Amount: {billDetails.paidAmount}</p>
                <p>Account Holder Name: {billDetails.name}</p>
                <p>Mobile Number: {mobileNumber}</p>
                <p>Bill Number: {billDetails.billNumber}</p>
                <p>Due Date: {billDetails.dueDate}</p>
                <p>Bill Date: {billDetails.billDate}</p>
                <p>RefId:{billDetails.refId}</p>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setPaymentResponseModalOpen(false)}
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>




        </Container>
      </Box>
    </div>
  );
}
export default Mobile_postpaid;
