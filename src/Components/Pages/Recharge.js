
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

import "./Recharge.css"
import Mobile_prepaid from '../BBPS/Mobile_Prepaid/Mobile_prepaid';
import Mobile_postpaid from '../BBPS/Mobile_Postpaid copy/Mobile_postpaid';
import Fastag from '../BBPS/Fastag/Fastag';
import Dth from '../BBPS/DTH/Dth';
import prepaid from "../Images/prepaid.png"
import postpaid from "../Images/postpaid.png"
import fasttag from "../Images/fasttag.png"
import dth from "../Images/dth.png"

function Recharge() {
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
            case 'prepaid':
                return (
                    <div>
                        <Mobile_prepaid />
                    </div>
                );
            case 'postpaid':
                return (
                    <div>
                        <Mobile_postpaid />
                    </div>
                );
            case 'fast tag':
                return (

                    <div>
                        <Fastag />
                    </div>
                );
            case 'dth':
                return (
                    <div>
                        <Dth />
                    </div>
                );
            default:
                return null;
        }
    };

    return (

        // <div className="container">
        //     <div className="sub-container">
        //         <div className="button-container" >
        //             <Button
        //                 variant="contained"
        //                 style={{
        //                     height: '60px',
        //                     marginBottom: '30px',
        //                     width: '70%',
        //                     borderRadius: '50px',
        //                     fontSize: '10px',
        //                     backgroundColor: activeButton === 'prepaid' ? '#1e2d5a' : '#3746c8',
        //                     color: 'white',
        //                     textAlign: 'center',
        //                 }}
        //                 onClick={() => handleButtonClick('prepaid')}
        //             >
        //                 <img style={{ height: "50%", paddingRight: "10px" }} src={prepaid}></img>{" "}
        //                 prepaid
        //             </Button>


        //             <Button
        //                 variant="contained"
        //                 style={{
        //                     height: '60px',
        //                     marginBottom: '30px',
        //                     width: '70%',
        //                     borderRadius: '50px',
        //                     fontSize: "10px",
        //                     backgroundColor: activeButton === 'postpaid' ? '#1e2d5a' : '#3746c8',
        //                     color: "white",
        //                     textAlign: "center",
        //                 }}
        //                 onClick={() => handleButtonClick('postpaid')}>
        //                 <img style={{ height: "50%", paddingRight: "10px" }} src={postpaid}></img>{" "}

        //                 postpaid
        //             </Button>

        //             <Button
        //                 variant="contained"
        //                 onClick={() => handleButtonClick('fast tag')}
        //                 style={{
        //                     height: '60px',
        //                     marginBottom: '30px',
        //                     width: '70%',
        //                     borderRadius: '50px',
        //                     fontSize: '12px',
        //                     backgroundColor: activeButton === 'fast tag' ? '#1e2d5a' : '#3746c8',
        //                     color: 'white',
        //                     textAlign: 'center',
        //                 }}
        //             >
        //                 <img style={{ height: "50%", paddingRight: "10px" }} src={fasttag}></img>{" "}

        //                 fast tag
        //             </Button>

        //             <Button
        //                 variant="contained"
        //                 onClick={() => handleButtonClick('dth')}
        //                 style={{
        //                     height: '60px',
        //                     marginBottom: '30px',
        //                     width: '70%',
        //                     borderRadius: '50px',
        //                     fontSize: '12px',
        //                     backgroundColor: activeButton === 'dth' ? '#1e2d5a' : '#3746c8',
        //                     color: 'white',
        //                     textAlign: 'center',
        //                      display: 'flex', // Added display flex to align items vertically
        //                     alignItems: 'center', // Align items vertically in the center
        //                 }}
        //             >
        //                 <img style={{ height: "50%" ,paddingRight:"25px"}} src={dth} alt="dth"></img>{" "}
        //                 dth
        //             </Button>


        //         </div>

        //     </div>
        //     <div className="sub-container">
        //         <Card style={{ height: '100%', backgroundColor: '#3746c8' }}>
        //             <CardContent>
        //                 <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
        //                     <div style={{ textAlign: 'center' }} > {activeButton ? activeButton.toUpperCase() : ' WELCOME TO RECHARGE PAGE '}</div>

        //                 </Typography>
        //                 <br />
        //                 {renderButtonContent()}
        //             </CardContent>

        //             <Modal
        //                 open={open}
        //                 onClose={() => setOpen(false)}
        //                 aria-labelledby="modal-modal-title"
        //                 aria-describedby="modal-modal-description"
        //             >
        //                 <Box
        //                     style={{
        //                         position: 'absolute',
        //                         top: '50%',
        //                         left: '50%',
        //                         transform: 'translate(-50%, -50%)',
        //                         width: 500,
        //                         height: 500,
        //                         bgcolor: 'white',
        //                         borderRadius: '10px',
        //                         boxShadow: 24,
        //                         p: 4,
        //                     }}
        //                 >
        //                     <button
        //                         onClick={() => setOpen(false)}
        //                         style={{
        //                             position: 'absolute',
        //                             top: '10px',
        //                             right: '10px',
        //                             cursor: 'pointer',
        //                             background: 'none',
        //                             border: 'none',
        //                             fontSize: '18px',
        //                             color: 'black',
        //                         }}
        //                     >
        //                         X
        //                     </button>
        //                     {/* Content for the modal */}
        //                 </Box>
        //             </Modal>
        //         </Card>
        //     </div>
        //     <div className="sub-container">
        //         {/* Content for the second sub-container */}


        //         Transaction Details
        //     </div>

        // </div>
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
                        backgroundColor: activeButton === 'prepaid' ? '#1e2d5a' : '#3746c8',
                        color: 'white',
                        textAlign: 'center',
                    }}
                    onClick={() => handleButtonClick('prepaid')} >
                    <img style={{ height: "50%", marginRight: '20px' }} src={prepaid}></img>{" "}
                    prepaid
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
                        backgroundColor: activeButton === 'postpaid' ? '#1e2d5a' : '#3746c8',
                        color: "white",
                        textAlign: "center",
                    }}
                    onClick={() => handleButtonClick('postpaid')}>
                    <img style={{ height: "50%", marginRight: '20px',marginLeft:"2  0px" }} src={postpaid}></img>
                    postpaid
                </Button>

                <Button
                    variant="contained"
                    onClick={() => handleButtonClick('fast tag')}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: '60px',
                        marginBottom: '30px',
                        width: '70%',
                        borderRadius: '50px',
                        fontSize: '10px',
                        backgroundColor: activeButton === 'fast tag' ? '#1e2d5a' : '#3746c8',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    <img style={{ height: "50%", marginRight: '20px' }} src={fasttag}></img>
                    fast tag
                </Button>

                <Button
                    variant="contained"
                    onClick={() => handleButtonClick('dth')}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: '60px',
                        marginBottom: '30px',
                        width: '70%',
                        borderRadius: '50px',
                        fontSize: '10px',
                        backgroundColor: activeButton === 'dth' ? '#1e2d5a' : '#3746c8',
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    <img style={{ height: "50%" , marginRight: '20px' }} src={dth}/>
                    dth
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
}

export default Recharge;



