import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import { TextField, Button, Checkbox, Paper, FormControlLabel, Container, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Signup from '../components/signup';
import { useNavigate } from "react-router-dom";
import { display } from '@mui/system';

 function Tasks() {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [filter, setFilter] = useState('all');
    const [open, setOpen] = useState(false);
    const [addTask, setAddtask] = useState({ title: "", date: "", checked: false });
    const [taskList, setTaskList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("loginUser");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    //Load tasks from local storage on component mount
    useEffect(() => {
        if(user){
        const storedTasks = JSON.parse(localStorage.getItem(`tasks_${user.email}`)) || [];
        if(storedTasks){
            setTaskList(storedTasks);
        }
    }
    }, [user])
    //save tasks to the localstorage when task list updates
    useEffect(() => {
        if(user && user.email && taskList.length > 0){
            localStorage.setItem(`tasks_${user.email}`, JSON.stringify(taskList));
        }
    }, [taskList, user])


    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleSelect = (e) => {
        setFilter(e.target.value);
    }

       // Filter tasks based on selection
    const filteredTasks = taskList.filter((task) => {
        if (filter === "completed") return task.checked;
        if (filter === "pending") return !task.checked;
        return true; // Show all
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddtask((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isEditing){
            const updatedTask = [...taskList];
            updatedTask[editIndex] = addTask;
            setTaskList(updatedTask);
            localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTask));
            setIsEditing(false);
            setEditIndex(null);
        } else{
            if(addTask.title && addTask.date){
                setTaskList([...taskList, addTask]);
            }
            if (!addTask.title.trim() || !addTask.date.trim()) {
                alert("Title and Date are required!");
                return;
            }
        }
        setAddtask({title: "", date: ""});
        setOpen(false);
    }

    const handleDelete = (index) => {
        const updatedTasks = taskList.filter((_, i) => i !== index);
        setTaskList(updatedTasks);
        if (updatedTasks.length > 0) {
            localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));
        } else {
            localStorage.removeItem(`tasks_${user.email}`);
        }    
    }

    const handleEdit = (index) => {
        setOpen(true);
        setIsEditing(true);
        setEditIndex(index);
        setAddtask(taskList[index]);
    }
    const handleChecked = (index) => {
        const updatedTasks = taskList.map((task, i) =>
            i === index ? { ...task, checked: !task.checked } : task
        );
        setTaskList(updatedTasks);
        localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks)); // Save updates
    }

    const logOut = () => {
        localStorage.removeItem("isLoggedIn");
        alert("You have logged out successfully!");
        navigate("/login");
    }

    return(
        <>        
                    {/* Dailog Add Tasks */}
                    <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <Container maxWidth="lg">
                    <DialogTitle className="text-center">Add New Task</DialogTitle>
                    <DialogContent>
                    <form noValidate onSubmit={handleSubmit}>
                    <Grid container style={{display:'flex', justifyContent:'center'}}>
                        <Grid item size={{ xs: 12 }}>
                            <TextField
                                autoFocus
                                required
                                value={addTask.title}
                                onChange={handleChange}
                                margin="dense"
                                id="title"
                                name="title"
                                label="Title"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                required
                                value={addTask.date}
                                onChange={handleChange}
                                margin="dense"
                                id="date"
                                name="date"
                                type="date"
                                fullWidth
                                variant="standard"
                            />
                            <Stack direction="row" sx={{ justifyContent: 'center' }}>
                            <Button type="submit" color='secondary' variant='contained' sx={{ marginTop: '40px' }}>{isEditing ? "Update" : "Add"}</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    </form>
                    </DialogContent>
                    </Container>
                </Dialog>


           <Container maxWidth="md">
            <Grid className='flex justify-end w-100'>
           <IconButton onClick={logOut} color="secondary" aria-label="LogoutIcon">
                            <LogoutIcon/>
            </IconButton>
            </Grid>
           <Typography style={{ textAlign: "center", marginTop: '20px', fontWeight: '600', textTransform: "capitalize" }} component="h1" variant="h4">
                    Todo Tasks
              </Typography>
              <Stack direction="row" sx={{ mt: 4, justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="contained" color="secondary" onClick={handleOpen}>Add Task</Button>  
                <FormControl sx={{ m: 1, p: 0, minWidth: 120 }}>
                    <Select
                    value={filter}
                    onChange={handleSelect}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value="all">
                        All
                    </MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                </FormControl>
              </Stack>

              {/* Added tasks */}
            
            {filteredTasks.length > 0 ? (
            <Stack spacing={2} sx={{ background: '#eee', p: 2, borderRadius: '12px', }}>
                <Stack spacing={2}>
                    {filteredTasks.map((task, index) => (
                    <Paper key={index} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} elevation={1} style={{ padding: '8px', width: "100%" }}>
                        <Stack direction='row' sx={{ alignItems: 'center' }}>
                            <Box>
                                <Checkbox {...label} color="secondary" size="large" checked={task.checked} onClick={() => handleChecked(index)}/>
                            </Box>
                            <Box style={{display: "flex", alignItems: "center"}}>
                                <Grid>
                                    <FormLabel>{task.title}</FormLabel>
                                    <Typography variant="body2" color="textSecondary">
                                        {task.date}
                                    </Typography>
                                </Grid>
                                {task.checked ?
                                <Button variant="outlined" color="success" size="small" style={{fontSize: "7px", marginLeft: "20px"}}>Completed</Button>
                                : 
                                <Button variant="outlined" color="error" size="small" style={{fontSize: "7px", marginLeft: "20px"}}>Pending</Button>
                            }
                            </Box>
                        </Stack>
                        <Stack direction="row" sx={{ alignContent: 'center' }}>
                        <IconButton color="secondary" aria-label="delete" onClick={() => handleDelete(index)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton color="secondary" aria-label="Edit" onClick={() => handleEdit(index)}>
                            <EditIcon />
                        </IconButton>
                        </Stack>
                    </Paper>
                ))}
                </Stack>
            </Stack>
            ) : null}

           </Container>
        </>
    )
}


export default Tasks;