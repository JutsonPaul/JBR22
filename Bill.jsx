import Nav from "./Nav";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Bill = () => {
    var e=1;
    const[table,settable]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        axios.post("http://127.0.0.1:5000/PBR/getdeliveredtable").then(Response=>
        {
               settable(Response.data);
        })
    },[])
    return (  
        <>
        <div id="bbg" style={{position:"fixed",width:"100%",height:"100%"}}>
        <Nav/>
        <br />
        <br />
        <br />
        <div className="grid-fluid mt-3"  style={{position:"relative",left:"60px"}}>
            {
                table.map(m=>
                 <div  className="row " key={e++} style={{ marginTop: "10px", marginBottom: "10px", left: "60px", position: "relative" }} id="pod" >
                <div style={{ color: "white", textAlign: "center", width: "150px", height: "150px", transform: "skew(-20deg)", background: "#682817",padding:"50px" }} >{m}</div>
                <div style={{ width: "250px", height: "150px", transform: "skew(-20deg)",background: "white" }}>
                <button type="submit" className="btn btn-primary"  id="podbutton" onClick={()=>navigate("/PBR/Printbill",{state:m})}><div className="btn-text">View Orders</div></button>
                <button type="submit" className="btn btn-success" id="podbutton" onClick={()=>navigate("/PBR/Printbill",{state:m})}> <div className="btn-text">Generate Bill</div></button>
                <button type="submit" className="btn btn-danger"  id="podbutton"> <div className="btn-text">Cancel</div> </button>
                </div>
                </div>
                
                )
            }
        </div>
        </div>
        </>
    );
}
 
export default Bill;