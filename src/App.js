import './App.css';
import MenuComponent from './Components/MenuComponent';
import LoginComponent from './Components/LoginComponent';
import CompanyDetailsComponent from './Components/CompanyDetailsComponent';
import CompaniesListComponent from './Components/CompaniesListComponent';
import WatchlistComponent from './Components/WatchlistComponent';
import PerformanceComponent from './Components/PerformanceComponent';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import React from 'react'


export const AuthContext = React.createContext();



const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};


const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};




const ProtectedRoute=({component:Component,authstate:state,...rest})=>{

  return(
    <Route
    {...rest}
    render={()=>
      {
        console.log(localStorage.getItem(`user`))
        if(!state.isAuthenticated)
         return <Redirect to="/"/>
         else
         return <Component />
       
      }
    }
    />
  )

}
function App() {

  const [state,dispatch] = React.useReducer(reducer, initialState);
  

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem(`user`) || null)
    const token = JSON.parse(localStorage.getItem(`token`) || null)

    if(user && token){
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])

  
  return (
    <Router>
     <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      
      <MenuComponent/>
      <Switch>
      <Route path="/" exact component={LoginComponent}/>
      <Route path="/companies"  component={CompaniesListComponent}/>
      
        <ProtectedRoute path="/watchlist" authstate={state} component={WatchlistComponent}/>
        <ProtectedRoute path="/performance"  authstate={state} component={PerformanceComponent}/>
      </Switch>
      
      </AuthContext.Provider>
      
      

    </Router>
  );
}

export default App;
