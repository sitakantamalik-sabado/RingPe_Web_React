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

import "./Utilities.css"
import Subscription from "../BBPS/Subscription/Subscription"
import MovieBooking from '../BBPS/MovieBooking/MovieBooking';
import Events from '../BBPS/Events/Events';
import Entertainment from "../BBPS/Entertainment/Entertainment";
import subscription from "../Images/subscriptions.png";
import movie from "../Images/movies.png";
import events from "../Images/events.png";
import entertainment from "../Images/theatre.png";


function Utilities() {
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
            case 'subscription':
                return (

                    <div>
                        <Subscription />
                    </div>
                );
            case 'movie booking':
                return (
                    <div>
                        <MovieBooking />
                    </div>
                );
            case 'events':
                return (

                    <div>
                        <Events />
                    </div>
                );
            case 'entertainment':
                return (
                    <div>

                        <Entertainment />
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
                            backgroundColor: activeButton === 'subscription' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                        onClick={() => handleButtonClick('subscription')}
                    >
                        <img style={{ height: "50%", marginRight: '20px' }} src={subscription}  ></img>{" "}

                        subscription
                    </Button>


                    <Button
                        variant="contained"
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: "10px",
                            backgroundColor: activeButton === 'movie booking' ? '#1e2d5a' : '#3746c8',
                            color: "white",
                            textAlign: "center",
                        }}
                        onClick={() => handleButtonClick('movie booking')}>
                        <img style={{ height: "50%",marginRight: '20px' }} src={movie}  ></img>{" "}

                        movie booking
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('events')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '10px',
                            backgroundColor: activeButton === 'events' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", marginRight: '20px' }} src={events}  ></img>{" "}

                        events
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('entertainment')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '10px',
                            backgroundColor: activeButton === 'entertainment' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", marginRight: '20px' }} src={entertainment}  ></img>{" "}

                        entertainment
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

export default Utilities;







