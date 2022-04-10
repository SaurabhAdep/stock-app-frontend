import'bootstrap/dist/css/bootstrap.min.css';
import $ from'jquery';
import Popper from'popper.js';
import'bootstrap/dist/js/bootstrap.bundle.min';

import '../Stylesheets/mystyle.css'
import {NavLink} from 'react-router-dom'

import React,{useState} from 'react'
import { AuthContext } from '../App';

function MenuComponent() {

const {state,dispatch}=React.useContext(AuthContext);
let menulist;
if(!state.isAuthenticated)
menulist= <>
    <li className="nav-item ">
        <NavLink className="nav-link " exact to="/" >Login</NavLink>
    </li>
    <li className="nav-item">
        <NavLink className="nav-link" to="/companies">Companies</NavLink>
    </li>
</>;
else
menulist=<>
    <li className="nav-item ">
        <NavLink className="nav-link " to="/companies">Companies</NavLink>
    </li>
    <li className="nav-item">
        <NavLink className="nav-link" to="/watchlist">WatchList</NavLink>
    </li>
    <li className="nav-item">
        <NavLink className="nav-link" to="/performance">Company Performance</NavLink>
    </li>
    <li className="nav-item">
        <NavLink className="nav-link" exact to="/" onClick={()=>{dispatch({
            type: "LOGOUT"
          })}}>Logout</NavLink>
    </li>
</>
return (
<>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
            <h1>mStockApp</h1>
        </a>

        <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-menu">
            <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-menu">
            <ul className="navbar-nav mr-auto">
                {menulist}
            </ul>
        </div>
    </nav>
</>
)
}

export default MenuComponent