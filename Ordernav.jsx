import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Ordernav = props => {
    const[eid,setEid]=useState("");
    const[table,setTable]=useState("");
    const[oid,setoid]=useState(0);    
    const {total,order}=props;
    const navigate=useNavigate();
    //console.log(total);
    const handleorder=async()=>
    {
/*        axios.post("http://127.0.0.1:5000/PBR/getorder").then(Response => 
        {
            for(var k of Response.data)
            {
                if(table===k)
                {
                    alert("Table Already booked")
                }
            }   
        })
*/        
        var val = { "eid": eid, "tabno": table, "total": total, "status": "started"};
        axios.post("http://127.0.0.1:5000/PBR/placeorder", val).then(response=>{
        console.log(response.data)    
        setoid(response.data)
        
        for (var k of order) {
            var bval = {"eid": eid,"oid":response.data , "dish": k[0], "price": k[1] / k[2], "qty": (k[2]),"tabno":table,"status":"ordered"};
            axios.post("http://127.0.0.1:5000/PBR/genbill", bval);
        }
        navigate("/PBR/PendingOrders");
    });
    }

    return (
        <>
                <div className="container-fluid bg-success fixed-bottom" style={{height: "80px",borderStyle: "solid",borderColor: "black"}}>
                    <br></br><input className="btn bg-light" type="text" id="eid" placeholder="Emp.Id." onChange={e=>setEid(e.target.value)}  style={{ textAlign:"center", height: "35px", width: "15%", margin: "5px",bottom:"10px",left:"400px" }}/>    
                    <select id="selectpo" onChange={(e)=>setTable(e.target.value)} className="form-select"  style={{position:"relative",bottom:"55px",left:"0px", height: "35px", width: "20%", margin: "5px" }} >
                                <option defaultValue={"Table.No."}>Table.No.</option>
                                <option id="selopt" className="text-black" >A1</option>
                                <option id="selopt" className="text-black" >A2</option>
                                <option id="selopt" className="text-black" >A3</option>
                                <option id="selopt" className="text-black" >A4</option>
                                <option id="selopt" className="text-black" >B1</option>
                                <option id="selopt" className="text-black" >B2</option>
                                <option id="selopt" className="text-black" >B3</option>
                                <option id="selopt" className="text-black" >B4</option>
                                <option id="selopt" className="text-black" >C1</option>
                                <option id="selopt" className="text-black" >C2</option>
                                <option id="selopt" className="text-black" >C3</option>
                                <option id="selopt" className="text-black" >C4</option>
                                <option id="selopt" className="text-black" >D1</option>
                                <option id="selopt" className="text-black" >D2</option>
                                <option id="selopt" className="text-black" >D3</option>
                                <option id="selopt" className="text-black" >D4</option>
                                </select><p style={{fontWeight:"bold",color:"black",position:"relative",bottom:"90px",left:"750px"}}>₹{total}</p>
                                <button className="btn btn-warning" onClick={()=>handleorder()} style={{position:"relative",bottom:"135px",left:"800px", height: "35px", width: "24%"}}>Place Order</button>
                </div>
            
        </>
    );
}

export default Ordernav;