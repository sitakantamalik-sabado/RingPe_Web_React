import React from "react";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function T_Pin() {
  const [s_Question, setS_Question] = useState("option1");
  const [isFieldVisible, setFieldVisible] = useState(false);
  const [isFieldVisible1, setFieldVisible1] = useState(false);
  const [isButton1, setButton1] = useState(false);
  const [isButton2, setButton2] = useState(true);

  const handleButton1 = () => {
    setButton1(true);
    setButton2(false);
  };

  const handleButton2 = () => {
    setButton1(false);
    setButton2(true);
  };

  const handleButtonClick = () => {
    setFieldVisible(!isFieldVisible);
  };

  const handleButtonClick2 = () => {
    setFieldVisible1(!isFieldVisible1);
    setFieldVisible(false)
  };

  const handleS_Question = (e) => {
    setS_Question(e.target.value);
  };
  return (
    <div>

<Box sx={{ mt: 3 }} >
        <Container component="main" maxWidth="xs" 
         style={{
         padding: "20px",
         boxShadow: "4px 2px 8px 2px #ACB1D6",
         borderRadius: "8px",
         width:"50%",
        fontFamily: "open sans,Helvetica,Arial,sans-serif",
      }}>
 <div style={{ textAlign: 'center' }}>
 <h2 style={{fontSize:"24px",textAlign:"center",color:"green" }}>T-PIN</h2><br/>

            <div style={{ textAlign: "center" }}>
            
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ borderRadius: "20px", fontSize: "16px" }}
                onClick={handleButtonClick}
                disabled={isButton1}
              >
                Enable T-PIN
              </Button>
              <br />
              {isFieldVisible && (
                <div>
                  <TextField
                    required
                    fullWidth
                    label="Enter T-PIN"
                    InputProps={{ style: { borderRadius: "20px" } }}
                  />
                  <br />
                  <br />

                  <TextField
                    required
                    fullWidth
                    label="Re-Enter T-PIN"
                    InputProps={{ style: { borderRadius: "20px" } }}
                  /><br/><br/>

                  <InputLabel id="demo-customized-select-label">
                    Choose Security Question
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    label="Choose Security Question"
                    defaultValue="option1"
                    value={s_Question}
                    fullWidth
                    onChange={handleS_Question}
                  >
                    <MenuItem value="option1">
                      What was your childhood nickname?
                    </MenuItem>
                    <MenuItem value="option2">
                      What is the name of your favorite childhood friend?
                    </MenuItem>
                    <MenuItem value="option3">
                      What is the middle name of your youngest child?
                    </MenuItem>
                    <MenuItem value="option4">
                      What is your oldest sibling's middle name?
                    </MenuItem>
                  </Select>
                  <br />
                  <br/>
              <TextField
                required
                fullWidth
                label="Answer"
                InputProps={{ style: { borderRadius: "20px" } }}
              /><br/><br/>
               <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleButton1}
                style={{ borderRadius: "20px", fontSize: "16px" }}
              >
                Done
              </Button>
                </div>
              )}<br/>

              <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleButtonClick2}
              style={{ borderRadius: "20px", fontSize: "16px" }}
              disabled={isButton2}
              >
                Change T-PIN
                </Button>
                {isFieldVisible1 && (
                  <div>
              <Link href="#" variant="body2" style={{ fontSize: "14px" }}>
                Forgot T-PIN
              </Link>
              <br /><br />

              <TextField
                required
                fullWidth
                label="Enter Old T-PIN"
                InputProps={{ style: { borderRadius: "20px" } }}
              />
              <br /><br />

              <TextField
                required
                fullWidth
                label="New T-PIN"
                InputProps={{ style: { borderRadius: "20px" } }}
              />
              <br /><br />

              <TextField
                required
                fullWidth
                label="Re-Enter New T-PIN"
                InputProps={{ style: { borderRadius: "20px" } }}
              />
              <br /><br />

              <InputLabel id="demo-customized-select-label">
                Choose Security Question
              </InputLabel>
              <Select
                required
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                label="Choose Security Question"
                defaultValue="option1"
                value={s_Question}
                fullWidth
                onChange={handleS_Question}
              >
                <MenuItem value="option1">
                  What was your childhood nickname?
                </MenuItem>
                <MenuItem value="option2">
                  What is the name of your favorite childhood friend?
                </MenuItem>
                <MenuItem value="option3">
                  What is the middle name of your youngest child?
                </MenuItem>
                <MenuItem value="option4">
                  What is your oldest sibling's middle name?
                </MenuItem>
              </Select>
              <br /><br />

              <TextField
                required
                fullWidth
                label="Answer"
                InputProps={{ style: { borderRadius: "20px" } }}
              />
              <br /><br />

              <Button
                variant="contained"
                color="success"
                fullWidth
                style={{ borderRadius: "20px", fontSize: "16px" }}
              >
                Done
              </Button>
              <br />
              </div>
              )}
            </div>
          </div>
           
          </div>
          <div style={{ textAlign: 'left' }}>
        <Button href="Profile_Index" variant="text">
          BACK
        </Button>
      </div> 
        </Container>
      </Box>


    </div>
  );
}

export default T_Pin;
