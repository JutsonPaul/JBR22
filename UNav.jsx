import { useNavigate } from 'react-router-dom';
const UNav = () => {
    const navigate=useNavigate();
    const logout=()=>
    {
        window.localStorage.clear();
        navigate("/");
    }
    return ( 
        <>
       <nav id="nav" className="navbar navbar-expand-lg navbar-light ">
  <div  className="container-fluid">
    <a className="navbar-brand text-white" href="#">User</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <button className="btn btn-warning" aria-current="page" href="#">Total Pending</button>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" aria-current="page" href="#" onClick={()=>navigate("/PBR")}>Menu</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#" onClick={()=>navigate("/PBR/PendingOrders")}>Pending Orders</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#" onClick={()=>logout()}>Logout</a>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
        </>
     );
}
 
export default UNav;