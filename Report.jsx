import Nav from "./Nav";
import { useState,useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
const Report = props => {
  const navigate=useNavigate();
  const[date,setdate]=useState("");
  const[data,setdata]=useState([]);
  const[dish,setdish]=useState([]);
  const[total,settotal]=useState("");
  var si=1;
  //console.log(new Date().toLocaleString() + "")
  var d=format(new Date(), 'yyyy-MM-dd').toLocaleString().split(",",1);
  //console.log(d[0])
  useEffect(()=>{
    //console.log(d[0])
    setdate(d[0]);
    axios.post("http://127.0.0.1:5000/PBR/getbillreport",{"date":d[0]}).then(Response=>
    {
      setdata(Response.data)
      var tot=0;
      for(var x of Response.data)
      {
          tot+=x.price*x.qty;
      }
      settotal(tot);
    var da=Response.data;
           axios.post("http://127.0.0.1:5000/PBR/data").then(Response=>
            {
                  var di=[];
                  for(var x of Response.data)
                  {
                      di.push({"dish":x.dish,"qty":0})
                  }
                  //console.log(di)
                    //console.log(x.dish)
                  for(var x of di)
                  {  
                    var qty=0;
                    for(var y of da)
                    {
                          if(x.dish===y.dish)
                          {
                              qty+=y.qty;
                              x.qty=qty;
                          }
//                          console.log(qty)
                    }
                  }
                  setdish(di);
            })
          })        
  },[])
  const handledate=(e)=>
  {
      setdate(e);
      console.log(e)
      if(e==="")
      {
        console.log("e is empty");
      }
      axios.post("http://127.0.0.1:5000/PBR/getbillreport",{"date":e}).then(Response=>
      {
            if(Response.data.length===0){
            console.log("empty");
              setdata(Response.data);
              settotal(0);
            }
            else{
              setdata(Response.data);
              var tot=0;
              for(var x of Response.data)
              {
                  tot+=x.price*x.qty;
              }
              settotal(tot);
            }
            var da=Response.data;
            axios.post("http://127.0.0.1:5000/PBR/data").then(Response=>
            {
                  var di=[];
                  for(var x of Response.data)
                  {
                      di.push({"dish":x.dish,"qty":0})
                  }
                  //console.log(di)
                    //console.log(x.dish)
                  for(var x of di)
                  {  
                    var qty=0;
                    for(var y of da)
                    {
                          if(x.dish===y.dish)
                          {
                              qty+=y.qty;
                              x.qty=qty;
                          }
//                          console.log(qty)
                    }
                  }
                  setdish(di);
            })
      })
  }
  // const handleqty=()=>
  // {
  //     for(var m of menu)
  //     {
  //         for(var d of data)
  //           if(x.dish===d.dish)
  //           {
  //               x.qty=d
  //           }
  //     }
  // }
   return (
        <>
        <Nav/>
        <br />
        <br />
        <br />
        <br />
        <div align="right" style={{width:"90%"}}>
          Date : <input  type="date" value={date} onChange={(e)=>handledate(e.target.value)}></input>
          <br />
          <br />
        <button className="btn btn-primary" style={{position:"relative",marginLeft:"5px"}} onClick={()=>navigate("/PBR/todayorders",{state:date})}>Today Orders <span className="badge bg-light text-dark">{data.length}</span></button>
        <button className="btn btn-primary" style={{position:"relative",marginLeft:"5px"}} onClick={()=>navigate("/PBR/todaybill",{state:date})}>Today Bills</button>
        <br />
        <label style={{position:"relative",bottom:"-40px",left:"-240px"}}>Orders by Month:</label>
        <select className="form-select"  style={{width:"200px",marginTop:"10px",position:"relative",marginLeft:"5px"}}>Month
        <option defaultValue={"Pay"} disabled>----</option>
        <option>January</option>
        <option>February</option>
        <option>March</option>
        <option>April</option>
        <option>May</option>
        <option>June</option>
        <option>July</option>
        <option>August</option>
        <option>September</option>
        <option>October</option>
        <option>November</option>
        <option>December</option>
        </select>
        </div>
        <br/>
        <h2>Today's sales : ₹{total}</h2>
        <table style={{width:"68%",marginLeft:"200px"}} className="table table-bordered">
         <thead style={{textAlign:"center"}}>
          <tr>
          <th style={{width:"8%"}}>SI.No.</th>
          <th>Dish</th>
          <th>Qty(Deliv.)</th>
          </tr>
         </thead>
         <tbody>
          {dish.map(m=>
          {
            return <tr key={si}>
            <td style={{textAlign:"center"}}>{si++}</td>
            {/* {
              menu.map(me=>{return <td>{me.dish}</td>})
              } */}
            <td style={{position:"relative",left:"240px"}}>{m.dish}</td>
            <td style={{textAlign:"center"}}>{m.qty}</td>

            </tr>
          })}
         </tbody>
        </table>
        </>
      );
}

export default Report;