import { useNavigate } from "react-router-dom";
import { logincheck } from "./data";
import axios from "axios";
import { useState, useEffect } from "react";

const Login = () => {
    const [mob, setMob] = useState("");
    const [data, setdata] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        axios.post("http://127.0.0.1:5000/PBR/getuser").then(response => {
            setdata(response.data);
        });
    }, [])
    const login = () => {
        var r = logincheck();
        if (mob === "2208") {
            window.localStorage.setItem("user", "admin");
            navigate("/PBR");
        }
        else if (r === mob) {
            window.localStorage.setItem("user", "user");
            navigate("/PBR");
        }
        else {
            alert("Login Failed");
        }

    }
    const logincheck = () => {
        for (var x = 0; x < data.length; x++) {
            if ((data[x].num) === (mob)) {
                var m = data[x].num;
                break;
            }
        }
        return m;
    }
    return (
        <>
            <section className="w-100 vh-100" id="bg">
                <div className="container py-5 h-100">
                    <div className="row1 d-flex justify-content-center align-items-center h-100" >
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow p-5 text-center" style={{ backgroundColor: "white" }}>
                                    <h3 className="mb-5 " id="bg"  style={{fontFamily:"Sofia"}}>Jutson's Beach Resort</h3>                                    
                                    <br />
                                    <h3 className="mb-5 " style={{fontFamily:"Sofia" }}>Good Food Good Life</h3>
                                    <br />
 
                                    {/* <h4 className="mb-5" style={{fontFamily:"Sofia", borderColor: "black"}}>Good Food Good Life</h4> */}
                                    <input type="text" placeholder='Mobile No.' style={{marginBottom:"5px",border:"solid"}} className="form-control form-control-lg" value={mob} onChange={(e) => setMob(e.target.value)} />
                                    <button className="btn btn-lg btn-block" style={{backgroundColor:"#682817"}} type="submit" onClick={() => login()}>Login</button>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
