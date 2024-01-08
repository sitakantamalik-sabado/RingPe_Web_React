import React from 'react';
import "./Homepage.css"
import { Link } from 'react-router-dom';
const Homepage = () => {
    return (
        <div className='home'>
            <div className='container-1'>
                <div className='sub-container-1'>
                    <a href="/Mainpage/load&transfer"> <button className='button1'>LOAD & TRANSFER</button></a>
                    <a href="/Mainpage/recharge"> <button className='button2'>RECHARGE</button></a>
                    <a href="/Mainpage/paybills"><button className='button3'>PAY BILLS</button></a>
                    <a href="/Mainpage/travells">  <button className='button4'>TRAVELS</button></a>
                    <a href="/Mainpage/utilities"> <button className='button5'>UTILITIES</button></a>
                </div>
                <div className='sub-container-2'>
                    <p> Recent Payments</p>
                </div>
                <div className='sub-container-3'>
                    <p>Transactions Graph</p>
                </div>
            </div>
            <div className='container-2'>
                Transaction Details
            </div>
        </div>
    );
};

export default Homepage;
