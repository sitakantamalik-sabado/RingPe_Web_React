import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, TextField, Button } from "@mui/material";

import "./Subscription.css";
import success from "../../Images/success.png";
import ringpe_white_logo from "../../Images/ringpeWhiteIcons.png";
import API_IP_ADDRESS from "../../../Config";
import { Box, Container, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const Subscription = () => {
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

  // const handleBillerChange = (e) => {
  //   setSelectedBiller(e.target.value);

  // };
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
    fetch(`${API_IP_ADDRESS}/bills/getSubscriptionBillerDetails`, {
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

  const handleParams = async () => {
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
      const response = await fetch(`${API_IP_ADDRESS}/bills/subscriptionfetchBillRequest`, {
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
    } finally {
      setLoading(false); // This will run regardless of success or failure
    }
  };



  const handlePaynow = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      // Additional API call for payment processing
      const paymentResponse = await fetch(
        `${API_IP_ADDRESS}/bills/subscriptionBillPaymentRequest`,
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
    } finally {
      setLoading(false); // This will run regardless of success or failure
    }

  };



  return (
    <div>
      <Box sx={{ mt: 3 }} >
        <Container component="main" maxWidth="xm"   >


          <div>
            <div>
              <form>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  {/* <TextField
              required
              id="standard-select-Operator"
              select
              label="Select  Your Operator"
              variant="standard"
              onChange={handleBillerChange}
              value={selectedBiller}
            >
              {billerdata.map((biller_name) => (
                <MenuItem
                  value={biller_name.biller_id}
                  key={biller_name.biller_id} >
                  {biller_name.biller_name}
                </MenuItem>
              ))}
            </TextField> */}
                  <Autocomplete
                    options={billerdata}
                    getOptionLabel={(option) => option.biller_name}
                    value={billerdata.find((biller) => biller.biller_id === selectedBiller) || null}
                    onChange={handleBillerChange}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Select  Your Operator" 
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
                      }} />
                    )}
                  />

                  {selectedBiller && (
                    <div>
                      {paramdata.map((param, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}> <br />
                          <TextField
                            required
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
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  
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
                    Fetch Bill
                  </Button>
                </div>
              </form>
            </div>

            <div style={{ visibility: "visible" }}>
              {/* Popup 1 */}
              {isPopupOpen && (
                <div className="popup1_Subscription">
                  <button
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      padding: "5px",

                      border: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                    }}
                    onClick={togglePopup}
                  >
                    X
                  </button>
                  <div>
                    <h2 style={{ fontSize: "30px", textAlign: "center", color: "#3746c8" }}> Bill Details</h2>

                    <br />
                    <div style={{ fontSize: "24px" }}>

                      <div style={{ display: "flex" }}>
                        Name:
                        <h5 style={{ color: "#446dd9" }}>
                          &nbsp; {biller_details.accountHolderName}
                        </h5>
                      </div>

                      <div style={{ display: "flex" }}>
                        Bill Number:
                        <h5 style={{ color: "#446dd9" }}>
                          &nbsp; {biller_details.billNumber}
                        </h5>
                      </div>
                      <div style={{ display: "flex" }}>
                        Bill Date:
                        <h5 style={{ color: "#446dd9" }}>
                          &nbsp; {biller_details.billDate}
                        </h5>
                      </div>
                      <div style={{ display: "flex" }}>
                        Bill Period:
                        <h5 style={{ color: "#446dd9" }}>
                          &nbsp; {biller_details.billPeriod}
                        </h5>
                      </div>
                      <div style={{ display: "flex" }}>
                        Due Date:
                        <h5 style={{ color: "#446dd9" }}>
                          &nbsp; {biller_details.dueDate}
                        </h5>
                      </div>
                      <div style={{ display: "flex" }}>
                        Total Amount:
                        <h5 style={{ color: "#446dd9" }}>
                          &nbsp; &#x20b9; {biller_details.amount}{" "}
                        </h5>
                      </div>
                    </div>
                    <br />

                    {/* <Button
                variant="contained"
                  onClick={handlePaynow}>
                Pay now
              </Button> */}
                    <div style={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePaynow}
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

                  {/* ...content of Popup 1 */}
                </div>
              )}

              {/* Popup 2 */}
              {isPopupOpen1 && (
                <div className="popup_Subscription">
                  <button
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      padding: "5px",

                      border: "none",
                      cursor: "pointer",
                      fontSize: "20px",

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
                    <div style={{ textAlign: "center" }}>
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

    </div>
  );
};

export default Subscription;