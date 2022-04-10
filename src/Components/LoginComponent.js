import React, { Component ,useEffect,useState} from 'react'
import'bootstrap/dist/css/bootstrap.min.css';
import $ from'jquery';
import Popper from'popper.js';
import'bootstrap/dist/js/bootstrap.bundle.min';

import '../Stylesheets/mystyle.css'
import MenuComponent from './MenuComponent';
import { Redirect } from 'react-router-dom';
import CompaniesListComponent from './CompaniesListComponent';
import {AuthContext} from '../App'
import axios from 'axios';



export const LoginComponent =(props)=> {

    const { dispatch } = React.useContext(AuthContext);

const initialState= {
    email:"",
    password:"",
    errors:{
       email:"",
       pass:""
    },
    invalidLogin:""
}

const [state, setState] = useState(initialState)

let passError,emailError;
const validateForm=()=>
{
    let emailError=""
    let passwordError=""
    console.log(state.email)
    if(state.email==="")
      emailError="Email Is Required"
    if(state.password==="")
      passwordError="Password Is Required"
    if(emailError==="" && passwordError==="")
      {    return true
    }
    else{
    let err={
        email:emailError,
        pass:passwordError
    }

    setState({
        ...state,
        errors:err,
        invalidLogin:""
    })
    
}
}


const handleChange=(event)=>
{   
    setState({
        ...state,
        [event.target.name]:event.target.value
    })
}

 function handleSubmit(event)
{
    event.preventDefault();
    let val=validateForm();
    console.log(val)
    console.log(state.errors)
    
    if( val)
    {
        let user={
            email:state.email,
            password:state.password
        }
   
        axios.post("http://localhost:8081/users",user)
        .then((res)=>{
            console.log(res.data);
            dispatch({
                type:"LOGIN",
                payload:{
                    user:res.data.userId,
                    token:"token"
                }
            })
            props.history.push("/watchlist")
        })
        .catch(err=>{ 
        setState({
            ...state,
            errors:{
                    email:"",
                    pass:""
                },
            invalidLogin:"Invalid Email/Password"
        })})
    }
}


    return (
        <div>
            <div className="container  mt-5 mb-3" >
                <div className="card mx-auto h-90 login" >
                    <h2 className="card-header">Login</h2>
                    <div className="container">
                        <div style={{color:"#ff0000"}} className="mt-3" >Fields marked with * are mandatory
                            <ul>
                                {    state.errors.email!==""?<li>{state.errors.email}</li>:""}
                                {   state.errors.pass!==""?<li>{state.errors.pass}</li>:""} 
                                {   state.invalidLogin!==""?<li>{state.invalidLogin}</li>:""}    
                            </ul>
                        </div>
                        <form onSubmit={handleSubmit}  >
                            <div className="form-row mb-2 mt-2">
                                <div className="form-group col-12">
                                    <label htmlFor="inputEmail Address">Email Address<span style={{color:"#ff0000"}}>*</span></label>
                                    <input type="text" className="form-control" name="email" value={state.email} onChange={handleChange} placeholder="Email Address"/>
                                </div>
                            </div>
                            <div className="form-row mb-2 ">
                                <div className="form-group col-12 ">
                                    <label htmlFor="inputPassword">Password<span style={{color:"#ff0000"}}>*</span></label>
                                    <input type="password" className="form-control" name="password" value={state.password} onChange={handleChange} placeholder="Password"/>
                                    <div id="id2" className="text-danger"></div>
                                </div>
                            </div>
                            <div className="d-flex flex-row" >
                                <button type="submit" className="btn btn-primary mb-4"> Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    )
}


export default LoginComponent