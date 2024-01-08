import React, { useState, useEffect } from "react";
 
// import Viewstatement from "../Viewstatement";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import API_IP_ADDRESS from "../../../Config";
import "./Ministatement.css";
import success from "../../Images/success.png";
import ringpe_white_logo from "../../Images/ringpeWhiteIcons.png";
import ringpe_logo from "../../Images/ringpe_final_logo.png";
import BBPS from "../../Images/BBPS.jpeg";
import { Router } from "react-router-dom";
 
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Box, Container, CircularProgress } from "@mui/material";



function Ministatement() {
  const [transactions, setTransactions] = useState([]);
  const [selecteddata, setSelecteddata] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [refId, setRefId] = useState("");
  const [showTextField, setShowTextField] = useState(false);
  const [comments, setComments] = useState("");
  const [isPopupOpen1, setIsPopupOpen1] = useState(false);
  const [successdata, setSuccessdata] = useState([]);
  const [faileddata, setFaileddata] = useState([]);
  const [mobile, setMobile] = useState("");

  const togglePopup1 = () => {
    setIsPopupOpen1(!isPopupOpen1);
    setIsPopupOpen(false);
  };

  const handleButtonClick = () => {
    setShowTextField(!showTextField);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleopenmini = (detailsid) => {
    const selectedminiData = transactions.find(
      (item) => item.amount_details_id === detailsid
    );
    setSelecteddata(selectedminiData);
 
    setRefId(selectedminiData.transacction_ref_id);
    if (selectedminiData.transacction_ref_id === null) {
      setRefId(selectedminiData.txn_id);
    }
    togglePopup();
  };
 

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsPopupOpen1(false);
    setShowTextField(false);
  };

  useEffect(() => {
    fetch(`${API_IP_ADDRESS}/users/miniStatement`, {
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
    
            setTransactions(responseData.results);
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
    const apiUrl = `${API_IP_ADDRESS}/users/dashboard`;
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
        setMobile(responseData.data.mobile);
      })
      .catch((error) => {
        console.error("There was a problem fetching data:", error);
      });
  }, []);

  const hadleRaisecomplaint = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_IP_ADDRESS}/grievence/customer_grievance`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            refId: refId,
            issue: comments,
          }),
        }
      );
      const responseData = await response.json();
    
      if (responseData.status === "Open") {
         
        setSuccessdata(responseData);
        togglePopup();
        setIsPopupOpen1(true);
      } else {
        
        console.log("Bill Fetch failed.");
      }
    } catch (error) {
      console.error("There was a problem with the API request:", error);
    }
  };

  return (
    <div>
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container component="main" maxWidth="xm" style={{
        padding: "20px",
        boxShadow: "4px 2px 8px 2px #ACB1D6",
        borderRadius: "8px",
        width: "80%",
        fontFamily: "open sans,Helvetica,Arial,sans-serif"
      }}>
    <h2 style={{fontSize:"30px",textAlign:"center",color:"#3746c8" }}>Mini Statement</h2><br/>

    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{alignItems:'center'}}
        />
      </div>


    <TableContainer>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Order No</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              
              

              <TableBody>
                {transactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => (
                    <TableRow key={data.amount_details_id}>


                      <TableCell>
                      <div>
                        {data.transaction_type === "debit" && (
                          <div>
                            <h5 style={{ color: "black" }}>
                              {data.biller_alias_name}{" "}
                            </h5>
                            <div style={{ fontSize: "12px" }}>
                              <span>{data.payment_name} /</span>
                              <span>{data.biller_name} </span>
                              <br />
                              {data.PayUID !== null && (
                                <div>
                                  <span>Payu Id: {data.PayUID} </span>
                                  <br />
                                </div>
                              )}

                              {/* <span>{data.transaction_timestamp} </span> */}
                            </div>
                          </div>
                        )}

                        {data.transaction_type === "credit" && (
                          <div>
                            <h5 style={{ color: "black" }}>
                              {data.biller_category_name}{" "}
                            </h5>
                            <div style={{ fontSize: "12px" }}>
                              <span>{data.product_info} </span>
                              <br />
                              {/* <span>{data.PG_transaction_timestamp} </span> */}
                            </div>
                          </div>
                        )}

                        {data.transaction_type === "failed" && (
                          <div>
                            <h5 style={{ color: "black" }}>
                              {data.biller_category_name}{" "}
                            </h5>
                            <div style={{ fontSize: "12px" }}>
                              <span>{data.product_info} </span>
                              <br />
                              {/* <span>{data.PG_transaction_timestamp} </span> */}
                            </div>
                          </div>
                        )}

                        {data.transaction_type === "transfer" && (
                          <div>
                            <h5 style={{ color: "black" }}>
                              {data.transaction_type}{" "}
                            </h5>
                            <div style={{ fontSize: "12px" }}>
                              <span>
                                Transfered to: {data.transfer_to_name}{" "}
                              </span>
                              <br />
                              {/* <span>{data.transfer_timestamp} </span> */}
                            </div>
                          </div>
                        )}
                      </div>
                      </TableCell>

                      <TableCell>
                      <div>
                      
                        <div style={{ fontSize: "12px" }}>
                          
                          <br />
                          <span>{data.transaction_type} </span>
                          {data.transaction_type === "debit" && (
                            <div>
                              {data.api_request_status === "SUCCESS" && (
                                <span style={{ color: "green" }}>
                                  {data.api_request_status}{" "}
                                </span>
                              )}

                              {data.api_request_status === "FAILURE" && (
                                <span style={{ color: "red" }}>
                                  {data.api_request_status}{" "}
                                </span>
                              )}
                            </div>
                          )}

                          {data.transaction_type === "credit" && (
                            <div>
                              {data.payment_status === "success" && (
                                <span style={{ color: "green" }}>
                                  {data.payment_status}{" "}
                                </span>
                              )}

                              {data.payment_status === "failure" && (
                                <span style={{ color: "red" }}>
                                  {data.payment_status}{" "}
                                </span>
                              )}
                            </div>
                          )}

                          {data.transaction_type === "failed" && (
                            <div>
                              {data.payment_status === "success" && (
                                <span style={{ color: "green" }}>
                                  {data.payment_status}{" "}
                                </span>
                              )}

                              {data.payment_status === "failure" && (
                                <span style={{ color: "red" }}>
                                  {data.payment_status}{" "}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      </TableCell>

                      <TableCell>
                      &#x20b9; {data.amount}
                        </TableCell>

                      <TableCell>
                      <div>
                      
                      <div style={{ fontSize: "12px" }}>
                       
                        
                        {data.transaction_type === "debit" && (
                          <div>
                           {data.transacction_ref_id === null && (
                          <p style={{ fontSize: "12px" }}>
                            {data.txn_id}
                          </p>
                        )}
                        {data.transacction_ref_id !== null && (
                          <p style={{ fontSize: "12px" }}>
                            {data.transacction_ref_id}
                          </p>
                        )}
                          </div>
                        )}

                        {data.transaction_type === "credit" && (
                          <div>
                            {data.payment_status === "success" && (
                              <span style={{ color: "green" }}>
                                {data.payment_status}{" "}
                              </span>
                            )}

                            {data.payment_status === "failure" && (
                              <span style={{ color: "red" }}>
                                {data.payment_status}{" "}
                              </span>
                            )}
                          </div>
                        )}

                        {data.transaction_type === "failed" && (
                          <div>
                            {data.payment_status === "success" && (
                              <span style={{ color: "green" }}>
                                {data.payment_status}{" "}
                              </span>
                            )}

                            {data.payment_status === "failure" && (
                              <span style={{ color: "red" }}>
                                {data.payment_status}{" "}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                        </TableCell>

                      <TableCell>
                      <div>
                        {data.transaction_type === "debit" && (
                          
                            <div style={{ fontSize: "12px" }}>
                              
                              <br />
                              {data.PayUID !== null && (
                                <div>
                                  <span>Payu Id: {data.PayUID} </span>
                                  <br />
                                </div>
                              )}

                              <span>{data.transaction_timestamp} </span>
                            </div>
                         
                        )}

                        {data.transaction_type === "credit" && (
                          
                            <div style={{ fontSize: "12px" }}>
                              <span>{data.PG_transaction_timestamp} </span>
                            </div>
                          
                        )}

                        {data.transaction_type === "failed" && (
                          
                            
                            <div style={{ fontSize: "12px" }}>
                              
                              <span>{data.PG_transaction_timestamp} </span>
                            </div>
                          
                        )}

                        {data.transaction_type === "transfer" && (
                          
                            <div style={{ fontSize: "12px" }}>
                              <span>{data.transfer_timestamp} </span>
                            </div>
                         
                        )}
                      </div>
                        </TableCell>

                        <TableCell>
                          <Button
                            onClick={() =>
                              handleopenmini(data.amount_details_id)
                            }>
                            <ArrowForwardIosIcon fontSize="small" />{" "}
                          </Button>
                        </TableCell>

                    </TableRow>
                  ))}
              </TableBody>
              </Table>
          </TableContainer>



    <div>
    
   
      {/* <div>
        <div>
          <div>
            <div>
              {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => (
                  <div
                    key={data.amount_details_id}
                    style={{
                      padding: "1px 1px px 6px",
                      borderRadius: "10px",
                      marginBottom: "5px",
                      textAlign: "left",
                      backgroundColor: "#eee",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignContent: "center",
                        padding: "10px 14px 10px 10px",
                      }}
                    >
                      <div style={{ width: "85%" }}>
                        {data.transaction_type === "debit" && (
                          <div>
                            <h5 style={{ color: "black" }}>
                              {data.biller_alias_name}{" "}
                            </h5>
                            <div style={{ fontSize: "12px" }}>
                              <span>{data.payment_name} /</span>
                              <span>{data.biller_name} </span>
                              <br />
                              {data.PayUID !== null && (
                                <div>
                                  <span>Payu Id: {data.PayUID} </span>
                                  <br />
                                </div>
                              )}

                              <span>{data.transaction_timestamp} </span>
                            </div>
                          </div>
                        )}

                        {data.transaction_type === "credit" && (
                          <div>
                            <h5 style={{ color: "black" }}>
                              {data.biller_category_name}{" "}
                            </h5>
                            <div style={{ fontSize: "12px" }}>
                              <span>{data.product_info} </span>
                              <br />
                              <span>{data.PG_transaction_timestamp} </span>
                            </div>
                          </div>
                        )}

                        {data.transaction_type === "failed" && (
                          <div>
                            <h5 style={{ color: "black" }}>
                              {data.biller_category_name}{" "}
                            </h5>
                            <div style={{ fontSize: "12px" }}>
                              <span>{data.product_info} </span>
                              <br />
                              <span>{data.PG_transaction_timestamp} </span>
                            </div>
                          </div>
                        )}

                        {data.transaction_type === "transfer" && (
                          <div>
                            <h5 style={{ color: "black" }}>
                              {data.transaction_type}{" "}
                            </h5>
                            <div style={{ fontSize: "12px" }}>
                              <span>
                                Transfered to: {data.transfer_to_name}{" "}
                              </span>
                              <br />
                              <span>{data.transfer_timestamp} </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <h5 style={{ color: "black" }}>
                          &#x20b9; {data.amount}
                        </h5>
                        <div style={{ fontSize: "12px" }}>
                          <Button
                            onClick={() =>
                              handleopenmini(data.amount_details_id)
                            }>
                            <ArrowForwardIosIcon fontSize="small" />{" "}
                          </Button>
                          <br />
                          <span>{data.transaction_type} </span>
                          {data.transaction_type === "debit" && (
                            <div>
                              {data.api_request_status === "SUCCESS" && (
                                <span style={{ color: "green" }}>
                                  {data.api_request_status}{" "}
                                </span>
                              )}

                              {data.api_request_status === "FAILURE" && (
                                <span style={{ color: "red" }}>
                                  {data.api_request_status}{" "}
                                </span>
                              )}
                            </div>
                          )}

                          {data.transaction_type === "credit" && (
                            <div>
                              {data.payment_status === "success" && (
                                <span style={{ color: "green" }}>
                                  {data.payment_status}{" "}
                                </span>
                              )}

                              {data.payment_status === "failure" && (
                                <span style={{ color: "red" }}>
                                  {data.payment_status}{" "}
                                </span>
                              )}
                            </div>
                          )}

                          {data.transaction_type === "failed" && (
                            <div>
                              {data.payment_status === "success" && (
                                <span style={{ color: "green" }}>
                                  {data.payment_status}{" "}
                                </span>
                              )}

                              {data.payment_status === "failure" && (
                                <span style={{ color: "red" }}>
                                  {data.payment_status}{" "}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div> */}

      <div style={{ visibility: "visible" }}>
        {isPopupOpen && selecteddata && (
          <div className="popup_Ministatement">
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
              onClick={togglePopup }
            >
              X
            </button>
            <div style={{width:'80%',padding:"20px"}}>
              {selecteddata.transaction_type === "debit" && (
                <div>
                  <div  >
                    {selecteddata.api_request_status === "SUCCESS" && (
                      <h3 style={{  color: "black", textAlign:'center' }}>
                        Transaction Summary
                      </h3>
                    )}

                    {selecteddata.api_request_status === "FAILURE" && (
                      <h3 style={{   color: "black", textAlign:'center' }}>
                        Transaction Summary
                      </h3>
                    )}
                  </div>

                  <br />
                  <div>
                    <br/>
                    <div  >
                      <div style={{ display: "flex", fontSize: "18px" }}>
                        <span style={{ width: "100%" }}> Amount: </span>
                        <span> {selecteddata.amount}</span>
                      </div>

                      <div style={{ display: "flex",fontSize: "18px"}}>
                      <span style={{ width: "100%" }}> Transaction Type </span>
                        <span  >
                          {selecteddata.transaction_type}{" "}
                        </span>
                        <span style={{ fontSize: "12px" }}>
                          {selecteddata.api_request_status}
                        </span>
                      </div>

                      <span style={{ fontSize: "16px" }}>
                        Payment Name:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.payment_name}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Biller Name:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.biller_alias_name}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Consumer Number:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.customer_params}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Date & Time:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.transaction_timestamp}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Ringpe Transaction Id:
                        {selecteddata.transacction_ref_id === null && (
                          <p style={{ fontSize: "12px" }}>
                            {selecteddata.txn_id}
                          </p>
                        )}
                        {selecteddata.transacction_ref_id !== null && (
                          <p style={{ fontSize: "12px" }}>
                            {selecteddata.transacction_ref_id}
                          </p>
                        )}
                      </span>

                      {selecteddata.PayUID !== null && (
                        <div>
                          <span>Payu Id: {selecteddata.PayUID} </span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {selecteddata.transaction_type === "credit" && (
                <div>
                  <div style={{ width: "100%" }}>
                    {selecteddata.payment_status === "success" && (
                      <h3 style={{ backgroundColor: "green", color: "white", textAlign:'center' }}>
                        Transaction
                      </h3>
                    )}

                    {selecteddata.payment_status === "failure" && (
                      <h3 style={{ backgroundColor: "red", color: "white", textAlign:'center' }}>
                        Transaction
                      </h3>
                    )}
                  </div>

                  <div>
                    <h5 style={{ textAlign: "left" }}>Payment Transaction </h5>

                    <div style={{ fontSize: "14px", textAlign: "left" }}>
                      <div style={{ display: "flex", fontSize: "18px" }}>
                        <span style={{ width: "100%" }}> Amount: </span>
                        <span>&#x20b9;&nbsp;{selecteddata.amount}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ width: "100%" }}>
                          {selecteddata.transaction_type}{" "}
                        </span>
                        <span style={{ fontSize: "12px" }}>
                          {selecteddata.payment_status}
                        </span>
                      </div>
                      <br />
                      <span style={{ fontSize: "16px" }}>
                        Payment Name:
                        <p style={{ fontSize: "16px" }}>
                          {selecteddata.product_info}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Biller Name:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.biller_category_name}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Bank Reference Number:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.Bank_ref_num}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Date & Time:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.PG_transaction_timestamp}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Ringpe Transaction Id:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.txn_id}
                        </p>
                      </span>

                      {selecteddata.PayUID !== null && (
                        <div>
                          <span>Payu Id: {selecteddata.PayUID} </span>
                          <br />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selecteddata.transaction_type === "failed" && (
                <div>
                  <div style={{ width: "100%" }}>
                    {selecteddata.payment_status === "success" && (
                      <h3 style={{ backgroundColor: "green", color: "white", textAlign:'center' }}>
                        Transaction
                      </h3>
                    )}

                    {selecteddata.payment_status === "failure" && (
                      <h3 style={{ backgroundColor: "red", color: "white", textAlign:'center' }}>
                        Transaction
                      </h3>
                    )}
                  </div>
                  <br />
                  <div>
                    <h5 style={{ textAlign: "left" }}>Payment Transaction </h5>

                    <div style={{ fontSize: "14px", textAlign: "left" }}>
                      <div style={{ display: "flex", fontSize: "18px" }}>
                        <span style={{ width: "100%" }}> Amount: </span>
                        <span>&#x20b9;&nbsp;{selecteddata.amount}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ width: "100%" }}>
                          {selecteddata.transaction_type}{" "}
                        </span>
                        <span style={{ fontSize: "12px" }}>
                          {selecteddata.payment_status}
                        </span>
                      </div>
                      <span style={{ fontSize: "16px" }}>
                        Payment Name:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.product_info}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Biller Name:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.biller_category_name}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Bank Reference Number:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.Bank_ref_num}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Date & Time:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.PG_transaction_timestamp}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Ringpe Transaction Id:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.txn_id}
                        </p>
                      </span>

                      {selecteddata.PayUID !== null && (
                        <div>
                          <span>Payu Id: {selecteddata.PayUID} </span>
                          <br />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {selecteddata.transaction_type === "transfer" && (
                <div>
                  <div style={{ width: "100%" }}>
                    {selecteddata.payment_status === "success" && (
                      <h3 style={{ backgroundColor: "green", color: "white", textAlign:'center' }}>
                        Transaction
                      </h3>
                    )}

                    {selecteddata.payment_status === "failure" && (
                      <h3 style={{ backgroundColor: "red", color: "white", textAlign:'center' }}>
                        Transaction
                      </h3>
                    )}
                  </div>

                  <br />
                  <div>
                    <h5 style={{ textAlign: "left" }}>Payment Transaction </h5>

                    <div style={{ fontSize: "14px", textAlign: "left" }}>
                      <div style={{ display: "flex", fontSize: "18px" }}>
                        <span style={{ width: "100%" }}> Amount: </span>
                        <span>
                          &#x20b9;&nbsp;{selecteddata.amount}
                          <br />
                          <span style={{ fontSize: "12px" }}>
                            {selecteddata.api_request_status}
                          </span>
                        </span>
                      </div>
                      <br />
                      <span style={{ fontSize: "16px" }}>
                        Transfered Name:
                        <p style={{ fontSize: "16px", color: "black" }}>
                          {selecteddata.transfer_to_name}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Transfer:
                        <p style={{ fontSize: "16px" }}>
                          From <br />
                          {selecteddata.transfer_from} <br />
                          to
                          <br /> {selecteddata.transfer_to}
                        </p>
                      </span>

                      <span style={{ fontSize: "16px" }}>
                        Date & Time:
                        <p style={{ fontSize: "12px" }}>
                          {selecteddata.transfer_timestamp}
                        </p>
                      </span>

                      {selecteddata.PayUID !== null && (
                        <div>
                          <span>Payu Id: {selecteddata.PayUID} </span>
                          <br />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
<br/> 
              <div style={{display:"flex",width:"80%",justifyContent:"space-around"}}>
            <Button   variant="contained"  onClick={handleButtonClick}>Log Issue</Button>
            <Button variant="contained"  >Report Fraud</Button>
            </div>
            {showTextField && (
              <div>
                <div style={{ display: "flex" }}>
                  <div>
                    <Button
                      onClick={handleButtonClick}
                      style={{ color: "black" }}
                    >
                      X
                    </Button>
                  </div>
                  <div>
                    <TextField
                      required
                      id="comments"
                      label="Comments"
                      value={comments}
                      multiline
                      rows={2}
                      onChange={(e) => {
                        setComments(e.target.value);
                      }}
                      style={{ margin: "10px",width:"100%"}}
                    />
                  </div>
                  
                </div>
                <div style={{textAlign:"center"}}>
                <Button   variant="contained" onClick={hadleRaisecomplaint}>
                  Submit
                </Button>
                </div>
              </div>
            )}
         
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <img src={ringpe_logo} width="10%" style={{margin:'20px'}} />
              <img src={BBPS} width="18%" height="20%" style={{margin:'20px'}}/>
            </div>
          </div>
        )}

        {isPopupOpen1 && (
          <div className="popup1_Ministatement">
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
            <div style={{textAlign:'center'}}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={ringpe_white_logo} width="20%" />
              </div>
              <br />
              <h2>&#x20b9;&nbsp;{selecteddata.amount}</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4 style={{ color: "#70aed6" }}>Ticket Status:</h4>
                <h4 style={{ color: "white" }}>{successdata.status}</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h4 style={{ color: "#70aed6" }}>Your Ticket Id:</h4>
                <h4 style={{ color: "white" }}>{successdata.ticket_id}</h4>
              </div>
              <img src={success} width="20%" />
              <h2>{successdata.message}</h2>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
    
          <div style={{ textAlign: 'left' }}>
            <Button href="Mainpage" variant="text" >
              BACK
            </Button>
          </div>
        </Container>
      </Box>
    </div>
  );
}

export default Ministatement;
