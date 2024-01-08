import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { Button, OutlinedInput, CircularProgress } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import API_IP_ADDRESS from "../../../Config";
import { FormHelperText ,Container} from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 500,
    bgcolor: 'background.paper',
    borderRadius: "5px",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function TransferToWallet() {
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState("");
    const [amount, setAmount] = useState("");
    const [transferStatus, setTransferStatus] = useState("");
    //const [Data,setData]=useState([])
    const [open, setOpen] = React.useState(false);
    const [successdata, setSuccessdata] = useState(null); // Store the data from the API response
    const [failureReason, setFailureReason] = useState(''); // Store the reason for failure
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [mobileError, setMobileError] = useState('');



    const handleMobileNumberChange = (e) => {
        const inputPhoneNumber = e.target.value.slice(0, 10); // Limit the input to 10 characters
        setMobile(inputPhoneNumber);
        // Regular expression for a 10-digit mobile number starting from 6 to 9
        const phoneRegex = /^[6-9]\d{9}$/;
        // Check if the input matches the phone number pattern
        if (!phoneRegex.test(inputPhoneNumber)) {
            setMobileError('Please Enter a Valid 10-digit Mobile Number starting from 6 to 9');
            
        } else {
            setMobileError('');
             
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Create an object to send as the request body
        const requestBody = {
            mobile: mobile,
            amount: amount,
        };
        try {
            const response = await fetch(`${API_IP_ADDRESS}/bills/walletToWalletTransfer`,
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

            const responseData = await response.json();
            if (responseData.status === true) {
                setTransferStatus("Transfer Success!");
                setFailureReason('');
                setSuccessdata(responseData.data.result);
            } else {
                setTransferStatus("Transfer Failed!");
                setFailureReason(responseData.data.result.message);
                setSuccessdata(null);
            }
        } catch (err) {
            console.error(err.message);
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
                        <form  >
                            <FormControl fullWidth  variant="standard"  >
                                <OutlinedInput
                                    sx={{
                                        m: 1,
                                        height: '45px',
                                        backgroundColor: 'white',
                                        borderRadius: '50px',
                                    }}
                                    required
                                    placeholder="Enter Mobile No *"
                                    type="number"
                                    autoFocus
                                    value={mobile}
                                    maxLength={10}
                                    onChange={handleMobileNumberChange}
                                />
                            </FormControl>
                            <FormHelperText style={{ color: 'white' ,textAlign:"center"}}> {mobileError}</FormHelperText>
                            <FormControl fullWidth   variant="standard"  >
                                <OutlinedInput
                                    sx={{
                                        m: 1,
                                        height: '45px',
                                        backgroundColor: 'white',
                                        borderRadius: '50px',
                                    }}
                                    required
                                    placeholder="Enter Amount *"
                                    type="number"
                                    autoFocus
                                    value={amount}
                                     
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <br /><br /><br />
                            <div style={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onSubmit={handleSubmit}
                                >
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            style={{
                                                color: "white"
                                            }}
                                        />
                                    )}
                                    transfer
                                </Button>
                            </div>
                            {/* Display the transfer status */}

                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">

                                        {/* <h2>{transferStatus}</h2> */}
                                        {transferStatus === "Transfer Success!" && successdata && (
                                            <div>
                                                <p style={{ color: "green" }}>{transferStatus}
                                                    <div style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: '5%',
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                        // margin: '15%',
                                                    }}>
                                                        <h1 >Payment Done</h1>
                                                        <p>Name: {successdata.name}</p>
                                                        <p>Transfer ID: {successdata.transfer_id}</p>
                                                        <p>Timestamp: {successdata.Timestamp}</p>
                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <img src={require('../../Images/check.png')} style={{ height: '35%', width: '35%' }}></img>
                                                        </div>
                                                    </div>  </p>
                                            </div>
                                        )}
                                        {transferStatus === "Transfer Failed!" && failureReason && (
                                            <div>
                                                <p style={{ color: "red" }}>{transferStatus}
                                                    <div style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: '5%',
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                        // margin: '15%',
                                                    }}>
                                                        <p >Failure Reason: {failureReason}</p>
                                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <img src={require('../../Images/failed.webp')} style={{ height: '90%', width: '90%' }}></img>
                                                        </div>
                                                    </div>  </p>
                                            </div>
                                            // <p >Failure Reason: {failureReason}</p>
                                        )}
                                        <div style={{ padding: '0px 0px 0px 0px' }}>
                                            <button onClick={handleClose}>Close</button>
                                        </div>
                                    </Typography>
                                </Box>
                            </Modal>

                        </form>
                        </div>
                </Container>
            </Box>
        </div>
    )
}

export default TransferToWallet
