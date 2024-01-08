import React, { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,FormHelperText,OutlinedInput
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Mobile_prepaid.css";
import { styled } from "@mui/material/styles";
import API_IP_ADDRESS from "../../../Config";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Mobile_prepaid() {
  const [selectedOption, setSelectedOption] = React.useState("option1");
  const [userData, setUserData] = useState({});
  const [billerNames, setBillerNames] = useState([]);
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState([]);
  const [amount, setAmount] = useState([]);
  const [circleName, setCircleName] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [selectedCircle, setSelectedCircle] = useState("");
  const [plans, setPlans] = useState([]);
  const [operatorName, setOperatorName] = useState("");
  const [stateName, setStateName] = useState(null);
  const [selectedPriceDescription, setSelectedPriceDescription] =
    useState(null);
  const [planname, setPlanname] = useState(null);
  const [ip, setIP] = useState("");
  const [refid, setRefid] = useState(null);
  const [trans_id, setTrans_id] = useState(null);
  const [message, setMessage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [mobileError, setMobileError] = useState("");
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleMobileChange = (e) => {
    const inputPhoneNumber = e.target.value.slice(0, 10); // Limit the input to 10 characters
    setMobileNumber(inputPhoneNumber);
    const phoneRegex = /^\d{10}$/;
    // Limit the input to a maximum of 10 characters
    if (e.target.value.length <= 10) {
      setMobileNumber(e.target.value);
    }
    if (!phoneRegex.test(inputPhoneNumber)) {
      setMobileError("Please Enter a Valid 10-digit Mobile Number");
    } else {
      setMobileError("");
    }
  };

  const handlePriceSelection = (price, description, planname) => {
    setAmount(price);
    setSelectedPriceDescription(description);
    setPlanname(planname);
  };

  useEffect(() => {
    fetch(`${API_IP_ADDRESS}/bills/getMobilePrepaidOperators`, {
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
         
            // Extract the biller names from the API response
            setBillerNames(responseData.data);
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

  // ---------------------------------------------------------------

  useEffect(() => {
    fetch("https://api.ipify.org/?format=json")
      .then((res) => res.json())
      .then((data) => {
       
        setIP(data.ip);
      });
  }, []);

  //------------------------------------------------

  useEffect(() => {
    fetch(`${API_IP_ADDRESS}/bills/getMobilePrepaidCircles`, {
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
           
            setCircleName(responseData.data);
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

  const handleBillerChange = (event) => {
    setSelectedOperator(event.target.value);
  };

  const handleCircleChange = (event) => {
    setSelectedCircle(event.target.value);
  };

  const handle_plans = async () => {
     
    try {
      const response = await axios.post(
        `${API_IP_ADDRESS}/bills/fetchMobilePrepaidPlan`,
        {
          circleId: selectedCircle,
          operatorId: selectedOperator,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
       
      if (response.data[0].status === true) {
        const { data } = response.data[0];
        const { result } = data;
         
        const { payload } = result;
       
        const [circle] = payload;
       
        const { plansInfo: plans } = circle.circleWisePlanLists[0];
       
        setPlans(plans);
        setOperatorName(payload[0].operatorName);
        setStateName(circle.circleWisePlanLists[0].circleName);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handle_recharge = async () => {
    try {
      const response = await axios.post(
        `${API_IP_ADDRESS}/bills/mobilePrepaidReachargePayment`,
        {
          mobile: mobileNumber,
          ip: ip,
          mac: "54-BF-64-69-46-56",
          amount: amount,
          OperatorCode: selectedOperator,
          CircleRefID: selectedCircle,
          planId: planname,
          operatorName: operatorName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
 
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

    

  return (
    <div>
      <div className="plans">
         
        <div className="prepaid_view">
           
          <div>
            <div>
              <form>
                <FormControl fullWidth  variant="standard">
                  {/* <TextField
                    required
                    label="Mobile Number"
                    id="standard-basic"
                    variant="standard"
                    type="number"
                    inputProps={{ maxLength: 10 }}
                    value={mobileNumber}
                    onChange={handleMobileChange}
                  /> */}
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
                      inputProps={{ maxLength: 10 }}
                       value={mobileNumber}
                      onChange={handleMobileChange}
                      error={!!mobileError}
                      helperText={mobileError}
                    />
                  </FormControl>
                  <FormHelperText style={{ color: 'white', textAlign: "center" }}> {mobileError}</FormHelperText>
                 
                  {/* <FormControl variant="standard" fullWidth>
                    <InputLabel>Select Operator</InputLabel>
                    <Select
                      required
                      value={selectedOperator}
                      onChange={handleBillerChange}
                    >
                      
                      {billerNames.map((operator) => (
                        <MenuItem
                          key={operator.operatorCode}
                          value={operator.operatorCode}
                        >
                          {operator.operatorName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                  
                 

                  <FormControl variant="standard" fullWidth>
                    <InputLabel>Select Circle</InputLabel>
                    <Select
                      required
                      value={selectedCircle}
                      onChange={handleCircleChange}
                    >
                      {circleName.map((circle) => (
                        <MenuItem
                          key={circle.circleRefID}
                          value={circle.circleRefID}
                        >
                          {circle.circleName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div style={{ textAlign: "right" }}>
                    <Button onClick={handle_plans}>Show Plans</Button>
                  </div>
                  <TextField
                    required
                    label="Amount"
                    id="standard-basic"
                    variant="standard"
                    type="number"
                    inputProps={{ maxLength: 10 }}
                    value={amount}
                  />
                  <p style={{ fontSize: "10px", color: "#3b71ca" }}>
                    {selectedPriceDescription}
                  </p>
                </FormControl>
                <Button variant="contained" onClick={handle_recharge}>
                  Proceed  
                </Button>
              </form>

            </div>
          </div>
        </div>
      </div>

      
      <div style={{ visibility: "visible" }}>
        {isPopupOpen && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              height: "500px",
              backgroundColor: "#fff",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              zIndex: "999",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
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
            <div>ldkfm;mkx;</div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Mobile_prepaid;
