import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Checkbox, Paper, FormControlLabel, Container, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Avatar from "@mui/material/Avatar";
import { color, display, width } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';

// Global styles for the body
const GlobalStyle = styled('div')(({ theme }) => ({
  '& body': {
    backgroundColor: theme.palette.common.white,
  },
}));

// Styled Paper component
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%', // Fix IE 11 issue
  marginTop: theme.spacing(3),
}));

const StyledSubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  background: theme.palette.secondary.light,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  padding: theme.spacing(4, 2),
  // borderWidth: '1px',
  // borderColor: theme.palette.secondary.light,
  borderRadius: '20px',
}));

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: ""});
  const [errors, setErrors] = useState({});
  const [storeData, setStoreData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

 
  const handleLogin = () => {
    const storedUsers = localStorage.getItem("user"); // Get stored users

    if (!storedUsers) {
        alert("No users found! Please sign up first.");
        return;
    }

    const users = JSON.parse(storedUsers); // Convert JSON string to array
    console.log("Stored Users:", users);

    // Find user with matching email & password
    const foundUser = users.find(
        (user) => user.email === formData.email && user.password === formData.password
    );

    if (foundUser) {
        localStorage.setItem("isLoggedIn", "true"); // Mark login status
        localStorage.setItem("loginUser", JSON.stringify(foundUser));
        setIsLoggedIn(true);

        alert("You are logged in successfully!");
        navigate("/tasks"); // Redirect after login
    } else {
        alert("Invalid email or password!"); // If no match found
    }
};


    return(
        <>
         <Container maxWidth="xs" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 50px)"}}>
         <StyledBox>
         <Typography style={{textAlign: "center"}} component="h1" variant="h4">
                Login
          </Typography>
            <StyledForm noValidate >
                <Grid container spacing={2} style={{display:'flex', justifyContent:'center'}}>
                    <Grid item size={{ xs: 10 }}>
                      <TextField 
                          label="Email" 
                          type="email"
                          name="email"
                          variant="outlined" 
                          fullWidth 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p style={{color: "red", fontSize: "11px"}}>{errors.email}</p>}
                    </Grid>
                    <Grid item size={{ xs: 10 }}>
                      <TextField 
                          label="Password" 
                          type="password"
                          name="password"
                          variant="outlined" 
                          fullWidth 
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && <p style={{color: "red", fontSize: "11px"}}>{errors.password}</p>}
                    </Grid>
                    <Grid item size={{ xs: 10 }}>
                    <StyledSubmitButton type="submit" onClick={handleLogin} variant="contained" fullWidth>Login</StyledSubmitButton>
                    {errors.general && <p style={{color: "red", textAlign: "center"}}>{errors.general}</p>}
                    <p style={{textAlign: 'center', fontSize: '15px', cursor: 'pointer'}}>Do you have Account? <a style={{color:"#05f"}} href="/signup">Signup</a></p>                    
                  </Grid>  
                </Grid>
            </StyledForm>
            </StyledBox>

         </Container>
        </>
    )
}

export default Login;