 

import React, { useState } from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Box, Button, Container, CircularProgress ,OutlinedInput} from "@mui/material";

function TransferToBank() {
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <Box sx={{ mt: 3 }} >
                <Container component="main" maxWidth="xm"  >

                    <div>
         
                        <form>
                            <FormControl fullWidth sx={{ m: 1 }} variant="standard"  >
                                <OutlinedInput
                                    sx={{
                                        m: 1,
                                        // Take up full width on small screens
                                        height: '45px',
                                        backgroundColor: 'white',
                                        borderRadius: '50px',
                                    }}
                                    required
                                    placeholder="Enter Amount *"
                                    type="number"
                                    autoFocus

                                />
                            </FormControl>
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                    //onClick={handleSubmit}
                                    >
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                style={{
                                                    color: "white"
                                                }}
                                            />
                                        )}
                                         transfer
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Container>
            </Box>
        </div>
    )
}

export default TransferToBank