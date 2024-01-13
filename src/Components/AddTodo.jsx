import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import PlusIcon from '../assets/icons/PlusIcon';
import { BASE_URL } from '../routes/backendRoute';
import { toast} from 'react-toastify';

export default function CustomizedInputBase(props) {
    const [description, setDescription] = React.useState("")
    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }
    const addTask = (e) => {
        e.preventDefault()
        if (description === '') {
            toast.error("Please write Description")
            return
        }
        e.preventDefault()
        let data = {
            todoDescription: description
        }
        fetch(BASE_URL + '/todo/addTodo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((response) => {
                toast.success("Todo added")
                props.reload()
                setDescription("")
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <Paper
            onSubmit={addTask}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 415 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                value={description}
                onChange={handleChangeDescription}
                placeholder="Add new Task"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" onClick={addTask} aria-label="search">
                <div style={{ width: "30px", height: "30px", backgroundColor: "#F7E8D6", borderRadius: "8px", padding: "2px" }} >
                    <PlusIcon />
                </div>
            </IconButton>

        </Paper>
    );
}
