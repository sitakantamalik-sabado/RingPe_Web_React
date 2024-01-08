import './App.css';
import { Routes, Route } from "react-router-dom";
import MainPage from './Components/MainPage/MainPage';
import LoginPage from './Components/LoginPage/LoginPage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/');
    }
  }, [navigate]);
  return (
      <Routes> 
      <Route path='/' element={<LoginPage/>} />
      {token && (
      <Route path='/Mainpage/*' element={<MainPage Token={token}/>} />
      )}
    </Routes>
      
  );
}
export default App;


// App.js
// import React from 'react';
// import {  Routes, Route } from 'react-router-dom';
// import MainPage from './Components/MainPage/MainPage';
// import LoginPage from './Components/LoginPage/LoginPage';

// const App = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<LoginPage/>} />
//        <Route path='/Mainpage/*' element={<MainPage/>} />
//     </Routes>
//   );
// };

// export default App;


 









