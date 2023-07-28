import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../img/logo.png'

export default function Navbar(props) {
  let navegate=useNavigate();

  function logout(){
    props.setIsLogin(false);
    navegate('/login');
    localStorage.removeItem('token');
  }
  return (
<nav className="navbar navbar-expand-lg navbar-dark shadow position-top mb-3">
  <div className="container-fluid">
    <img src={logo} alt='' width={90}/>
  <NavLink  className="navbar-brand fs-3 text-whaite" to={''}>Game Over</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    {props.isLogin?<>
      <li className="nav-item text-muted">
          <NavLink className={({isActive})=>isActive?"bg-primary nav-link":"nav-link"} aria-current="page" to={'home'}>Home</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?"bg-primary nav-link":"nav-link"} aria-current="page" to={'all'}>All</NavLink>
        </li>

          
          <li className="nav-item dropdown">
          <NavLink className={({isActive})=>isActive?"bg-primary nav-link dropdown-toggle":"nav-link dropdown-toggle"} data-bs-toggle="dropdown" aria-current="page" to={'platform'}>Platforms
          </NavLink>

          <ul className="dropdown-menu dropdown-menu-light">
            <li className="dropdown-item"><Link to={'/platform/pc'}>pc</Link></li>
            <li className="dropdown-item"><Link to={'/platform/browser'}>browser</Link></li>
          </ul>
        </li>
        
        <li className="nav-item dropdown">
          <NavLink className={({isActive})=>isActive?"bg-primary nav-link dropdown-toggle":"nav-link dropdown-toggle"} data-bs-toggle="dropdown" aria-current="page" to={'sortby'}>sort-by
          </NavLink>

          <ul className="dropdown-menu dropdown-menu-light">
            <li className="dropdown-item"><NavLink to={'/sortby/release-date'}>release-date</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/sortby/popularity'}>popularity</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/sortby/alphabetical'}>alphabetical</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/sortby/relevance'}>relevance</NavLink></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <NavLink className={({isActive})=>isActive?"bg-primary nav-link dropdown-toggle":"nav-link dropdown-toggle"} data-bs-toggle="dropdown" aria-current="page" to={'Categories'}>Categories
          </NavLink>

          <ul className="dropdown-menu dropdown-menu-light">
            <li className="dropdown-item"><NavLink to={'/Categories/racing'}>racing</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/Categories/sports'}>sports</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/Categories/social'}>social</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/Categories/shooter'}>shooter</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/Categories/open-world'}>open-world</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/Categories/zombie'}>zombie</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/Categories/fantasy'}>fantasy</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/Categories/action-rpg'}>action-rpg</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/Categories/action'}>action</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/Categories/flight'}>flight</NavLink></li>
            <li className="dropdown-item"><NavLink to={'/Categories/battle-royale'}>battle-royale</NavLink></li>
          </ul>
        </li>

    
    </>:''}

      </ul>
{/* /////////////////////////// */}
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
     {props.isLogin?<>
      
     </>:<>
     <li className="nav-item">
          <NavLink className={({isActive})=>isActive?"bg-primary mt-2 nav-link":"nav-link mt-2"} aria-current="page" to={'login'}>Login</NavLink>
        </li>
           
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?"bg-primary nav-link":"nav-link"} aria-current="page" to={'login'}><button className='btn btn-primary bg-transparent'>join free</button></NavLink>
        </li>
     </>}

     <li className="nav-item">
         {props.isLogin?<NavLink onClick={logout} className={({isActive})=>isActive?"bg-primary nav-link":"nav-link"} aria-current="page" to={''}><button className='btn btn-primary bg-transparent'>Logout</button></NavLink>:''} 
        </li>
      </ul>
    </div>
  </div>
</nav>    
  )
}
