import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button,  Input, InputAdornment, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import "./Rental.css";
import { useEffect } from "react";
import success from "../../Images/success.png";
 import ringpe_white_logo from "../../Images/ringpeWhiteIcons.png";
 import API_IP_ADDRESS from "../../../Config";
import { Box,  Container, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";



function Rental() {
  const [selectedBiller, setSelectedBiller] = useState("");
  const [rentalname, setRentalname] = useState([]);
  const [ip, setIP] = useState("");
  const [vechilenumber, setVechilenumber] = useState("");
  const [billdata, setBilldata] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [biller_details, setBiller_details] = useState([]);
  const [isPopupOpen1, setIsPopupOpen1] = useState(false);
  const [payment_details, setPayment_details] = useState([]);
  const [refId, setRefId] = useState("");
  const [upiid, setUpiid] = useState("");
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // const handleBiller = (event) => {
  //   setSelectedBiller(event.target.value);
  // };
  const handleBiller= (event, newValue) => {
    if (newValue) {
      setSelectedBiller(newValue.biller_name || "");
      setSelectedBiller(newValue.biller_id || "");
    } else {
      setSelectedBiller("");
      setSelectedBiller("");
    }
  };

  useEffect(() => {
    fetch("https://api.ipify.org/?format=json")
      .then((res) => res.json())
      .then((data) => {
    
        setIP(data.ip);
      });
  }, []);

  useEffect(() => {
    const apiUrl = `${API_IP_ADDRESS}/bills/getRentalBillerDetails`;
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
       
          setRentalname(responseData.data);
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
      const response = await fetch(
        `${API_IP_ADDRESS}/bills/rentalbillPayment`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            UPI_ID: upiid,
            billerId: selectedBiller,
            ip: ip,
            mac: "54-BF-64-69-46-56",
            name1: username,
            amount: amount,
          }),
        } 
      );
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
    } finally{
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 3 }} >
        <Container component="main" maxWidth="xm"   >


    <div>
      <div  >
        <div >
     
          <div  >
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <form  >
                {/* <TextField
                  required
                  fullWidth
                  id="standard-select-Operator"
                  select
                  label="Select Rental"
                  variant="standard"
                  onChange={handleBiller}
                  value={selectedBiller}
                >
                  {rentalname.map((option) => (
                    <MenuItem key={option.biller_id} value={option.biller_id}>
                      {option.biller_name}
                    </MenuItem>
                  ))}
                </TextField>
                <br /> */}
                      <Autocomplete
                        options={rentalname}
                        getOptionLabel={(option) => option.biller_name}
                        value={rentalname.find((biller) => biller.biller_id === selectedBiller) || null}
                        onChange={handleBiller}
                        renderInput={(params) => (
                          <TextField {...params} placeholder="Select Your Options*"  
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "50px",
                              backgroundColor: "white",
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
                      /> <br/>
                {selectedBiller && (
                  <div>
                    <FormControl fullWidth    >
                      <TextField
                        required
                        placeholder="Enter UPI Id *"
                        id="standard-basic"
                        value={upiid}
                        onChange={(e) => {
                          setUpiid(e.target.value);
                        }}
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "50px",
                            backgroundColor: "white",
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
                      <br></br>
                      <TextField
                        required
                        placeholder="Enter User Name *"
                        id="standard-basic"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "50px",
                            backgroundColor: "white",
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
                      <br />
                      <TextField
                        required
                        placeholder="Enter Amount *"
                        id="standard-basic"
                         value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                        sx={{
                          width: "100%",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "50px",
                            backgroundColor: "white",
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
                      <br />
                    </FormControl>
                  </div>
                )}
                <br />
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
              Proceed to Pay
            </Button>
            </div>
              </form>
            </FormControl>
          </div>
        </div>
      </div>
      <div style={{ visibility: "visible" }}>
        {/* Popup 2 */}
        {isPopupOpen && (
          <div className="popup_Rental">
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
              onClick={togglePopup}
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
              <h2>&#x20b9;{payment_details.result.payload.paidAmount}</h2>
              <h4 style={{ color: "#70aed6" }}>{payment_details.Timestamp}</h4>
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
  );
}

export default Rental;
