import Nav from "./Nav";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Printbill = () => {
    var si=1;
    const {state}=useLocation();
    const navigate=useNavigate();
    const[total,setTotal]=useState(0);
    const[cash,setcash]=useState("");
    const[upi,setupi]=useState("");
    const[bill,setbill]=useState([]);
    const[paymethod,setpaymethod]=useState("");
    var e=0;
    useEffect(()=>{
        axios.post("http://127.0.0.1:5000/PBR/getdeliveredbill",{"tabno":state}).then(Response=>
        {
            setbill(Response.data)
            var tot=0;
            for(var x of Response.data)
            {
               tot+=x.price*x.qty;
            }
            setTotal(tot);
        }
        )
    },[])

   const handlesplit=(e)=>{
   setcash(e);
   setupi(total-e);
   }

   const paid=()=>{
    console.log("paid")
    axios.post("http://127.0.0.1:5000/PBR/getoid",{"tabno":state,"status":"delivered"}).then(Response=>
    {
        console.log(Response.data)
        if(paymethod==="Cash")
        {
            axios.post("http://127.0.0.1:5000/PBR/orderstatusupdate",{"oid":Response.data,"status":"paid","cash":total});

        }
        else if(paymethod==="UPI")
        {
            axios.post("http://127.0.0.1:5000/PBR/orderstatusupdate",{"oid":Response.data,"status":"paid","upi":total});

        }
        else 
        {
            axios.post("http://127.0.0.1:5000/PBR/orderstatusupdate",{"oid":Response.data,"status":"paid","cash":cash,"upi":upi});    
        }

        axios.post("http://127.0.0.1:5000/PBR/statusupdate",{"oid":Response.data,"status":"paid"}); 
    });
    alert("Payment Received!");
    navigate("/PBR/Bill");
   }

    const handlemethod=()=>{
        console.log(paymethod)
        if(paymethod==="Cash")
        {
            return <div>
            <label style={{bottom:"-30px",position:"relative",left:"827px"}}>Cash :</label>
            <label style={{bottom:"-30px",position:"relative",left:"850px"}}>₹</label><input className="border" style={{bottom:"-30px",position:"relative",left:"860px",width:"100px",textAlign:"center"}} disabled value={total} type="text"/>
            <br />
            <br />
            </div>
        }
        else if(paymethod==="UPI")
        {
            return <div>
            <label style={{bottom:"-30px",position:"relative",left:"835px"}}>UPI :</label>
            <label style={{bottom:"-30px",position:"relative",left:"860px"}}>₹</label><input className="border" style={{bottom:"-30px",position:"relative",left:"870px",width:"100px",textAlign:"center"}} disabled value={total} type="text"/>     
            <br />
            <br />
            </div>
        }
        else if(paymethod==="Split")
        {
            return <div>
            <label style={{bottom:"-30px",position:"relative",left:"827px"}}>Cash :</label>
            <label style={{bottom:"-30px",position:"relative",left:"850px"}}>₹</label><input className="border" style={{bottom:"-30px",position:"relative",left:"860px",width:"100px",textAlign:"center"}}  value={cash} onChange={(e)=>handlesplit(e.target.value)} type="text"/>
            <br />
            <br />
            <label style={{bottom:"-30px",position:"relative",left:"835px"}}>UPI :</label>
            <label style={{bottom:"-30px",position:"relative",left:"860px"}}>₹</label><input className="border" style={{bottom:"-30px",position:"relative",left:"870px",width:"100px",textAlign:"center"}} value={upi} disabled type="text"/>     
            
            
            </div>
        }
    }
    return ( 
        <>
        <div className="noprint">
        <Nav/>
        <br />
        <br />
        <br />
        </div>
        <div>
        <h1 align="center" >JBR Hotel</h1>
        <br />
        <table className="table table-bordered" style={{position:"relative",left:"180px",width:"60%"}}>
        <thead id="table">
            <tr>
                <th style={{width:"5%"}}>Dish</th>
                <th style={{width:"2%"}}>Qty</th>
                <th style={{width:"2%"}}>Price</th>
            </tr>
        </thead > 
        <tbody>
            {bill.map(m=>
            <tr key={si++}>
                <td style={{position:"relative",left:"180px"}}>{m.dish}</td>
                <td style={{textAlign:"center"}}>{m.qty}</td>
                <td style={{textAlign:"center"}}>{m.price*m.qty}</td>
            </tr>
            )}
            <tr><td></td><td style={{textAlign:"center",fontWeight:"bold"}}>Total</td><td style={{textAlign:"center",fontWeight:"bold"}}>{total}</td></tr>
        </tbody>   
        </table>
        </div>
        <div className="noprint">
        <label style={{bottom:"-30px",position:"relative",left:"740px"}}>Payment Method :</label>
        <select  style={{position:"relative",left:"910px",width:"100px",textAlign:"center"}} defaultValue="----" onChange={(e)=>setpaymethod(e.target.value)} className="form-select">
        <option defaultValue={"Pay"} disabled>----</option>
        <option>Cash</option>
        <option>UPI</option>
        <option>Split</option>
        </select>
        {handlemethod()}
        <button className="btn btn-success" style={{bottom:"-50px",position:"relative",width:"100px",left:"910px"}} onClick={()=>paid()}>Paid</button>
        </div>
        <br />
        <br />
        </>
     );
}
 
export default Printbill;