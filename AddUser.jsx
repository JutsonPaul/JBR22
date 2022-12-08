import { useState } from "react";
import Nav from "./Nav";
import axios from "axios";
const Adduser = () => {
    const[uname,setUname]=useState("");
    const[mob,setMob]=useState("");
    const add=()=>
    {
        // const r=[];
        // r["id"]=data[data.length-1]["id"]+1;
        // r["uname"]=uname;
        // r["mob"]=mob;
        // data.push(r);
        // console.log(data)
        const val={uname:uname,password:2208,num:mob}
        axios.post("http://127.0.0.1:5000/PBR/adduser",val).then(response=>{
            console.log(response.data)
        });
        console.log(val);
        alert("User Added");
        setMob("");setUname("");
    }
    
    return (
        <>
        <Nav/>
        <section className="vh-100" background-color="#508bfc">
                            <div className="container py-5 h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                        <div className="card shadow-2-strong" border-radius=" 1rem">
                                            <div className="card-body p-5 text-center">

                                                <h3 className="mb-5">Paradise Beach Resort</h3>
                                                <div className="form-outline mb-4">
                                                    <input type="text" placeholder='Username'  className="form-control form-control-lg" value={uname} onChange={(e)=>setUname(e.target.value)}/>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="text" placeholder='Mobile No.'  className="form-control form-control-lg" value={mob} onChange={(e)=>setMob(e.target.value)}/>
                                                </div>
                                                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={()=>add()}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
        </>
      );
}
 
export default Adduser;