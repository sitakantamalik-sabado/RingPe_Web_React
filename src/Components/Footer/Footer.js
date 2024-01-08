// import * as React from "react";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import { Box } from "@mui/material";

// export default function Footer() {
//   return (
//     <Box
//       sx={{
//         backgroundColor: (theme) =>
//           theme.palette.mode === "light"
//             ? theme.palette.grey[200]
//             : theme.palette.grey[800],
//         p: 6,
//       }}
//       component="footer"
//     >
//       <Container maxWidth="sm">
//         <Typography variant="body2" color="text.secondary" align="center">
//           {"  © "} {new Date().getFullYear()}{" "} 
//           <Link color="inherit" href=" ">
//            RingPe Ltd, {" "}All Right Reserved
//           </Link> 
//           {/* {new Date().getFullYear()} */}
//           {"."}
//         </Typography>
//       </Container>
//     </Box>
//   );
// }

// Footer.js
import React from 'react';
import "./Footer.css"
const Footer = () => {
  return (
    <div>
    {/* Your page content goes here */}
    <div className="footer">
      {/* Footer content goes here */}
      © 2023 Your Website
    </div>
  </div>
  );
};

export default Footer;
