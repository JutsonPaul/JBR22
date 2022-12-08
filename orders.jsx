import Nav from "./Nav";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
const Orders = () => {
    const {state}=useLocation();
    const [orders,setorders]=useState([]);
    const navigate=useNavigate();
    const[check,setcheck]=useState("");
    const[isActive,setActive]=useState("false");
    const[Abutton,setAbutton]=useState([]);
    const[Dbutton,setDbutton]=useState([]);
    var si=1;
    var d=0;
    useEffect(()=>
    {
        axios.post("http://127.0.0.1:5000/PBR/getbill",{tabno:state}).then(Response=>
        {                           
                setorders(Response.data);                               
        })
    },[])

    const accepted=(m)=>
    { 
       // console.log(m)
       // console.log([si-1,c])     
        var val={"bid":m.bid,"status":"accepted"}
        axios.post("http://127.0.0.1:5000/PBR/statusupdate",val);
        axios.post("http://127.0.0.1:5000/PBR/getbill",{tabno:state}).then(Response=>
        {
           setorders(Response.data);
           var n=0;
            for(var k of Response.data)
            {
                if(k.status==="accepted")
                {
                    console.log(k.dish)
                    n++;
                }
            }
            if(n===Response.data.length)
            {
                axios.post("http://127.0.0.1:5000/PBR/getoid",{"tabno":state,"status":"started"}).then(Response=>
                {
                    axios.post("http://127.0.0.1:5000/PBR/orderstatusupdate",{"oid":Response.data,"status":"accepted"});  
                });
            }
        })
    }
    const delivered=(m)=>
    {
        var val={"bid":m.bid,"status":"delivered"}
        axios.post("http://127.0.0.1:5000/PBR/statusupdate",val)
        axios.post("http://127.0.0.1:5000/PBR/getbill",{tabno:state}).then(Response=>
        {
           setorders(Response.data);
        var n=0;
        for(var k of Response.data)
        {
            if(k.status==="delivered")
            {
                console.log(k.dish)
                n++;
            }
        }
        if(n===Response.data.length)
        {
            axios.post("http://127.0.0.1:5000/PBR/getoid",{"tabno":state,"status":"accepted"}).then(Response=>
            {
                axios.post("http://127.0.0.1:5000/PBR/orderstatusupdate",{"oid":Response.data,"status":"delivered"});
                console.log("All Delivered");
                alert("Good Job");
                navigate("/PBR/PendingOrders");  
            }
            );
        }
    })
    }        
    console.log(orders.length);
    return ( 
        <>
        <Nav/>
        <br />
        <br />
        <br />
        <div>
            <table id="table" className="table table-bordered">
             <thead>
                <tr >
                    <th>SI.No.</th>
                    <th>Dish</th>
                    <th>Qty</th>
                    <th >Accept</th>
                    <th>Delivered</th>
                    </tr>
             </thead>
             <tbody>
                {
                    orders.map(m=>
                        {
                            if(m.status==="accepted")
                            {
                                return <tr key={m.bid}>
                                        <td>{si++}</td>
                                        <td>{m.dish}</td>
                                        <td>{m.qty}</td>
                                        <td><button className="btn btn-outline-success" disabled>Accepted ✔</button></td>
                                        <td><button className="btn btn-primary" style={{width:"120px"}} onClick={()=>delivered(m)}>Delivered</button></td>
                                        </tr>
                            }
                            else if(m.status==="delivered")
                            {
                                return <tr key={m.bid}>
                                <td>{si++}</td>
                                <td>{m.dish}</td>
                                <td>{m.qty}</td>
                                <td><button className="btn btn-outline-success" disabled>Accepted ✔</button></td>
                                <td><button className="btn btn-outline-primary" disabled>Delivered ✔</button></td>
                            </tr>
                            }
                            else
                            {
                                return <tr key={m.bid}>
                                <td>{si++}</td>
                                <td>{m.dish}</td>
                                <td>{m.qty}</td>
                                <td><button  className="btn btn-success" style={{width:"120px"}} onClick={()=>accepted(m)}>Accept</button></td>
                                <td><button  className="btn btn-primary" style={{width:"120px"}} onClick={()=>delivered(m)}>Delivered</button></td>
                                </tr>
                            }
                        })
                } 
             </tbody>
            </table>
        </div>
        </>
     );
}

export default Orders;