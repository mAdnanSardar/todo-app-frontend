import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from '../render/frontPage'
import Edit from '../render/editTodo'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function Index() {
    return (
        <>
            <BrowserRouter>
                <ToastContainer/>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/edit/:todo_id' element={<Edit/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Index