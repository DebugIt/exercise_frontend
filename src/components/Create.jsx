import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from "axios"
// mui
import TextField from '@mui/material/TextField';

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// spinner
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Create = () => {

    const navigate = useNavigate();

    const [username, SetUsername] = useState()
    const [description, setDescription] = useState()
    const [duration, setDuration] = useState()
    const [date, setDate] = useState()
    const [users, setUsers] = useState([{}])

    // getting selected user
    const [selected, setSelected] = useState("")
    const [openSnack, setOpenSnack] = useState(false);
    const [openError, setOpenError] = useState(false);
    // loading for spinner
    const [loading, setLoading] = useState(false);

    const handleSelectedVal = (e) => {
        const selVal = e.target.value;
        SetUsername(selVal);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!(username && description && duration && date)){
            setOpenError(true);
        }else{
            const exercise = {username, description, duration, date}
            console.log(exercise);
            try {
                const resp = await axios.post(`${process.env.REACT_APP_HOST_URL}/exercises/addExercise`, exercise);
                console.log(resp);
                if(resp.data.success === true){
                    setOpenSnack(true)
                    setLoading(true)
                }
            } catch (error) {
                console.log(error)
            }
            setTimeout(() => {
                navigate("/")
                setLoading(false)
            }, 5000);
        }

    }

    // to check if the value is being updated or not

    const fetchUsers = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_HOST_URL}/users`);
            console.log(res.data)
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])
    


  return (
    <>
        <Snackbar open={openSnack} autoHideDuration={3000} onClose={() => setOpenSnack(false)}>
            <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                Excercise Added Successfully...Redirecting Please wait!
            </Alert>
        </Snackbar>

        <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
            <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
                Please Fill All the Fields
            </Alert>
        </Snackbar>

        <div id="container" className='grid gap-3 my-10 place-items-center'>
            <h2 className='text-2xl font-bold'>Create New Exercise</h2>
            <FormControl className='w-[90%]'>
                <InputLabel id="demo-multiple-name-label">Select User</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={username}
                    disabled={loading}
                    onChange={handleSelectedVal}
                    input={<OutlinedInput label="Name" />
                    }
                >
                {
                    users.map((ele) => (
                        <MenuItem key={ele} value={ele.username}>{ele.username}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
            <TextField className='w-[90%]' disabled={loading} value={description} onChange={(e) => setDescription(e.target.value)} id="outlined-basic" label="Enter Description" variant="outlined" />
            <TextField className='w-[90%]' disabled={loading} type='number' value={duration} onChange={(e) => setDuration(e.target.value)} id="outlined-basic" label="Enter Duration" variant="outlined" />
            <TextField className='w-[90%]' disabled={loading} value={date} onChange={(e) => setDate(e.target.value)} id="outlined-basic" type='date' variant="outlined" />

            <button 
            className='text-white bg-[#252525] py-3 px-5 w-[90%] cursor-pointer hover:bg-black transition ease-in-out duration-300 '
            onClick={handleSubmit} disabled={loading}
            >Submit</button>
        </div>
        {
            loading && (
                <div>
                    <Box className="flex justify-center relative py-4">
                        <CircularProgress />
                    </Box>
                </div>
            )
        }
    </>
  )
}

export default Create