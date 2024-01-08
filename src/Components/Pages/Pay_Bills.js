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

import "./pay_bills.css"
import Housing_society from '../BBPS/Housing/Housing_society';
import WaterBill from '../BBPS/Water_Bill/WaterBill';
import Hospital from '../BBPS/Hospital/Hospital';
import Apartment from '../BBPS/Apartment/Apartment';
import GasPipe from "../BBPS/GasPipe/GasPipe"
import Lpg_Gas from "../BBPS/LPGgas/Lpg_Gas";
import Electricity_Bill from "../BBPS/Electricity/Electricity_Bills"
import Club from "../BBPS/Club/Club";
import Broad_band from "../BBPS/BroadBand/Broad_band"
import Cable from '../BBPS/Cable/Cable';
import CreditCard_Bills from '../BBPS/CreditCard/CreditCard_Bills';
import Challan from "../BBPS/Challan/Challan";
import Rental from "../BBPS/Rental/Rental"
import Educatition_Fees from "../BBPS/Education/Education_Fees"
import Insurance from "../BBPS/Insurance/Insurance";
import Municipal_Tax from "../BBPS/Muncipal_Tax/Muncipal_Tax";
import housing from "../Images/house.png"
import water from "../Images/drop.png";
import hospital from "../Images/hospital.png";
import gaspipe from "../Images/gas.png";
import apartment from "../Images/apartment.png";
import lpggas from "../Images/flame.png";
import electricity from "../Images/elec.png";
import club from "../Images/associationclubs.png";
import broadband from "../Images/wifi-router.png";
import cabletv from "../Images/tv.png";
import challan from "../Images/policeman.png";
import creditcard from "../Images/credit-card.png";
import rental from "../Images/resort.png";
import educationfees from "../Images/online-learning.png";
import insurance from "../Images/insurance.png";
import municipaltax from "../Images/tax.png";



function Pay_Bills() {
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
            case 'housing society':
                return (
                    <div>
                        <Housing_society />
                    </div>
                );
            case 'water':
                return (
                    <div>
                        {/* <WaterBill /> */}
                    </div>
                );
            case 'hospitality':
                return (
                    <div>
                        <Hospital />
                    </div>
                );
            case 'apartment':
                return (
                    <div>
                        <Apartment />
                    </div>
                );
            case 'gas pipe':
                return (
                    <div>
                        <GasPipe />
                    </div>
                );
            case 'lpg gas':
                return (

                    <div>
                        <Lpg_Gas />
                    </div>
                );
            case 'electricity':
                return (
                    <div>
                        <Electricity_Bill />
                    </div>
                );
            case 'club':
                return (

                    <div>
                        <Club />
                    </div>
                );
            case 'broadband':
                return (

                    <div>
                        <Broad_band />
                    </div>
                );
            case 'cable tv':
                return (
                    <div>
                        <Cable />
                    </div>
                );
            case 'challan':
                return (
                    <div>
                        < Challan />
                    </div>
                );
            case 'credit card':
                return (

                    <div>
                        <CreditCard_Bills />
                    </div>
                );
            case 'rental':
                return (

                    <div>
                        <Rental />
                    </div>
                );
            case 'education fees':
                return (

                    <div>
                        <Educatition_Fees />
                    </div>
                );
            case 'insurance':
                return (

                    <div>
                        <Insurance />
                    </div>
                );
            case 'municipal tax':
                return (

                    <div>
                        <Municipal_Tax />
                    </div>
                );
            default:
                return null;
        }
    };

    return (

        <div className="container">

            <div className="sub-container1">
                <div className="button-container" >
                    <Button
                        variant="contained"
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'housing society' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                        onClick={() => handleButtonClick('housing society')}
                    >
                        <img style={{ height: "50%", paddingRight: "15px" }} src={housing} alt="dth"></img>{" "}

                        housing society
                    </Button>


                    <Button
                        variant="contained"
                          style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: "12px",
                            backgroundColor: activeButton === 'water' ? '#1e2d5a' : '#3746c8',
                            color: "white",
                            textAlign: "center",
                        }}
                        onClick={() => handleButtonClick('water')}>
                        <img style={{ height: "50%", paddingRight: "30px" }} src={water} alt="dth"></img>{" "}
                        water
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('hospitality')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'hospitality' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={hospital} alt="dth"></img>{" "}

                        hospitality
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('apartment')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'apartment' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={apartment} alt="dth"></img>{" "}

                        apartment
                    </Button>


                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('gas pipe')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'gas pipe' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={gaspipe} alt="dth"></img>{" "}

                        gas pipe
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('lpg gas')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'lpg gas' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={lpggas} alt="dth"></img>{" "}

                        lpg gas
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('electricity')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'electricity' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={electricity} alt="dth"></img>{" "}

                        electricity
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('club')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'club' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "25px" }} src={club} alt="dth"></img>{" "}

                        club
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('broadband')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'broadband' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={broadband} alt="dth"></img>{" "}

                        broadband
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('cable tv')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'cable tv' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={cabletv} alt="dth"></img>{" "}

                        cable tv
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('challan')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'challan' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={challan} alt="dth"></img>{" "}

                        challan
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('credit card')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'credit card' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={creditcard} alt="dth"></img>{" "}

                        credit card
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('rental')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'rental' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "25px" }} src={rental} alt="dth"></img>{" "}

                        rental
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('education fees')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'education fees' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "15px" }} src={educationfees} alt="dth"></img>{" "}

                        education fees
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('insurance')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'insurance' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={insurance} alt="dth"></img>{" "}

                        insurance
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('municipal tax')}
                        style={{
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '12px',
                            backgroundColor: activeButton === 'municipal tax' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", paddingRight: "20px" }} src={municipaltax} alt="dth"></img>{" "}

                        municipal tax
                    </Button>

                </div>

            </div>

            <div className="sub-container">
                <Card style={{ height: '100%', backgroundColor: '#3746c8' }}>
                    <CardContent>
                        <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
                            <div style={{ textAlign: 'center' }} > {activeButton ? activeButton.toUpperCase() : ' WATER BILL '}
                                <WaterBill />
                            </div>

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

export default Pay_Bills;





