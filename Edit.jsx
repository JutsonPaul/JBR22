import Nav from "./Nav";
import axios from "axios";
import { useState, useEffect } from "react";
const Edit = props => {
    // const [edata, setEdata] = useState([]);
    const {data}=props;
    const [cat,setCat]=useState("");
    const [prod,setProd]=useState("");
    const [price,setPrice]=useState(0);
    const[r,setR]=useState("");
    const[val,setval]=useState("");
    // useEffect(() => {
    //     axios.get("http://127.0.0.1:5000/").then(response => {
    //         setEdata(response.data);
    //     })
    // }, [])

    const add=async()=>
    {
        const val={category:cat,dish:prod,price:price,status:"available"}
        await axios.post("http://127.0.0.1:5000/PBR/adddata",val);
        alert("Added");
        window.location.reload();
        setCat("");setProd("");setPrice("");
    }

    const handledelete=async(m)=>
    {
        const val={id:m}
       await axios.post("http://127.0.0.1:5000/PBR/delete",val);
       window.location.reload();

    }

    const handleedit=async(m)=>
    {
        const val={id:m["id"],category:cat,dish:prod,price:price,status:"available"}
        await axios.post("http://127.0.0.1:5000/PBR/edit",val);
        window.location.reload();       
    }

    const empty=(m)=>
    {
        setR(m["id"]);
        setCat(m["category"]);
        setProd(m["dish"]);
        setPrice(m["price"]);
    }

    const off=(m)=>
    {
        setval(m["id"]);
        axios.post("http://127.0.0.1:5000/PBR/dishstatusupdate",{"id":m["id"],"status":"not available"}).then(Response=>{console.log(Response.data)})
        window.location.reload();
    }

    const on=(m)=>{
        setval("");
        axios.post("http://127.0.0.1:5000/PBR/dishstatusupdate",{"id":m["id"],"status":"available"}).then(Response=>{console.log(Response.data)})
        window.location.reload();
    }

    return (
        <>
        <div >
            <Nav />
            <nav className="navbar navbar-expand-lg " >
                <div className="table table-bordered d-flex" id="PBRmenu">
                <input type="text" placeholder="Category" style={{margin:5}} onChange={(e)=>setCat(e.target.value)}/>
                    <input type="text" placeholder="Product" style={{margin:5}} onChange={(e)=>setProd(e.target.value)}/>
                    <input type="text" placeholder="Price" style={{margin:5}} onChange={(e)=>setPrice(e.target.value)}/>
                    <button className="btn btn-success" onClick={()=>add()}>Add</button>
                </div>
            </nav>
            <div>
                <table id="table" className='table table-bordered' style={{borderStyle: "solid",borderColor: "black",borderWidth:"medium"}}>
                    <thead id="bg" style={{borderStyle: "solid",borderColor: "black",borderWidth:"medium"}}>
                        <tr>
                            <th style={{borderStyle: "solid",borderColor: "black",borderWidth:"medium"}}>Category</th>
                            <th style={{borderStyle: "solid",borderColor: "black",borderWidth:"medium"}}>Product</th>
                            <th style={{borderStyle: "solid",borderColor: "black",borderWidth:"medium"}}>Price</th>
                            <th style={{borderStyle: "solid",borderColor: "black",borderWidth:"medium"}}>Availability</th>
                            <th style={{borderStyle: "solid",borderColor: "black",borderWidth:"medium"}}>Edit</th>
                            <th style={{borderStyle: "solid",borderColor: "black",borderWidth:"medium"}}>Delete</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(m => {
                                if(r===m["id"])
                                {
                                    return(
                                        <tr key={m["id"]} >
                                        <td><input type="text" placeholder="category" value={cat} onChange={(e)=>setCat(e.target.value)}/></td>
                                        <td><input type="text" placeholder="product"value={prod} onChange={(e)=>setProd(e.target.value)}/></td>
                                        <td><input type="text" placeholder="price" value={price} onChange={(e)=>setPrice(e.target.value)}/></td>
                                        <td><button className='btn btn-danger' onClick={()=>off(m)}>OFF</button></td>
                                        <td><button className="btn btn-primary" onClick={()=>handleedit(m)}>Submit</button></td>
                                        <td><button className="btn btn-danger" onClick={()=>setR("")}>Cancel</button></td>
                                        </tr>
                                    )                    
                                }
                                else if(m["status"]==="not available")
                                {
                                    return(
                                        <tr key={m["id"]} >
                                        <td style={{fontFamily:"Sofia",fontSize:"1.2em"}}>{m["category"]}</td>
                                    <td style={{fontFamily:"Sofia",fontSize:"1.2em"}}>{m["dish"]}</td>
                                    <td style={{fontFamily:"Sofia",fontSize:"1.2em"}}>{m["price"]}</td>
                                    <td><button className='btn btn-success' onClick={()=>on(m)}>ON</button></td>
                                    <td><button className='btn btn-primary' onClick={()=>empty(m)}>Edit</button></td>
                                    <td><button className='btn btn-danger' onClick={()=>handledelete(m["id"])}>X</button></td>
                                    </tr>
                                    )                    
                                }
                                else if(m["status"]==="available")
                                {
                                    return <tr key={m["id"]}>
                                        {/* fontFamily:"Copperplate" */}
                                    <td style={{fontFamily:"Sofia",fontSize:"1.2em"}}>{m["category"]}</td>
                                    <td style={{fontFamily:"Sofia",fontSize:"1.2em"}}>{m["dish"]}</td>
                                    <td style={{fontFamily:"Sofia",fontSize:"1.2em"}}>{m["price"]}</td>
                                    <td><button className='btn btn-danger' onClick={()=>off(m)}>OFF</button></td>
                                    <td><button className='btn btn-primary' onClick={()=>empty(m)}>Edit</button></td>
                                    <td><button className='btn btn-danger' onClick={()=>handledelete(m["id"])}>X</button></td>
 
                                </tr>

                                }
                            })
                            
                        }
                    </tbody>
                </table>
            </div>
            </div>
        </>
    );
}

export default Edit;