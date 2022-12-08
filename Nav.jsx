import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
const Nav = props => {
  const navigate=useNavigate();
  const {data}=props;
  const[tpd,settpd]=useState("");

  useEffect(() => {
    axios.post("http://127.0.0.1:5000/PBR/gettable").then(Response => 
    {
        settpd(Response.data.length);   
    })
}, [])

    const logout=()=>
    {
        window.localStorage.clear();
        navigate("/");
    }
    return ( 
    <>
       <nav className="navbar navbar-expand-lg navbar-light fixed-top"  id="nav" style={{borderStyle: "solid",borderColor: "black"}} >
  <div className="container-fluid">
    <a className="navbar-brand text-white" >Admin</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon text-white"></span>
    </button>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
      <NavLink to="/PBR/PendingOrders">   
        <button className="btn btn-warning " onClick={()=>navigate("/PBR/PendingOrders")}>Total Pending
          <span className="badge bg-light text-success" style={{margin:"5px"}}>{tpd}</span></button>
          </NavLink>
        </li>        
        <li className="nav-item">
        <NavLink to="/PBR">   
        <button className="btn text-white">Menu</button>
          </NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/PBR/PendingOrders">   
        <button className="btn text-white">Pending Orders</button>
          </NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/PBR/Bill">   
        <button className="btn text-white">Bill</button>
          </NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/PBR/Report">   
        <button className="btn text-white">Report</button>
          </NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/PBR/Edit">   
        <button className="btn text-white">Edit</button>
          </NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/PBR/AddUser">   
        <button className="btn text-white">Add User</button>
          </NavLink>
        </li>
        <li className="nav-item">   
        <button className="btn text-white" onClick={()=>logout()}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>
     );
}
 
export default Nav;