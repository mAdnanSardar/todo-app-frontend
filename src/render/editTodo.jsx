import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Profile from './profile';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../routes/backendRoute';
import { toast } from 'react-toastify';

const Edit = () => {
  const { todo_id } = useParams();
  const navigator = useNavigate();

  const [description, setDescription] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [todo, setTodo] = useState();

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };


  const handleBack = () => {
    navigator("/")
  }


  const handleSubmit = () => {
    let data = {
      todoDescription: description,
      completed: isChecked
    }
    fetch(BASE_URL + "/todo/updateTodo/" + todo_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then((response) => {
      toast.success("Updated")
      navigator("/")
    }).catch((error) => {
      console.log(error)
    })
  };

  useEffect(() => {
    fetch(BASE_URL + "/todo/getOneTodo/" + todo_id).then(response => response.json()).then((response) => {
      console.log(response.data)
      setTodo(response.data)
      setDescription(response.data.todoDescription)
      setIsChecked(response.data.completed)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <Profile>
      <div style={{ width: 400, padding: 16, backgroundColor: "white", borderRadius: 10 }}>
        <Typography variant="h5" gutterBottom sx={{ color: "black" }}>
          Edit Task
        </Typography>

        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
          label="Mark Completed"
          sx={{ color: "black" }}
        />

        <div>
          <Typography sx={{ color: "black" }} variant="h7" gutterBottom>
            Created At : {todo?.createdAt}
          </Typography>
        </div>
        <br />

        <div>
          <Button variant="outlined" sx={{ marginRight: 1 }} color="primary" onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="outlined" color="primary" onClick={handleBack}>
            Go Back
          </Button>
        </div>
      </div>
    </Profile>
  );
};

export default Edit;
