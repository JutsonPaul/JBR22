import Nav from "./Nav";
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const TodayBill = () => {
    const {state}=useLocation();
    const[data,setdata]=useState([]);
    var si=1;
    useEffect(()=>{
        axios.post("http://127.0.0.1:5000/PBR/getbillreport",{"date":state}).then(Response=>
        {
          setdata(Response.data)
        })
      },[])
    return ( 
        <>
        <Nav/>
        <h1>TodayBill</h1>
        <h2>{state}</h2>
        <table style={{width:"88%",marginLeft:"30px"}} className="table table-bordered">
         <thead style={{textAlign:"center"}}>
          <tr>
          <th>SI.No.</th>
          <th>Ord.Id</th>
          <th>Dish</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Table</th>
          <th >Date</th>
          </tr>
         </thead>
         <tbody>
          {data.map(m=>
          {
            return <tr key={m.bid}>
            <td style={{textAlign:"center"}}>{si++}</td>
            <td style={{textAlign:"center"}}>{m.oid}</td>
            <td>{m.dish}</td>
            <td style={{textAlign:"center"}}>{m.qty}</td>
            <td style={{textAlign:"center"}}>{m.price}</td>
            <td style={{textAlign:"center"}}>{m.tabno}</td>
            <td style={{textAlign:"center"}}>{m.date.split("T").pop().split(".")[0]}</td>
            </tr>
          })}
         </tbody>
        </table>
        </>
     );
}
 
export default TodayBill;