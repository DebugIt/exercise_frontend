import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import axios from "axios"

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const User = () => {
    
    const [username, setUsername] = useState()

    const HOST = process.env.REACT_APP_HOST_URL;

    const [openSnack, setOpenSnack] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [existUser, setExistUser] = useState(false)
    const [errMsg, setErrMsg] = useState()


    const handleSubmit = async () => {
        if(!username){
            setOpenError(true)
        }
        else{
            try {
                const user = {username}
                const res = await axios.post(`${HOST}/users/createuser`, user)
                console.log(res)
                if(res.data.success === true){
                    setOpenSnack(true)
                    setUsername("")
                }
                else{
                    setOpenError(true)
                }
            } catch (error) {
                console.log("error",error.response.data)
                if(error.response.data.success === true){
                    setExistUser(true)
                }
                
                
            }
        }
    }
    


    return (
    <>
    {/* snackbars */}
        <Snackbar open={openSnack} autoHideDuration={3000} onClose={() => setOpenSnack(false)}>
            <Alert onClose={() => setOpenSnack(false)} severity="success" sx={{ width: '100%' }}>
                User Created Successfully
            </Alert>
        </Snackbar>

        <Snackbar open={openError} autoHideDuration={3000} onClose={() => setOpenError(false)}>
            <Alert onClose={() => setOpenError(false)} severity="error" sx={{ width: '100%' }}>
                Fill the required fields
            </Alert>
        </Snackbar>

        <Snackbar open={existUser} autoHideDuration={3000} onClose={() => setExistUser(false)}>
            <Alert onClose={() => setExistUser(false)} severity="error" sx={{ width: '100%' }}>
                Username Already Exists
            </Alert>
        </Snackbar>
    {/* snackbars end*/}
    

        <div className='grid gap-3 place-items-center my-12'>
            <h1 className='text-4xl font-bold'>Create a User</h1>
            <TextField className='w-[90%]' value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Enter Username" variant="outlined" />
            <button 
            className='text-white bg-[#252525] py-3 px-5 w-[90%] cursor-pointer hover:bg-black transition ease-in-out duration-300 '
            onClick={handleSubmit}
            >Create User</button>
        </div>

    </>
  )
}

export default User