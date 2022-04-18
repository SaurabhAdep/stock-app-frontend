import axios from 'axios';
import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class PerformanceComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             company1:"",
             company2:"",
             from:null,
             to:null,
             showTable:false,
             data:[],
             companyList:[]
        }
    }

  async componentDidMount()
  {
    try
    {
      const response = await axios.get("http://localhost:8081/stocks")
      let clist = response.data.map((stock)=>[stock.companyId,stock.companyName])
      let t;
      clist = clist.filter(( t={}, a=> !(t[a]=a in t) ));
      this.setState({
        companyList: clist
      },()=>console.log(this.state.companyList))
    }
    catch(err) {
      console.log(err)
    }
  }

  async fetchData()
  {
    if(this.state.from===null || this.state.to===null || this.state.company1==="" || this.state.company2==="")
      return alert("Fill all the fields...");
    else if(this.state.company1 === this.state.company2 )
      return alert("Both companies are same, Choose different companies...");

    try
    {
      const from = `${this.state.from.getFullYear()}-${`${this.state.from.getMonth()+1}`.padStart(2,0)}-${`${this.state.from.getDate()}`.padStart(2,0)}`;
      const to = `${this.state.to.getFullYear()}-${`${this.state.to.getMonth()+1}`.padStart(2,0)}-${`${this.state.to.getDate()}`.padStart(2,0)}`
      console.log([from,to])
      
      const response = await axios.get(`http://localhost:8081/stocks/compare-performance/${this.state.company1}/${this.state.company2}/${from}/${to}`) 
  
      
      const tempData = response.data
      let data = [];
    
      for(let i=0; i<tempData.length; i+=2) {
        data.push([tempData[i],tempData[i+1]])
      }
      console.log(data)
      this.setState({
          data : data,
          showTable : true
      })
    }
    catch(err) {
      console.log(err)
    }       
  }

  handleSelect = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })   
  }

 
  table = () => 
  {
    
    if(this.state.data.length != 0 )
    {
      return this.state.data.map((data)=>{
        return ( 
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Company</th>
                <th scope="col">Stock Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{data[0].priceOnDate}</th>
                <td>{data[0].companyName}</td>
                <td>{data[0].marketPrice}</td>
              </tr>
              <tr>
                  <td></td>
                  <td>{data[1].companyName}</td>
                <td>{data[1].marketPrice}</td>
              </tr>
            </tbody>
          </table>
        )
      }
    );
  }
  else {
    return alert("No data found for mentioned fields!!!");
  }
}

    
  render() {
    return (
      <div className=" container">
        <h1 className="mt-5">Compare Potential Companies</h1>
        <h3 className="text-muted mt-3">Make smart investment decision</h3>

        <div className="row mt-4">
          <div className="col-sm-6">
            <div class=" mb-3">
              <label>Select Company 1</label>
              <select class="custom-select" onChange={this.handleSelect} name="company1">
                <option selected>Choose...</option>
                {
                  this.state.companyList.map(company=> (
                    <option value={company[0]}>{company[1]}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="col-sm-6">
            <div class="mb-3">
              <label>Select Company 2</label> 
              <select class="custom-select" onChange={this.handleSelect} name="company2">
                <option selected>Choose...</option>
                  {
                    this.state.companyList.map(company=> (
                    <option value={company[0]}>{company[1]}</option>))
                  }
              </select>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-sm-6">
            <div><label>From Date</label></div>
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={this.state.from}
                onChange={(date) => this.setState({from:date})}
              />
            </div>
            <div className="col-sm-6">
              <div><label>To Date</label></div>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  selected={this.state.to}
                  onChange={(date) => this.setState({to:date})}
                />
              </div>
              <div className="col-sm-6 mt-4 mb-4">
                <button className="btn btn-primary" onClick={this.fetchData.bind(this)}>Fetch</button>
              </div>
            </div>
          {this.state.showTable?this.table():""}  
        </div>
      )
    }
  }
  

export default PerformanceComponent
