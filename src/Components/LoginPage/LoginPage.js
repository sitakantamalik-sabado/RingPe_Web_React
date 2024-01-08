import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import logo from "../Images/ringpe cicle white.png"
import { useNavigate } from 'react-router-dom';
import API_IP_ADDRESS from '../../Config';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import { FormHelperText } from '@mui/material';

const LoginPage = () => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [combinedError, setCombinedError] = useState('');

    const handleMobileNumberChange = (e) => {
        const inputPhoneNumber = e.target.value.slice(0, 10); // Limit the input to 10 characters
        setMobileNumber(inputPhoneNumber);
        // Regular expression for a 10-digit mobile number starting from 6 to 9
        const phoneRegex = /^[6-9]\d{9}$/;
        // Check if the input matches the phone number pattern
        if (!phoneRegex.test(inputPhoneNumber)) {
            setMobileError('Please Enter a Valid 10-digit Mobile Number starting from 6 to 9');
            setCombinedError('');
        } else {
            setMobileError('');
            setCombinedError('');
        }
    };


    useEffect(() => {
        // This useEffect will trigger after 'loading' changes
        if (loading) {
            const timerId = setTimeout(() => {
                setLoading(true);
                navigate('/Mainpage');
            }, 2000);

            // Clear the timeout if the component unmounts or 'loading' changes
            return () => clearTimeout(timerId);
        }
    }, [loading, navigate]);


    const handlePasswordChange = (e) => {
        let inputPassword = e.target.value;
        // Enforce maximum length of 15 characters
        if (inputPassword.length > 15) {
            inputPassword = inputPassword.slice(0, 15);
        }
        setPassword(inputPassword);
        // Regular expression for password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,15}$/;

        // Check if the input matches the password pattern
        if (inputPassword.length >= 8 && inputPassword.length <= 15 && passwordRegex.test(inputPassword)) {
            setPasswordError('');
            setCombinedError('');
        } else {
            setPasswordError(
                'Please enter a valid password (minimum eight characters, at least one upper letter, one number, and one special character, maximum 15 characters)'
            );
            setCombinedError('');
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_IP_ADDRESS}/users/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    mobile: mobileNumber,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log(data);
            if (data.status === true) {

                localStorage.setItem("token", data.token);
                setLoading(true);
            } else {
                console.log('Invalid Credentials');
                setError(data.message)
            }
        } catch (err) {
            console.log(err.message);
        }
    };


    useEffect(() => {
        // Clear the token from localStorage when the login page component mounts
        localStorage.removeItem('token');
    }, []);
    // Rest of your JSX code...

    return (
        <div className="login-page-container">
            <div className="card">
                <div className="card-header">
                    <div className="welcome">Welcome</div>
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div style={{ textAlign: "center" }}>
                            <OutlinedInput
                                sx={{
                                    m: 1,
                                    width: '50%', // Take up full width on small screens
                                    height: '45px',
                                    backgroundColor: 'white',
                                    borderRadius: '50px',
                                }}
                                required
                                size="small"
                                value={mobileNumber}
                                id="mobilenumber"
                                placeholder="Mobile Number *"
                                name="mobilenumber"
                                type="number"
                                maxLength={10}
                                autoFocus
                                onChange={handleMobileNumberChange}
                            // error={<div style={{color:'white', borderColor:'blue'}}>{!!mobileError}</div>}
                            // helperText={<div style={{ color: 'white' }}>{mobileError}</div>}
                            />
                            <FormHelperText style={{ color: 'white', textAlign: "center" }}> {mobileError}</FormHelperText>

                            <OutlinedInput
                                sx={{
                                    m: 1,
                                    width: '50%', // Take up full width on small screens
                                    height: '45px',
                                    backgroundColor: 'white',
                                    borderRadius: '50px',
                                }}
                                placeholder="Password *"
                                required
                                size="small"
                                value={password}
                                name="password"
                                maxLength="15"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                onChange={handlePasswordChange}
                                className="password-field"
                                endAdornment={
                                    <InputAdornment   >
                                        <IconButton
                                            style={{ backgroundColor: 'white' }}
                                            onMouseEnter={() => setShowPassword(true)}
                                            onMouseLeave={() => setShowPassword(false)}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText style={{ color: 'white', textAlign: "center" }}> {passwordError}</FormHelperText>

                            <p style={{ color: 'white' }}>{error}</p>
                            <p style={{ color: 'white' }}>{combinedError}</p>

                            <Button
                                type="submit"
                                fullWidth
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: 'white', // Set background color
                                    height: '40px', // Set height
                                    width: '30%', // Set width
                                    borderRadius: "50px",
                                    fontWeight: "bold",
                                    '&:hover': {
                                        backgroundColor: 'white', // Change background color on hover if needed
                                    },
                                }}
                            >
                                Log In
                            </Button>


                        </div>
                    </form>



                </div>
            </div>
        </div>

    );
};


export default LoginPage;
