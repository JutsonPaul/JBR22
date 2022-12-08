import { useEffect, useState } from "react";
import Nav from "./Nav";
import UNav from "./UNav";
import Ordernav from "./Ordernav";
import axios from "axios";
const Menu = props => {
    const[data,setdata]=useState([]);
    const[val,setval]=useState([]);
    const [order,setorder]=useState([]);
    const [total,setTotal]=useState(0);
    const[search,setSearch]=useState("");
    const[searches,setSearches]=useState([]);
    useEffect(()=>{
        console.log("hi")
        axios.post("http://127.0.0.1:5000/PBR/data").then(Response=>{
        var d=[];
        setSearches(Response.data);
        console.log("hi")
        console.log(Response.data)
        for(var x of Response.data)
        {
            if(x.status==="available")
            {
                d.push(x);
            }
        }
        setdata(d);
        setval(d);
    })
    },[])

    const findcat=()=>
    {
        var w=[];
        //var f=[];
        for(var i=0;i<data.length;i++)
        {
            if(w.indexOf(data[i].category)===-1)
            {
                w.push(data[i].category);
            }
        }
        //console.log(w);
        return w;
    }   
    var u=[];
    const checkdata=(m,e)=>
    {
        var q=[];
        var i=0;
       
        for(var w of order)
        {
            if(w.includes(m["dish"]))
            {
                w[1]=m["price"]*e;
                w[2]=e;
                i=1;
            }
             
            q.push(w);                
        }
        if(i===0)
        {
            u=[m["dish"],m["price"]*e,e];
            q.push(u);
        }
        console.log(q)
        setorder(q);
        //console.log(u)
        var t=0;
        for(var k of q)
        {
            t+=k[1];  
            setTotal(t);
        }
    
    }

    const handlenav=()=>
    {
      var login=window.localStorage.getItem("user");
      if(login==="admin")
      {
         return <Nav data={data}/>;
      }
      else
      {
         return <UNav data={data}/>;
      }
    }  

    const handlesearch=(e)=>
    {
        setSearch(e);
        if(e==="")
        {
            setdata(data);
        }
        var s=[];
        for(var x of val)
        {   
            if((x.dish.toLowerCase()).includes(e.toLowerCase()) || (x.category.toLowerCase()).includes(e.toLowerCase()))
            {
                s.push(x);
            }
        }
        //setSearches(s);
        setdata(s);
    }
    var cg=findcat();
console.log(searches)
    return (
        <>
        <section id="bg" style={{position:"relative",height:"200%",width:"100%",borderStyle: "solid",borderColor: "black"}}>
        <div >
            {handlenav()}
        <input className="form-control me-2 " style={{position:"relative",width:"200px",top:"80px",left:"1125px"}} value={search} onChange={(e)=>handlesearch(e.target.value)} type="search"  placeholder="Search" aria-label="Search"/>
        <button className="btn btn-success " style={{position:"relative",top:"42px",left:"1335px"}} type="submit" onClick={()=>handlesearch()} >Search</button>
        {   
            cg.map(c=>{
                return  <div key={c}   style={{position:"relative",top:"-15px",fontFamily:"Sofia", borderColor: "black"}}>
                    <br />
                    <br />
                    
                    <br />
                    {/* width:"85.6%",fontSize:"1.4em" */}
            <button style={{backgroundColor:"#EFBE7D",height:"50px",position:"relative",width:"94%",fontSize:"1.4em", left:"45px"}}>{c}</button>
            <div className="grid-fluid mt-3" style={{ position:"relative",top:"10px"}}>
                <div className="row"  id="row">
                    {
                        data.map(m => {
                            if(c===m["category"])
                            {
                                return <div key={m["id"]} id="c"  className="card col-sm-4-p-3 text-white mx-auto" 
                                        style={{ height: "110px",  fontSize:"1.1em",padding:"5px", marginBottom:"3.5em", width: "350px", align: "center", textAlign:"center"}}> <div style={{position:"relative",marginTop:"-5px"}}>{m["dish"]}</div>
                                        <button className="btn btn-dark " style={{height:"40px",marginLeft:"-6px",width: "300px",marginTop:"-40px"}} disabled> ₹{m["price"]}</button>
                                    {/* <div className="ribbon">{m["price"]}</div> */}
                                    <select key={m["id"]} id="select" className="form-select inputstl" onChange={(e) => checkdata(m, e.target.value)}  >
                                        <option id="selopt" className="selopt text-black" href="#">0</option>
                                        <option id="selopt" className="selopt text-black" href="#">1</option>
                                        <option id="selopt" className="selopt text-black" href="#">2</option>
                                        <option id="selopt" className="selopt text-black" href="#">3</option>
                                        <option id="selopt" className="selopt text-black" href="#">4</option>
                                        <option id="selopt" className="selopt text-black" href="#">5</option>
                                        <option id="selopt" className="selopt text-black" href="#">6</option>
                                        <option id="selopt" className="selopt text-black" href="#">7</option>
                                        <option id="selopt" className="selopt text-black" href="#">8</option>
                                        <option id="selopt" className="selopt text-black" href="#">9</option>
                                        <option id="selopt" className="selopt text-black" href="#">10</option>
                                    </select>
                                </div>
                            }
                        })     
                    }
                </div>
            </div>
            </div>
        })    
        }   
                    </div> 
            {/*<h2>Starters</h2>
            <hr />*/}
                        <br />
            <br />
            <Ordernav total={total} order={order}/>
            <br />
            <br />
            </section>
        </>
    );
}

export default Menu;