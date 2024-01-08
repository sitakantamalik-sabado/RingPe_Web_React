import React, { useState } from 'react';
import {
    Grid,
    Button,
    Card,
    CardContent,
    Typography,
    OutlinedInput,
    Modal,
    Box
} from '@mui/material';

import "./Travells.css"
import Bus from '../BBPS/Bus/Bus';
import Train from '../BBPS/Train/Train';
import Flight from '../BBPS/Flight/Flight';
import Metro from '../BBPS/Metro/Metro';
import bus from "../Images/bus.png";
import train from "../Images/train.png";
import flight from "../Images/flight.png";
import metro from "../Images/metro.png";

function Travells() {
    const [activeButton, setActiveButton] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Your existing submit logic
    };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    const renderButtonContent = () => {
        switch (activeButton) {
            case 'bus':
                return (
                    <div>
                        <Bus />
                    </div>
                );
            case 'train':
                return (
                    <div>

                        <Train />
                    </div>
                );
            case 'flight':
                return (

                    <div>
                        <Flight />
                    </div>
                );
            case 'metro':
                return (
                    <div>

                        <Metro />
                    </div>
                );
            default:
                return null;
        }
    };

    return (

 
        <div className="container">
        <div className="sub-container">
            <div className="button-container" >
                <Button
                    variant="contained"
                    style={{
                        height: '60px',
                        marginBottom: '30px',
                        width: '70%',
                        borderRadius: '50px',
                        fontSize: '10px',
                        backgroundColor: activeButton === 'bus' ? '#1e2d5a' : '#3746c8',
                        color: 'white',
                        textAlign: 'center',
                    }}
                    onClick={() => handleButtonClick('bus')}
                >
                    <img style={{ height: "50%", marginRight: '20px' }} src={bus} alt="dth"></img>{" "}

                    bus
                </Button>


                <Button
                    variant="contained"
                    style={{
                        height: '60px',
                        marginBottom: '30px',
                        width: '70%',
                        borderRadius: '50px',
                        fontSize: "10px",
                        backgroundColor: activeButton === 'train' ? '#1e2d5a' : '#3746c8',
                        color: "white",
                        textAlign: "center",
                    }}
                    onClick={() => handleButtonClick('train')}>
                    <img style={{ height: "50%", marginRight: '20px' }} src={train} alt="dth"></img>{" "}

                    train
                </Button>

                <Button
                    variant="contained"
                    onClick={() => handleButtonClick('flight')}
                    style={{
                        height: '60px',
                        marginBottom: '30px',
                        width: '70%',
                        borderRadius: '50px',
                        fontSize: '10px',
                        backgroundColor: activeButton === 'flight' ? '#1e2d5a' : '#3746c8',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    <img style={{ height: "50%", marginRight: '20px' }} src={flight} alt="dth"></img>{" "}

                    flight
                </Button>

                <Button
                    variant="contained"
                    onClick={() => handleButtonClick('metro')}
                    style={{
                        height: '60px',
                        marginBottom: '30px',
                        width: '70%',
                        borderRadius: '50px',
                        fontSize: '10px',
                        backgroundColor: activeButton === 'metro' ? '#1e2d5a' : '#3746c8',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    <img style={{ height: "50%", marginRight: '20px' }} src={metro} alt="dth"></img>{" "}

                    metro
                </Button>

            </div>

        </div>
        <div className="sub-container">
            <Card style={{ height: '100%', backgroundColor: '#3746c8' }}>
                <CardContent>
                    <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
                        <div style={{ textAlign: 'center' }} > {activeButton ? activeButton.toUpperCase() : ' WELCOME TO UTILITIES PAGE '}</div>

                    </Typography>
                    <br />
                    {renderButtonContent()}
                </CardContent>

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            height: 500,
                            bgcolor: 'white',
                            borderRadius: '10px',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                cursor: 'pointer',
                                background: 'none',
                                border: 'none',
                                fontSize: '18px',
                                color: 'black',
                            }}
                        >
                            X
                        </button>
                        {/* Content for the modal */}
                    </Box>
                </Modal>
            </Card>
        </div>
        <div className="sub-container">
            {/* Content for the second sub-container */}


            Transaction Details
        </div>

    </div>
    );
}

export default Travells;





