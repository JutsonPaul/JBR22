import Nav from "./Nav";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const TodayOrders = () => {
    const {state}=useLocation();
    const[data,setdata]=useState([]);
    var si=1;
    useEffect(()=>{
        axios.post("http://127.0.0.1:5000/PBR/todayorders",{"date":state}).then(Response=>
        {
            console.log(Response.data)
            setdata(Response.data)
        })
      },[])
    return ( 
        <>
        <Nav/>
        <h1>TodayOrders</h1>
        <h2>{state}</h2>
        <table style={{width:"88%",marginLeft:"30px"}} className="table table-bordered">
         <thead style={{textAlign:"center"}}>
          <tr>
          <th>SI.No.</th>
          <th>Ord.Id</th>
          <th>Table</th>
          <th>Total</th>
          <th>Time</th>
          </tr>
         </thead>
         <tbody style={{textAlign:"center"}}>
          {data.map(m=>
          {
            return <tr key={si}>
            <td style={{width:"12px"}}>{si++}</td>
            <td style={{width:"12px"}}>{m.oid}</td>
            <td >{m.tabno}</td>
            <td >{m.total}</td>
            <td>{m.date.split("T").pop().split(".")[0]}</td>
            </tr>
          })}
         </tbody>
        </table>

        </>
     );
}
 
export default TodayOrders;