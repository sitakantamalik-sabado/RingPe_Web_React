import React, { useState, useEffect } from "react";
import {  TextField, Button, Typography } from "@mui/material";
import "./WaterBill.css";
 import { Box, Container, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import API_IP_ADDRESS from "../../../Config";
import logo from "../../Images/white_background.png"

const WaterBill = () => {
  const [billerNames, setBillerNames] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState("");
  const [customerId, setCustomerId] = useState("");
   const [ip, setIP] = useState("");
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

  const handleBillerChange = (event, newValue) => {
    if (newValue) {
      setSelectedBiller(newValue.biller_name || "");
      setSelectedBiller(newValue.biller_id || "");
    } else {
      setSelectedBiller("");
      setSelectedBiller("");
    }
  };


  useEffect(() => {
    const apiUrl = `${API_IP_ADDRESS}/bills/getWaterBillerDetails`;
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
      const response = await fetch(`${API_IP_ADDRESS}/bills/WaterBillFetch`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          customer_ID: customerId,
          billerId: selectedBiller,
          ip: ip,
          mac: "54-BF-64-69-46-56",
        }),
      });
      const responseData = await response.json();

      if (responseData.status === true) {

        console.log("Bill Fetch successful!");
        setBiller_details(responseData.data.result.payload);
        setRefId(responseData.data.result.payload.refId)
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


  const handlePaynow = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${API_IP_ADDRESS}/bills/waterBillPaymentRequest`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            customer_ID: customerId,
            billerId: selectedBiller,
            ip: ip,
            mac: "54-BF-64-69-46-56",
            refId: biller_details.refId,
            amount: biller_details.amount,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.status === true) {
        setPayment_details(responseData.data);
        console.log("Bill Fetch successful!");
        togglePopup();
        setIsPopupOpen1(true);
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
          window.location.href = location
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
        <Container component="main" maxWidth="xm">
          <div>
            <div>
              <form >
                <Autocomplete
                  options={billerNames}
                  getOptionLabel={(option) => option.biller_name}
                  value={billerNames.find((biller) => biller.biller_id === selectedBiller) || null}
                  onChange={handleBillerChange}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Water Coporation *"
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
                /><br />
                {selectedBiller && (
                  <div>
                    <TextField
                      required
                      placeholder="Please Enter Bill Number"
                      id="standard-basic"
                      inputProps={{ maxLength: 13 }}
                      value={customerId}
                      onChange={(e) => {
                        setCustomerId(e.target.value);
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
                  </div>
                )}
               <br/>
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
              </form>
            </div>


            <div style={{ visibility: "visible" }}>
              {/* Popup 1 */}
              {isPopupOpen && (
                <div className="water_popup1">
                  <button
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      padding: "5px",
                      backgroundColor: "transparent",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                    onClick={togglePopup}
                  >
                    X
                  </button>
                  <div>
                    <h2 style={{ textAlign: "center",fontSize:"18px" }}>Bill Details</h2>
                    <div>
                      <div style={{ display: "flex",fontSize:"14px" ,textAlign:"center"}}>
                        <div style={{ width: "50%",textAlign:"left" }}>
                          <p>Name:{biller_details.accountHolderName}</p>
                          <p>Consumer id:{customerId}</p>
                          <p>Bill Number:{biller_details.billNumber}</p>

                        </div>
                        <div style={{ width: "50%" }}>
                          <p>Bill Period:{biller_details.billPeriod}</p>
                          <p>Due Date:{biller_details.dueDate}</p>
                          <p>Bill Date:{biller_details.billDate}</p>
                        </div>
                      </div>
                      <p style={{fontSize:"14px",textAlign:"left"}}>Reference Id: {biller_details.refId}</p>
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          onClick={handlePaynow}>
                          {loading && (
                            <CircularProgress
                              size={24}
                              style={{
                                color: "white",
                                marginRight: "8px",
                              }}
                            />
                          )}
                          Proceed to Pay
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Popup 2 */}
              {isPopupOpen1 && (
                <div className="water_popup2">
                  <button
                    onClick={togglePopup1}
                      style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                      fontSize: '18px',
                      color: 'black',
                      backgroundColor: "gray",
                      borderRadius: "100%"
                    }}>
                    X
                  </button>

                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: "100%" }}>
                    {/* Top Row with Background Image */}
                    <div
                      style={{
                        backgroundImage: `url(${logo})`,
                        backgroundSize: 'cover',
                        height: '50%',
                        textAlign: 'center',
                        alignItems: 'center',
                      }}>
                      <img
                        src={require('../../Images/check_mark.png')}
                        style={{ height: '40%', width: '20%' }}
                        alt="Check Mark"
                      ></img>
                       
                      <p style={{ color: 'black', fontWeight: 'bold' }}>
                        <h4>Your Water Bill Paid Successfully</h4>
                      </p>
                    </div>

                    {/* Bottom Row with Blue Background */}
                    <div
                      style={{
                        backgroundColor: '#3746C8',
                        height: '50%',
                        justifyContent: 'center',
                        padding: '10px',
                        display: 'flex'
                      }}>
                      <Typography>
                        <div>
                        <p style={{fontSize:"12px",textAlign:"center"}}>Your Water Bill Paid Successfully</p>
                          <div style={{ display: "flex",fontSize:"12px",justifyContent: "space-between" }}>
                            <div>
                              <p>Name: {biller_details.accountHolderName}</p>
                              <p>Consumer id: {customerId}</p>
                              <p>Bill Number: {biller_details.billNumber}</p>
                            </div>
                            <div>
                              <p>Bill Period: {biller_details.billPeriod}</p>
                              <p>Due Date: {biller_details.dueDate}</p>
                              <p>Bill Date: {biller_details.billDate}</p>
                            </div>
                          </div>
                          <p style={{fontSize:"12px"}}>Txn Id:{payment_details.txnId}</p> 
                          <p style={{fontSize:"12px"}}>Reference Id: {biller_details.refId}</p>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button style={{ width:"40%",height:"30px",borderRadius:"50px",fontWeight: 'bold',borderColor:"white" }}>
                             LOG ISSUE
                            </button>
                            <button style={{ width:"40%",height:"30px",borderRadius:"50px",fontWeight: 'bold',borderColor:"white" }}> 
                              DONE
                            </button>
                          </div>
                        </div>
                      </Typography>
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
};

export default WaterBill;
