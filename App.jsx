import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Admin from './Admin';
import Adduser from './AddUser';
import User from './User';
import Orders from './orders';
import Menu from './Menu';
import Edit from './Edit';
import PendingOrders from './PendingOrders';
import Bill from './Bill';
import Report from './Report';
import Nav from './Nav';
import Printbill from './printbill';
import TodayOrders from './todayorders';
import TodayBill from './todaybill';
    //http://127.0.0.1:5000
    //http://127.0.0.1:5000
class App extends Component {
    state = { data:[] } 
    async componentDidMount()
    {
        const {data}=await axios.post("http://127.0.0.1:5000/PBR/data")
        this.setState({data:data})
    }
    render() { 
        return (
            <>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/PBR" element={<Menu data={this.state.data}/>}/>
                <Route path="/PBR/Admin" element={<Admin/>}/>
                <Route path="/PBR/orders" element={<Orders/>}/>
                <Route path="/PBR/AddUser" element={<Adduser/>}/>
                <Route path="/PBR/User" element={<User/>}/>
                <Route element={<Nav data={this.state.data}/>}/>
                <Route path="/PBR/Edit" element={<Edit data={this.state.data}/>}/>
                <Route path="/PBR/PendingOrders" element={<PendingOrders/>}/>
                <Route path="/PBR/Bill" element={<Bill/>}/>
                <Route path="/PBR/todayorders" element={<TodayOrders/>}/>
                <Route path="/PBR/todaybill" element={<TodayBill/>}/>
                <Route path="/PBR/Report" element={<Report menu={this.state.data}/>}/>
                <Route path="/PBR/Printbill" element={<Printbill/>}/>
            </Routes>

            </>
        );
    }
}
 
export default App;