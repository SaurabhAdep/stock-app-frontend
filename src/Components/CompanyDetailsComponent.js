import React,{useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from'jquery';
import Popper from'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import '../Stylesheets/mystyle.css'
import axios from 'axios';
import WatchlistComponent from './WatchlistComponent'
import  {WatchContext} from './WatchlistComponent'

function CompanyDetailsComponent(props) {

  const addToWatchlist=(event) => {
    let id = event.target.id;
    console.log(id)
    let item = {
      userId : localStorage.getItem(`user`),
      companyId : id
    }

    axios.post(`http://localhost:8081/watchList`,item)
    .then(res=>{console.log(res);
    alert("Item added to Watchlist")})
    .catch(err=>console.log(err))
  }

  const removeFromWatchlist = (event) => {
    let id = event.target.id;
    console.log(id)
    let userId = localStorage.getItem(`user`);
    let companyId = id

    
    axios.delete(`http://localhost:8081/delete/${userId}/${companyId}`)
    .then(res => {
      console.log(res);
      alert("Item removed from Watchlist");
      props.doReload();
    })
    .catch(err=>console.log(err))
  }

  let {companyId,companyName,description,marketPrice} = props.data

  return (
    <div key={companyId} className="col-lg-4 col-sm-6 mb-5">
      <div className="card ">
        <div className="card-header font-weight-bold">
          {companyName} 
        </div>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">{description}</p>
        </div>
      
        { <div className="card-footer font-weight-bold">
          Total Price: ${marketPrice} ${localStorage.getItem(`user`)!==null?(props?.isWatched?<button id={companyId} className="btn btn-danger" onClick={removeFromWatchlist}>Remove</button>:<button id={companyId} className="btn btn-primary" onClick={addToWatchlist} >Watch</button>):""}
        </div>}
      </div>
    </div>
  )
}

export default CompanyDetailsComponent
