//  import React from 'react'
// import Navbar from '../Navbar/Navbar'
// import Foooter from '../Footer/Footer'
import { Route, Routes } from 'react-router-dom'
// import Homepage from '../Homepage/Homepage'
// import "./Mainpage.css"
// import Load_Transfer from '../Pages/Load_Transfer'
// import Recharge from '../Pages/Recharge'
// import Pay_Bills from '../Pages/Pay_Bills'
//  function MainPage() {
//    return (
//     <div>
//         <Navbar/> 
//         {/* <div className='container'>
//         <Routes>
//         <Route path='/*' element={<Homepage/>} />
//          <Route path='load&transfer' element={<Load_Transfer/>} />
//          <Route path='recharge' element={<Recharge/>} />
//          <Route path='paybills' element={<Pay_Bills/>} />
//         </Routes>
//        </div> */}
//       <div>homeoagde</div> 
//      <Foooter/>
//      </div>
//    )
//  }

//  export default MainPage

// Layout.js
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Homepage from '../Homepage/Homepage';
import Footer from '../Footer/Footer';
import Load_Transfer from '../Pages/Load_Transfer'
import Recharge from '../Pages/Recharge';
import Pay_Bills from '../Pages/Pay_Bills';
import Utilities from '../Pages/Utilities';
import Travells from '../Pages/Travells';
import Customer_support from "../Customer_support/Customer_support"
import Profile from "../Profile_Info/Profile"
import Profile_Index from '../Profile_Info/Edit_Profile/Profile_Index';
import  Add_address from '../Profile_Info/Edit_Profile/Add_address';
import  Email_Change from '../Profile_Info/Edit_Profile/Email_Change';
import  Change_Password from '../Profile_Info/Edit_Profile/Change_Password';
import  T_Pin from '../Profile_Info/Edit_Profile/T_Pin';
import  Set_Cap from '../Profile_Info/Edit_Profile/Set_Cap';
import  Link_Bank from '../Profile_Info/Edit_Profile/Link_Bank';
import  Income_Verification from '../Profile_Info/Edit_Profile/Income_Verification';
import  Add_Nominee from '../Profile_Info/Edit_Profile/Add_Nominee';
import  Update_Bank from '../Profile_Info/Edit_Profile/Update_Bank';
import Ministatement from '../Profile_Info/Ministatement/MInistatement';


const MainPage = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/*' element={<Homepage />} />
                <Route path='load&transfer' element={<Load_Transfer />} />
                <Route path='recharge' element={<Recharge />} />
                <Route path='paybills' element={<Pay_Bills />} />
                <Route path='utilities' element={<Utilities />} />
                <Route path='travells' element={<Travells />} />
                <Route path="Customer_support" element={<Customer_support />} />
                <Route path="Profile" element={<Profile />} />
                <Route path="Profile_Index" element={<Profile_Index/>} />
                <Route path="Add_address" element={<Add_address/>} />
                <Route path="Email_Change" element={<Email_Change/>} />
                <Route path="Change_Password" element={<Change_Password />} />
                <Route path="T_Pin" element={<T_Pin />} />
                <Route path="Set_Cap" element={<Set_Cap />} />
                <Route path="/Link_Bank" element={<Link_Bank />} />
                <Route path="Income_Verification" element={<Income_Verification />} />
                <Route path="Add_Nominee" element={<Add_Nominee />} />
                <Route path="Update_Bank" element={<Update_Bank />} />
                <Route path="/ministatement" element={<Ministatement/>} />
                

            </Routes>
            <Footer />
        </div>
    );
};

export default MainPage;
