import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button, Input, InputAdornment, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "./Fastag.css";
 import { useEffect } from "react";
import './Fastag.css'
import success from "../../Images/success.png";
import ringpe_white_logo from "../../Images/ringpeWhiteIcons.png";
import { Box,  Container, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import API_IP_ADDRESS from "../../../Config";

function Fastag() {
  const [selectedBiller, setSelectedBiller] = useState("");
  const [fastag_operator, setFastag_operator] = useState([]);
  const [ip, setIP] = useState("");
  const [vechilenumber, setVechilenumber] = useState("");
  const [billdata, setBilldata] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [biller_details, setBiller_details] = useState([]);
  const [isPopupOpen1, setIsPopupOpen1] = useState(false);
  const [payment_details, setPayment_details] = useState([]);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePopup1 = () => {
    setIsPopupOpen1(!isPopupOpen1);
    setIsPopupOpen(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsPopupOpen1(false);
  };

  // const handleBiller = (event) => {
  //   setSelectedBiller(event.target.value);
  // };

  const handleBiller = (event, newValue) => {
    if (newValue) {
      setSelectedBiller(newValue.biller_name || "");
      setSelectedBiller(newValue.biller_id || "");
    } else {
      setSelectedBiller("");
      setSelectedBiller("");
    }
  };

  const handleVechilenumber = (vechilenumber) => {
    const patternRegrex = /^[A-Z]{2}\s[0-9]{1,2}\s[A-Z]{1,2}\s[0-9]{1,4}$/;
    return patternRegrex.test(vechilenumber);
    // setVechilenumber(e.target.value.toUpperCase());
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value.toUpperCase();
    setVechilenumber(inputValue);
  };

  useEffect(() => {
    fetch("https://api.ipify.org/?format=json")
      .then((res) => res.json())
      .then((data) => {
        
        setIP(data.ip);
      });
  }, []);

  useEffect(() => {
    const apiUrl = `${API_IP_ADDRESS}/bills/getFastagBillers`;
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
        
          setFastag_operator(responseData.data);
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

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch(`${API_IP_ADDRESS}/bills/fastagBillFetch`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Vehicle_Registration_Number: vechilenumber,
          billerId: selectedBiller,
          ip: ip,
          mac: "54-BF-64-69-46-56",
        }),
      });
  
      const responseData = await response.json();
       
  
      if (responseData.status === true) {
    
        setBilldata(responseData.data.result);
        setRefId(responseData.data.result.payload.refId);
        togglePopup();
        console.log("Bill Fetch successful!");
      } else {
       
        console.log("Bill Fetch failed.");
      }
    } catch (error) {
      console.error("There was a problem with the API request:", error);
    } finally {
      setLoading(false); // This will run regardless of success or failure
    }
  };
 

  const handlePaynow = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${API_IP_ADDRESS}/bills/fastagBillPaymentRequest`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            Vehicle_Registration_Number:vechilenumber,
            ip:ip,
            mac:"54-BF-64-69-46-56",
            billerId:selectedBiller,
            amount:billdata.payload.amount,
            refId:billdata.payload.refId
          }),
        }
      );
      const responseData = await response.json();
     
      if (responseData.status === true) {
        
        setPayment_details(responseData.data);
        console.log("Bill Fetch successful!");
        setLoading(false);
        togglePopup();
        setIsPopupOpen1(true);
      } else {
       
        console.log("Bill Fetch failed.");
      }
    } 
    catch (error) {
      console.error("There was a problem with the API request:", error);
    }
  };


  const payumoney = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_IP_ADDRESS}/payment_gateway/webbillpayumoney`, {
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
          window.location.href=location
        } else {
          console.log("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
  };

  return (
   
   
    <div>

       <Box sx={{ mt: 3 }} >
        <Container component="main" maxWidth="xm"   > 

    <div>
      <div>
        <div>
          
          <div style={{ fontSize: "16px" }}>


            {/* <FormControl fullWidth sx={{ m: 1 }} variant="standard"> */}
                     <Autocomplete
                        options={fastag_operator}
                        getOptionLabel={(option) => option.biller_name}
                        value={fastag_operator.find((biller) => biller.biller_id === selectedBiller) || null}
                        onChange={handleBiller}
                        renderInput={(params) => (
                          <TextField {...params} placeholder="Toll Operator *"  
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
                          }}
                          />
                        )}
                      /><br/>
              {selectedBiller && (
                <div>
                 
                    <TextField
                      required
                      placeholder="Vechile Registration Number *"
                      id="standard-basic"
                      inputProps={{ maxLength: 10 }}
                      value={vechilenumber}
                      onChange={handleInputChange}
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
                      }}
                    />
                  
                </div>
              )}
              <br />
            {/* </FormControl> */}


            <div><br/><br/>  
         <div style={{textAlign:'center'}}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
               {loading && (
                <CircularProgress
                  size={24}
                  style={{
                    color:"white"
                  }}
                />
              )}
              Fetch Bill
            </Button>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ visibility: "visible" }}>
        {/* Popup 1 */}
        {isPopupOpen && (
          <div className="popup-fasttag1">
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "5px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
              }}
              onClick={togglePopup}
            >
              X
            </button>
            <div>
              <h3 style={{fontSize:"30px",textAlign:"center",color:"#3746c8"}}>Bill Details</h3> <br /> <br /> 
              <div style={{fontSize:"24px"}}>
                Fast Tag Balance: &nbsp; &#x20b9;{" "}
                  {billdata.payload.additionalParams["Fast Tag Balance"]}{" "}
               
              </div>
      
              <div style={{  fontSize:"24px" }}>
                Total Amount: &nbsp; &#x20b9; {billdata.payload.amount}{" "}
                 
              </div>
              <div style={{fontSize:"24px"}}>
                Name: &nbsp; {billdata.payload.accountHolderName}
                
              </div>
              <div style={{fontSize:"24px" }}>
                Due Date:  &nbsp; {billdata.payload.dueDate}
                
              </div>
              <div style={{fontSize:"24px" }}>
                Registration Vechile Number:&nbsp; {vechilenumber}
                
              </div>
              
              
              <br />
                   {/* <div style={{textAlign:"center"}}>
              <Button
                variant="contained"
                onClick={handlePaynow} >
                Pay now
              </Button>
              </div> */}
<br></br>
<div style={{textAlign:'center'}}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePaynow}
            >
               {loading && (
                <CircularProgress
                  size={24}
                  style={{
                    color:"white"
                  }}
                />
              )}
             Proceed to Pay
            </Button>
            </div>
            </div>

            {/* ...content of Popup 1 */}
          </div>
        )}

        {/* Popup 2 */}
        {isPopupOpen1 && (
          <div className="popup_bill">
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "5px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
                color: "white",
              }}
              onClick={togglePopup1}
            >
              X
            </button>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={ringpe_white_logo} width="20%" />
                <h2>{payment_details.name}</h2>
              </div>
              <br />
              <div style={{textAlign:"center"}}>
              <h2> Amount:&#x20b9;{payment_details.result.payload.paidAmount}</h2>
              <h4 style={{ color: "white" }}>{payment_details.Timestamp}</h4>
              <h4>Order Id : {payment_details.txnId}</h4>
              <img src={success} width="20%" />
              <h2>Paid Successfully</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>





          
        </Container>
      </Box>
    </div>
  );
}

export default Fastag;
