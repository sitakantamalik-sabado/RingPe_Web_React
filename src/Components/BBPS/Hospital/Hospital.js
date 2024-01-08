import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, TextField, Button, Typography } from "@mui/material";
import "./Hospital.css";
import success from "../../Images/success.png";
import ringpe_white_logo from "../../Images/ringpeWhiteIcons.png";
import API_IP_ADDRESS from "../../../Config";
import { Box, Container, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import logo from "../../Images/white_background.png"



const Hospital = () => {
  const [billerdata, setBillerdata] = useState([]);
  const [selectedBiller, setSelectedBiller] = useState("");
  const [biller_Id, setBiller_Id] = useState("");
  const [ip, setIP] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [biller_details, setBiller_details] = useState([]);
  const [isPopupOpen1, setIsPopupOpen1] = useState(false);
  const [payment_details, setPayment_details] = useState([]);
  const [paramdata, setParamdata] = useState([])
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (paramName, e) => {
    const value = e.target.value;
    // You can add validation logic here if needed
    setFormData({ ...formData, [paramName]: value });
  };


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
    if (selectedBiller !== "") {
      handleParams();
    }
  }, [selectedBiller]);


  useEffect(() => {
    fetch(`${API_IP_ADDRESS}/bills/getHospitalBillerDetails`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          // throw new Error("Request failed with status:");
          console.error("Request failed with status:", response.status);
          return;
        }

        response.json().then((responseData) => {

          if (responseData.status === true) {

            setBillerdata(responseData.data);
          } else {
            console.error(
              "API response status is not true:",
              responseData.message
            );
          }
        });
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

  const handleParams = async (e) => {

    try {
      const response = await fetch(`${API_IP_ADDRESS}/bills/customerParamsbyBillerId`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          'billerId': selectedBiller,
        }),
      });
      const responseData = await response.json();

      if (responseData.status === true) {
        console.log("Bill Fetch successful!");
        setParamdata(responseData.data.result);
      } else {

        console.log("Bill Fetch failed.");
      }
    } catch (error) {
      console.error("There was a problem with the API request:", error);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_IP_ADDRESS}/bills/HospitalBillFetch`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          'customerParams': formData,
          'billerId': selectedBiller,
          'ip': ip,
          'mac': "54-BF-64-69-46-56",
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



  const handlePaynow = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Additional API call for payment processing
      const paymentResponse = await fetch(
        `${API_IP_ADDRESS}/bills/HospitalBillPaymentRequest`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ip: ip,
            mac: "54-BF-64-69-46-56",
            refId: biller_details.refId
          }),
        }
      );

      const paymentData = await paymentResponse.json();
      // Handle the payment response as needed


      if (paymentData.status === true) {

        setPayment_details(paymentData.data);
        console.log("Payment successful!");
        togglePopup();
        setIsPopupOpen1(true);
      } else {

        console.log("Payment failed.");
      }
    } catch (error) {
      console.error("There was a problem with the payment API request:", error);
    }
    finally {
      setLoading(false); // This will run regardless of success or failure
    }
  };



  return (

    <div>
      <Box sx={{ mt: 3 }} >
        <Container component="main" maxWidth="xm" >

          <div>
            <div>

              <form >

                <Autocomplete
                  options={billerdata}
                  getOptionLabel={(option) => option.biller_name}
                  value={billerdata.find((biller) => biller.biller_id === selectedBiller) || null}
                  onChange={handleBillerChange}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select  Hospital Name "

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
                    {paramdata.map((param, index) => (
                      <div key={index} style={{ marginBottom: '20px' }}>
                        <TextField
                          placeholder={param.param_name}
                          type={param.data_type}
                          fullWidth

                          value={formData[param.param_name] || ''}
                          onChange={(e) => handleChange(param.param_name, e)}
                          InputProps={{
                            inputProps: {
                              maxLength: param.max_length,
                              minLength: param.min_length
                            },
                            shrink: true
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
                    ))}
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
                    onClick={togglePopup}>
                    X
                  </button>
                  <div>
                    <h2 style={{ textAlign: "center" }}>Bill Details</h2>
                    <div>
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "50%" }}>
                          <p>Name:{biller_details.accountHolderName}</p>
                          <p>Total Amount:{biller_details.amount}{" "}</p>
                          <p>Bill Number:{biller_details.billNumber}</p>
                          <p>Paid Amount:{payment_details.result.payload.paidAmount}</p>
                        </div>
                        <div style={{ width: "50%" }}>
                          <p>Bill Period:{biller_details.billPeriod}</p>
                          <p>Due Date:{biller_details.dueDate}</p>
                          <p>Bill Date:{biller_details.billDate}</p>
                          <p>Time Stamp:{payment_details.Timestamp}</p>
                        </div>
                      </div>
                      <p>Reference Id: {biller_details.refId}</p>
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
                    }}
                  >
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
                        style={{ height: '50%', width: '20%' }}
                        alt="Check Mark"
                      ></img>
                      <br />
                      <p style={{ color: 'black', fontWeight: 'bold' }}>
                        <h4>Your Hospital  Bill Paid Successfully</h4>
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
                          <p style={{ fontSize: "12px", textAlign: "center" }}>Your Hospital Bill Paid Successfully</p>
                          <div style={{ display: "flex", fontSize: "12px", justifyContent: "space-between" }}>
                            <div>
                              <p>Name: {biller_details.accountHolderName}</p>
                              <p>Total Amount: {biller_details.amount} </p>
                              <p>Bill Number: {biller_details.billNumber}</p>
                            </div>
                            <div>
                              <p>Bill Period: {biller_details.billPeriod}</p>
                              <p>Due Date: {biller_details.dueDate}</p>
                              <p>Bill Date: {biller_details.billDate}</p>
                            </div>
                          </div>
                          <p style={{ fontSize: "12px" }}>Reference Id: {biller_details.refId}</p>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button style={{ width: "40%", height: "30px", borderRadius: "50px", fontWeight: 'bold', borderColor: "white" }}>
                              LOG ISSUE
                            </button>
                            <button style={{ width: "40%", height: "30px", borderRadius: "50px", fontWeight: 'bold', borderColor: "white" }}>
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

export default Hospital;