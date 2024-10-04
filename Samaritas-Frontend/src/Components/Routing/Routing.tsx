import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import Register from '../Register/Register';
import Home from '../Home/Home';
import AgentList from '../AgentList/AgentList';
import RefugeeList from '../RefugeeList/RefugeeList';
import RefugeeDetails from '../RefugeeDetails/RefugeeDetails';
import AgentDetails from '../AgentDetails/AgentDetails';
import UserManagement from '../UserManagement/UserManagement';
import BroadcastList from '../BroadcastService/BroadcastList';

function Routing() {
    return (
        <div>
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Home />}>
                <Route path='refugee-list' element={<RefugeeList />} />
                <Route path='broadcast' element={<BroadcastList />} />
                <Route path='caseAgent-list' element={<AgentList />} />
                <Route path='refugee/:id' element={<RefugeeDetails />} />
                <Route path='agent/:id' element={<AgentDetails/>} />
                <Route path='user-management' element={<UserManagement/>} />
            </Route>
        </Routes>
    </div>
    
    )
}

export default Routing