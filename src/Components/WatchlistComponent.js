import axios from 'axios';
import React, { Component,useEffect,useState } from 'react'
import CompanyDetailsComponent from './CompanyDetailsComponent';
import '../Stylesheets/mystyle.css'

export const WatchlistComponent =()=> {

  const initialState = {
        data:[],
        isLoading:true,
      hasChanged:0
  }

  const [state, setState] = useState(initialState)

  useEffect(()=> {(

    async function() { 
      try
      {
        const response = await axios.get(`http://localhost:8081/watchList/${localStorage.getItem(`user`)}`);
       // const response = await axios.get(`http://localhost:8081/watchList/1`);
        console.log(response.data)  
        setState({
            data:response.data,
            isLoading:false
          })
      }
      catch(err) {
        console.log(err)
      }
    })()
           
  },[state.hasChanged])

    
  function reloadOnRemove()
  {
    setState((prevState) => {
      return { 
        ...prevState,
        hasChanged:prevState.hasChanged+1 }
    })
  }
   
    
  return (
    <div className="m-5">
      <h1>My Company List</h1>
      <div className="row mt-3">
        {state.isLoading? 
          <div class="loading">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>:
            (state.data.length!==0 ?
              state.data.map((obj) => {
                return (
                  <CompanyDetailsComponent 
                    doReload={reloadOnRemove} 
                    key={obj.companyId} 
                    data={obj}
                    isWatched="true"
                  />
                )
              }
            ):<h3>No Company Stock Prices added to Watchlist</h3>)
        }
      </div>
   </div>
  )
}

export default WatchlistComponent
