import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, TextField, Button } from "@mui/material";

import "./Metro.css";
import success from "../../Images/success.png";
import ringpe_white_logo from "../../Images/ringpeWhiteIcons.png";
import { Box, Container, CircularProgress } from "@mui/material";
import API_IP_ADDRESS from "../../../Config";
import Autocomplete from '@mui/material/Autocomplete';

const Metro = () => {
  const [billerNames, setBillerNames] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState("");
  const [ip, setIP] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [biller_details, setBiller_details] = useState([]);
  const [isPopupOpen1, setIsPopupOpen1] = useState(false);
  const [amount, setAmount] = useState("");
  const [mobileNumber, setMobileNumber] = useState('')
  const [cardnumber, setCardnumber] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);

  const togglePopup1 = () => {
    setIsPopupOpen1(!isPopupOpen1);
    setIsPopupOpen(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsPopupOpen1(false);
  };

  const handleBillerChange = (event) => {
    setSelectedBiller(event.target.value);
  };

  const handleMobileChange = (e) => {
    // Limit the input to a maximum of 10 characters
    if (e.target.value.length <= 10) {
      setMobileNumber(e.target.value);
    }
  };



  useEffect(() => {
    const apiUrl = `${API_IP_ADDRESS}/bills/getMetroBillerDetails`;
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


  useEffect(() => {
    fetch("https://api.ipify.org/?format=json")
      .then((res) => res.json())
      .then((data) => {

        setIP(data.ip);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_IP_ADDRESS}/bills/metrobillPayRequest`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Registered_Mobile_Number: mobileNumber,
          billerId: selectedBiller,
          ip: ip,
          mac: "54-BF-64-69-46-56",
          card_no: cardnumber,
          amount: amount
        }),
      });
      const responseData = await response.json();

      if (responseData.status === true) {

        console.log("Bill Fetch successful!");
        setBiller_details(responseData.data.result.payload);
        togglePopup();
      } else {

        console.log("Bill Fetch failed.");
      }
    } catch (error) {
      console.error("There was a problem with the API request:", error);
    }
    finally {
      setLoading(false); // This will run regardless of success or failure
    }
  };


  return (

    <div>

      <Box sx={{ mt: 3 }} >
        <Container component="main" maxWidth="xm"  >
          <div>
            <div>
              <form>
                <FormControl fullWidth >
                  <TextField
                    required
                    id="standard-select-Operator"
                    select
                    label="Select Metro Card"
                    placeholder="Select Metro Card"
                    onChange={handleBillerChange}
                    value={selectedBiller}
                    variant="outlined"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "50px",
                        backgroundColor: "white",
                        height: "40px",
                        padding: "1px",
                      },
                      "& .MuiAutocomplete-inputRoot": {
                        paddingLeft: "20px !important",
                        borderRadius: "50px",
                      },
                      "& .MuiInputLabel-outlined": {
                        paddingLeft: "20px",
                      },
                      "& .MuiInputLabel-shrink": {
                        marginLeft: "20px",
                        paddingLeft: "10px",
                      },
                      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                        transform: "translate(14px, -6px) scale(0.75)",
                     }
                    }}>
 
                    {billerNames.map((biller_name) => (                      
                      <MenuItem
                        value={biller_name.biller_id}
                        key={biller_name.biller_id}
                      >
                        {biller_name.biller_name}
                      </MenuItem>
                    ))}
                  </TextField>
                 
                  <br />
                  {selectedBiller && (
                    <div>
                      <FormControl fullWidth    >
                        <TextField
                          required
                          placeholder="Mobile Number"
                          id="standard-basic"
                          type="number"
                          inputProps={{ maxLength: 10 }}
                          value={mobileNumber}
                          onChange={handleMobileChange}
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
                              //  background: "white",

                            }
                          }}
                        /><br />
                        <TextField
                          required
                          placeholder="Enter Card Last 4digits"
                          id="standard-basic"
                          value={cardnumber}
                          inputProps={{ maxLength: 4 }}
                          onChange={(e) => {
                            setCardnumber(e.target.value);
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
                              //  background: "white",

                            }
                          }}
                        /><br />

                        <TextField
                          required
                          placeholder="Enter Amount"
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
                              //  background: "white",

                            }
                          }}
                        />
                      </FormControl>
                    </div>
                  )}
                  <br />
                </FormControl>
                <br />
                <br />
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
                    Proceed to Pay
                  </Button>
                </div>
              </form>
            </div>

            <div style={{ visibility: "visible" }}>
              {/* Popup 1 */}
              {isPopupOpen && (
                <div className="popup_Metro">
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
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img src={ringpe_white_logo} width="20%" />
                      <h2>{biller_details.name}</h2>
                    </div>
                    <br />
                    <h2>&#x20b9;{biller_details.result.payload.paidAmount}</h2>
                    <h4 style={{ color: "#70aed6" }}>{biller_details.Timestamp}</h4>
                    <h4>Order Id : {biller_details.txnId}</h4>
                    <img src={success} width="20%" />
                    <h2>Paid Successfully</h2>
                  </div>
                </div>
              )}
            </div>
          </div>





        </Container>
      </Box>
    </div>
  );
};

export default Metro;
