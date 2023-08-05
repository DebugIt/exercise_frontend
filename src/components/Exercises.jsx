import axios from 'axios'
import React, {useEffect, useState} from 'react'

// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

// icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Exercises = () => {

  // intializing empty exercises array
  const [exercises, setExercises] = useState([{}])

  const getExercises = async() => {
    try {
      const exerRes = await axios.get(`${process.env.REACT_APP_HOST_URL}/exercises`);
      console.log(exerRes.data);
      setExercises(exerRes.data);
    } catch (error) {
      console.log(error)
    }
  }

  // deleting an exercise
  const deleteExercise = async(id) => {
    try {
      const newExerciseSet = await axios.delete(`${process.env.REACT_APP_HOST_URL}/exercises/`+id);
      console.log(newExerciseSet.data);
      exercises.filter(e => e._id !== id)
    } catch (error) {
      console.log(error)
    }
  }

  

  useEffect(() => {
    getExercises()
  }, [deleteExercise])
    

  return (
    <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell >Description</TableCell>
                <TableCell >Duration</TableCell>
                <TableCell >Date</TableCell>
                <TableCell >Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                exercises.map((exercise) => (
                  <TableRow key={exercise._id} >
                    <TableCell>{exercise.username}</TableCell>
                    <TableCell>{exercise.description}</TableCell>
                    <TableCell>{exercise.duration}</TableCell>
                    <TableCell>{exercise.date}</TableCell>
                    <TableCell>
                      <Link to={"/update/"+exercise._id}><EditIcon /></Link> | <a href="#" onClick={() => {deleteExercise(exercise._id)}}><DeleteIcon /></a>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
    </>
  )
}

export default Exercises