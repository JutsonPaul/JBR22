import Nav from "./Nav";
import UNav from "./UNav";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PendingOrders = () => {
    const navigate=useNavigate();
    const [pod, setpod] = useState([]);
    var e = 1;
    useEffect(() => {
        axios.post("http://127.0.0.1:5000/PBR/gettable").then(Response => 
        {
            setpod(Response.data);   
        })
    }, [])

    const handlenav = () => 
    {
        var login = window.localStorage.getItem("user");
        if (login === "admin") {
            return <Nav />;
        }
        else {
            return <UNav />;
        }
    }

    const check=(m)=>
    {    
        for(var p of pod)
        {
            if(p===m)
            {
                return "bg-success";    
            }
        }       
        return "bg-danger";
    }

    const bookingcheck=(m)=>
    {
        for(var p of pod)
        {
            if(p===m)
            {
                navigate("/PBR/orders",{state:m});   
            }
        }      
    }
    return (
        <>
            {handlenav()}
            <br/>
            <br/>
            <div id="bg" style={{ height: "100vh" }}>
                <button style={{marginTop:"10px", backgroundColor: "#EFBE7D", height: "50px", position: "absolute", width: "100%", fontSize: "1.4em", fontFamily: "Sofia" }}>Pending Orders</button>
                <br/>
                <br/>
                <table id="table" className='table table-bordered' style={{marginTop:"10px",position:"relative", borderStyle: "solid", borderColor: "black", borderWidth: "medium" }}>
                    <thead id="bg" style={{ borderStyle: "solid", borderColor: "black", borderWidth: "medium" }}>
                        <tr>
                            <th scope="col" id="pod-th">A</th>
                            <th scope="col" id="pod-th">B</th>
                            <th scope="col" id="pod-th">C</th>
                            <th scope="col" id="pod-th">D</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td className={check("A1")} id="tdbt" onClick={()=>bookingcheck("A1")}>A1</td>
                            <td className={check("B1")} id="tdbt" onClick={()=>bookingcheck("B1")}>B1</td>
                            <td className={check("C1")} id="tdbt" onClick={()=>bookingcheck("C1")}>C1</td>
                            <td className={check("D1")} id="tdbt" onClick={()=>bookingcheck("D1")}>D1</td>
                        </tr>
                        <tr>                 
                            <td className={check("A2")} id="tdbt" onClick={()=>bookingcheck("A2")}>A2</td>
                            <td className={check("B2")} id="tdbt" onClick={()=>bookingcheck("B2")}>B2</td>
                            <td className={check("C2")} id="tdbt" onClick={()=>bookingcheck("C2")}>C2</td>
                            <td className={check("D2")} id="tdbt" onClick={()=>bookingcheck("D2")}>D2</td>
                        </tr>
                        <tr>
                            <td className={check("A3")} id="tdbt" onClick={()=>bookingcheck("A3")}>A3</td>
                            <td className={check("B3")} id="tdbt" onClick={()=>bookingcheck("B3")}>B3</td>
                            <td className={check("C3")} id="tdbt" onClick={()=>bookingcheck("C3")}>C3</td>
                            <td className={check("D3")} id="tdbt" onClick={()=>bookingcheck("D3")}>D3</td>

                        </tr>
                        <tr>
                            <td className={check("A4")} id="tdbt" onClick={()=>bookingcheck("A4")}>A4</td>
                            <td className={check("B4")} id="tdbt" onClick={()=>bookingcheck("B4")}>B4</td>
                            <td className={check("C4")} id="tdbt" onClick={()=>bookingcheck("C4")}>C4</td>
                            <td className={check("D4")} id="tdbt" onClick={()=>bookingcheck("D4")}>D4</td>

                        </tr>

                    </tbody>
                </table>
                {/* <div style={{ margin: "left" }} id="odrow">
                    {
                        pod.map(po => {
                            { console.log(po) }
                            return <div key={e++} style={{ marginTop: "10px", marginBottom: "10px", left: "60px", position: "relative" }} id="pod" >
                                <button className="col" style={{ color: "white", textAlign: "center", width: "150px", height: "150px", transform: "skew(-20deg)", background: "#682817" }}>{po}</button>
                            </div>

                        })
                    }
                </div> */}

                <br />
                <br />
            </div>
        
        </>
    );
}

export default PendingOrders;