import React from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import DotIcon from '../assets/icons/DotIcon';
import CheckCircleIcon from '../assets/icons/CheckCircleIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { BASE_URL } from '../routes/backendRoute';
import { toast } from 'react-toastify';

const AccordionWrapper = styled(Accordion)({
    marginBottom: theme => theme.spacing(2),
});

const CustomTypography = styled(Typography)({
    margin: 0,
});


function Accordian(props) {
    const navigator = useNavigate();

    const deleteTodo = () => {
        fetch(BASE_URL+"/todo/deleteTodo/"+props.id,{
            method:"DELETE"
        }).then((response) => {
            toast.error("Deleted")
            props.reload()
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const updateTodo = () => {
        navigator(`/edit/${props.id}`)
    }

    return (
        <AccordionWrapper>
            <AccordionSummary
                expandIcon={<DotIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <CheckCircleIcon />
                <CustomTypography sx={{ paddingLeft: 1 }} >Task {props.counter}</CustomTypography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <div style={{ marginTop: -12 }} >
                        <div style={{marginBottom:10, width:350}} >
                            {props.description}
                        </div>
                        <strong>Completed : </strong> 
                        {
                            props.completed?
                            <>
                                Completed!
                            </>
                            : <>
                                Not Completed!
                            </>
                        }
                    </div>
                    <div>
        
                        <strong>Created At : </strong> {props.createdAt}
                    </div>
                    <div>
                        <Button onClick={updateTodo} variant="outlined" color="info" sx={{marginRight:1, marginTop:1}} startIcon={<EditIcon />}>
                            Edit
                        </Button>
                        <Button onClick={deleteTodo} variant="outlined" color='error' sx={{marginRight:1, marginTop:1}} startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </div>

                </Typography>
            </AccordionDetails>
        </AccordionWrapper>
    )
}

export default Accordian;