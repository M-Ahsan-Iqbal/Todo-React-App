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

function Signup(){
  const [formData, setFormData] = useState({ name: "", email: "", password: "", cnPassword: ""});
  const [errors, setErrors] = useState({});
  const [storeData, setStoreData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || [];
    setStoreData(data);
  }, [])

  // validate form fields

  const validateField = (name, value) => {
    let error = "";

    switch(name){
      case "name":
        if(!value){
          error = "Name is required";
        }
        break;

        case "email":
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if(!value){
            error = "Email is required";
          }
            else if(!emailPattern.test(value)){
              error = "Email is not valid";
            }
            break;

            case "password":
              if(!value){
                error = "Password is required";
              } else if(value.length < 6){
                error = "Password should be at least 6 characters";
              }
              break;

              case "cnPassword":
                if(!value){
                  error = "Confirm password is required";
                } else if(value !== formData.password){
                  error = "Password do not match";
                }
                break;

        default:
        break;
    }
      return error;
    }

    // Handle Update Data
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

  //// Validate the field being updated

  const fieldError = validateField(name, value);

  // Update error state for that field
  setErrors((prevState) => ({
    ...prevState,
    [name]: fieldError,
  }))
}

 // Full form validation on submit
 const validateForm = () => {
  let formErrors = {};

  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) {
      formErrors[key] = error;
    }
  });

  return formErrors;
};


const handleSubmit = (e) => {
  e.preventDefault();
  // Validate form before proceeding
  const formErrors = validateForm();
  if (Object.keys(formErrors).length === 0) {
    const isDuplicate = storeData.some(
      (user, index) => 
        (user.name === formData.name || user.email === formData.email) && 
        index !== editIndex
    )

    if(isDuplicate){
      setErrors({
        general: "Username or email already exists",
      });
      return;
    }

    if (isEditing) {
      // Update data in edit mode
      const updatedData = [...storeData];
      updatedData[editIndex] = formData;
      setStoreData(updatedData);
      localStorage.setItem('user', JSON.stringify(updatedData));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new data in add mode
      localStorage.getItem('user');
      const updatedData = [...storeData, formData];
      localStorage.setItem('user', JSON.stringify(updatedData));
      setStoreData(updatedData);
      alert("Your Account is Created");
      navigate("/");
    }
    // Reset the form after successful submission
    setFormData({ name: "", email: "", password: "", cnPassword: "" });
    setErrors({});
  } else {
    // Set errors to display them in the form
    setErrors(formErrors);
  }
};

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(storeData[index]);
  }

  const handleDelete = (index) => {
    const updatedData = storeData.filter((_,i) => i !== index);
    setStoreData(updatedData);
    localStorage.setItem('user', JSON.stringify(updatedData));
  }

    return(
        <>
         <Container maxWidth="xs" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "calc(100vh - 50px)"}}>
         <StyledBox>
         <Typography style={{textAlign: "center"}} component="h1" variant="h4">
                Signup
          </Typography>
            <StyledForm noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2} style={{display:'flex', justifyContent:'center'}}>
                    <Grid item size={{ xs: 10 }}>
                      <TextField
                          label="Name" 
                          type="text"
                          name="name"
                          variant="outlined" 
                          fullWidth
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && <p style={{color: "red", fontSize: "11px"}}>{errors.name}</p>}
                    </Grid>
                    <Grid item size={{ xs: 10 }}>
                      <TextField 
                          label="Email" 
                          type="email"
                          name="email"
                          variant="outlined" 
                          fullWidth 
                          value={formData.email}
                          onChange={handleChange}
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
                          onChange={handleChange}
                        />
                        {errors.password && <p style={{color: "red", fontSize: "11px"}}>{errors.password}</p>}
                    </Grid>
                    <Grid item size={{ xs: 10 }}>
                      <TextField
                          label="Confirm Password"
                          type="password"
                          name="cnPassword"
                          variant="outlined" 
                          fullWidth 
                          value={formData.cnPassword}
                          onChange={handleChange}
                        />
                        {errors.cnPassword && <p style={{color: "red", fontSize: "11px"}}>{errors.cnPassword}</p>}
                      </Grid>
                    <Grid item size={{ xs: 10 }}>
                    <StyledSubmitButton type="submit" variant="contained" fullWidth>{isEditing ? "Update" : "Save"}</StyledSubmitButton>
                    {errors.general && <p style={{color: "red", textAlign: "center"}}>{errors.general}</p>}
                    <p style={{textAlign: 'center', fontSize: '15px', cursor: 'pointer'}}>Already Registered? <a style={{color:"#05f"}} href="/login">Login</a></p>                    
                  </Grid>  
                </Grid>
            </StyledForm>
            </StyledBox>

{/* 
            {storeData.length > 0 ? (
            <table style={{width:"100%", margin: "20px 0", border:'1px solid #000'}}>
              <tbody>
                {storeData.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>{data.cnPassword}</td>
                  <td><button onClick={()=> handleEdit(index)}>Edit</button></td>
                  <td><button onClick={() => handleDelete(index)}>Delete</button></td>
                </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No User</p>
          )} */}
         </Container>
        </>
    )
}

export default Signup;