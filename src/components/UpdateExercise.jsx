import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// spinner
import CircularProgress from '@mui/material/CircularProgress';

const UpdateExercise = () => {
  const navigate = useNavigate()
  
  const [username, setUsername] = useState()
  const [description, setDescription] = useState()
  const [duration, setDuration] = useState()
  const [date, setDate] = useState()

  const [openSnack, setOpenSnack] = useState(false);
  const [openError, setOpenError] = useState(false);
  // loading for spinner
  const [loading, setLoading] = useState(false);

  const {id} = useParams();

  // 
  const getToUpdateData = async() => {
    try {
      const getData = await axios.get(`${process.env.REACT_APP_HOST_URL}/exercises/${id}`);
      const fetchedData = getData.data.exercise;
      console.log(fetchedData);
      setUsername(fetchedData.username);
      setDescription(fetchedData.description);
      setDuration(fetchedData.duration);
      setDate(fetchedData.date);

    } catch (error) {
      console.log(error)
    }
  }

  // 
  const handleUpdate = async(e) => {
    e.preventDefault();
        if(!(username && description && duration && date)){
            setOpenError(true);
        }else{
            const exercise = {username, description, duration, date}
            console.log(exercise);
            try {
                const resp = await axios.post(`${process.env.REACT_APP_HOST_URL}/exercises/update/${id}`, exercise);
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

  useEffect(() => {
    getToUpdateData()
  }, [])
  

  return (
    <>
      <Snackbar open={openSnack} autoHideDuration={3000} onClose={() => setOpenSnack(false)}>
        <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
          Excercise Updated Successfully...Redirecting Please wait!
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
          <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
              Please Fill All the Fields
          </Alert>
      </Snackbar>

      <div className='grid gap-3 place-items-center'>
        <h1 className="text-center">Update Exercise</h1><br/>
        <TextField id="outlined-basic" disabled={loading} className='w-[90%]' value={username} onChange={(e) => {setUsername(e.target.value)}} label="Username" variant="outlined" focused/>
        <TextField id="outlined-basic" disabled={loading} className='w-[90%]' value={description} onChange={(e) => {setDescription(e.target.value)}} label="Description" variant="outlined" focused/>
        <TextField id="outlined-basic" disabled={loading} type='number' className='w-[90%]' value={duration} onChange={(e) => {setDuration(e.target.value)}} label="Duration" variant="outlined" focused/>
        <TextField id="outlined-basic" disabled={loading} type='date' className='w-[90%]' value={date} onChange={(e) => {setDate(e.target.value)}} label="date" variant="outlined" focused/>

        <button 
            className='text-white bg-[#252525] py-3 px-5 w-[90%] cursor-pointer hover:bg-black transition ease-in-out duration-300 '
            onClick={handleUpdate} disabled={loading} 
        >Update Exercise!</button>
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

export default UpdateExercise