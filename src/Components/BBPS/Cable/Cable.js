import React, { useState } from 'react'
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button, Input, InputAdornment, InputLabel } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import './Cable.css'
import { useEffect } from 'react';
import success from "../../Images/success.png";
import ringpe_white_logo from "../../Images/ringpeWhiteIcons.png";
import API_IP_ADDRESS from "../../../Config";
import { Box, Container, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";


function Cable() {
  const [ip, setIP] = useState("");
  const [billername, setBillername] = useState([])
  const [selectedBiller, setSelectedBiller] = useState("");
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMobileChange = (e) => {
    // Limit the input to a maximum of 10 characters
    if (e.target.value.length <= 10) {
      setMobileNumber(e.target.value);
    }
  };




  const handleBiller = (event, newValue) => {
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
    const apiUrl = `${API_IP_ADDRESS}/bills/getCableBillerDetails`;
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
          setBillername(responseData.data);
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
      const response = await fetch(`${API_IP_ADDRESS}/bills/cablefetchBillRequest`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          'ip': ip,
          'mac': "54-BF-64-69-46-56",
          'billerId': selectedBiller,
          'Subscriber_Number': mobileNumber
        }),
      });
      const responseData = await response.json();

      if (responseData.status === true) {

        // setBilldata(responseData.data.result);
        // togglePopup();
        console.log("Bill Fetch successful!");
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
        <Container component="main" maxWidth="xm"   >

          <div >
            <div >
              <div style={{ fontSize: "16px" }}>
                  <Autocomplete
                    options={billername}
                    getOptionLabel={(option) => option.biller_name}
                    value={billername.find((biller) => biller.biller_id === selectedBiller) || null}
                    onChange={handleBiller}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Toll Operator"
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
                    )}
                  />
                  <br />


                  {selectedBiller && (
                    <div>
                      <FormControl fullWidth  >
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
                              background: "white",
  
                            }
                          }}
                        />
                      </FormControl>
                    </div>
                  )}
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
              </div>
            </div>
          </div>




        </Container>
      </Box>
    </div>


  )
}

export default Cable