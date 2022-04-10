import React, { Component } from 'react'
import CompanyDetailsComponent from './CompanyDetailsComponent'
import MenuComponent from './MenuComponent'
import axios from 'axios'
import '../Stylesheets/mystyle.css'

export class CompaniesListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
             data:[],
             isLoading:true
        }
    }
    
   async componentDidMount(){
       const response = await axios.get("http://localhost:8081/companies");
       console.log(response.data) 
       this.setState({ 
                data:response.data,
                isLoading:false
        })
    }

    render() {
        return (
            <div>
                <div className="m-5">
                    <h1>Company List</h1>
                    <div className="row mt-3">
                    {
                        this.state.isLoading?
                        <div className="loading">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>:
                        this.state.data.map((obj)=>
                            {   
                            return (
                                <CompanyDetailsComponent  
                                    parent="companyList" 
                                    key={obj.companyId} 
                                    data={obj}
                                />
                            )}
                        )
                    }
                </div>
            </div>   
        </div>
        )
    }
}

export default CompaniesListComponent
