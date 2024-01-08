import React, { useState } from 'react';
import {
     Button,
    Card,
    CardContent,
    Typography} from '@mui/material';
 import './load_transfer.css';
import loadmoneyImg from "../Images/bank.png"
import transferbank from "../Images/bank transfer.png"
import transferwallet from "../Images/wallet.png"
import ministatement from "../Images/bank _statement.png"
 import TransferToBank from '../BBPS/TransferToBank/TransferToBank';
import TransferToWallet from '../BBPS/TransferToWallet/TransferToWallet';
import Loadmoney from '../BBPS/Loadmoney/Loadmoney';
import Ministatement from '../Profile_Info/Ministatement/MInistatement';
  


const LoadTransfer = () => {
    const [activeButton, setActiveButton] = useState("");

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };


    const renderButtonContent = () => {
        switch (activeButton) {
            case 'load Money':
                return (
                    <div>
                         <Loadmoney/>
                    </div>

                );
            case 'transfer to Bank':
                return (
                   
                   <div>
                     <TransferToBank/>
                   </div>
                );
            case 'transfer to Wallet':
                return (
                   
                   <div>
                     <TransferToWallet/>
                   </div>
                );
            case 'mini statement':
                return (
                    <div>
                        {/* <Ministatement/> */}
                        Mini State
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
                        className='load_money'
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '10px',
                            backgroundColor: activeButton === 'load Money' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                        onClick={() => handleButtonClick('load Money')} >
                        <img style={{ height: "50%", marginRight: '20px' }} src={loadmoneyImg}></img>{" "}
                        Load Money
                    </Button>

                    


                    <Button
                        variant="contained"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: "10px",
                            backgroundColor: activeButton === 'transfer to Bank' ? '#1e2d5a' : '#3746c8',
                            color: "white",
                            textAlign: "center",
                        }}
                        onClick={() => handleButtonClick('transfer to Bank')}>
                        <img style={{ height: "50%", marginRight: '20px',marginLeft:"20px" }} src={transferbank}></img>
                      Bank Transfer
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('transfer to Wallet')}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '10px',
                            backgroundColor: activeButton === 'transfer to Wallet' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%", marginRight: '20px',marginLeft:"20px" }} src={transferwallet}></img>
                         Wallet Transfer
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => handleButtonClick('mini statement')}
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: '60px',
                            marginBottom: '30px',
                            width: '70%',
                            borderRadius: '50px',
                            fontSize: '10px',
                            backgroundColor: activeButton === 'mini statement' ? '#1e2d5a' : '#3746c8',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        <img style={{ height: "50%" , marginRight: '20px' }} src={ministatement}/>
                        Mini Statement
                    </Button>

                </div>

            </div>
            <div className="sub-container">
                <Card style={{ height: '100%', backgroundColor: '#3746c8' }}>
                    <CardContent>
                        <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
                            <div style={{ textAlign: 'center' }} > {activeButton ? activeButton.toUpperCase() : ' WELCOME TO LOAD MONEY PAGE '}</div>
                            
                        </Typography>
                        <br />
                        {renderButtonContent()}
                    </CardContent>


                </Card>
                
            </div>
            <div className="sub-container">
                {/* Content for the second sub-container */}


                Transaction Details
            </div>

        </div>
    );
};

export default LoadTransfer;




