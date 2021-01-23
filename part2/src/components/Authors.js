import React from 'react';
import Author from './Author';
import Search from './Search';
import { API } from '../constants';

import '../assets/css/Buttons.css';
import '../assets/css/Authors.css';

/*
* Authors components
* Displays all authors from the API endpoint
* Has a search feature and pages 
*
* @author Roxana Pop
*/
class Authors extends React.Component {
    componentDidMount() {
      const url = `${API}authors`
     
      fetch(url)
     .then( (response) => response.json() )
     .then( (data) => {
       this.setState({data:data.data})
     })
     .catch ((err) => {
       console.log("something went wrong ", err)
     }
   );
  }
  
   constructor(props) {
     super(props);
     this.state = {
       page:1,
       pageSize:10,
       query:"",
       data : []
     }
     this.handleSearch = this.handleSearch.bind(this);
   }
  
   handlePreviousClick = () => {
     this.setState({page:this.state.page-1})
   }
  
   handleNextClick = () => {
     this.setState({page:this.state.page+1})
   }
  
   handleSearch = (e) => {
     this.setState({page:1,query:e.target.value})
   }
  
   searchString = (s) => {
     return s.toLowerCase().includes(this.state.query.toLowerCase())
   }
  
   searchDetails = (details) => {
     return ((this.searchString(details.name)))
   }
  
   render() {
  
     let filteredData =  (
       this.state.data
       .filter(this.searchDetails)
     )
  
     let noOfPages = Math.ceil(filteredData.length/this.state.pageSize)
     if (noOfPages === 0) {noOfPages=1}
     let disabledPrevious = (this.state.page <= 1)
     let disabledNext = (this.state.page >= noOfPages)
  
     return (
       <div className='authors'>
         <h1>Authors Page</h1>
         <br/>
         <h4>Click on any author to see more info about their presentations or search for a specific author</h4>
         <br/>
         <hr className='hr-authors'/>
         <br/>
         
         <Search query={this.state.query} handleSearch={this.handleSearch}/>
         { 
           filteredData
           .slice(((this.state.pageSize*this.state.page)-this.state.pageSize),(this.state.pageSize*this.state.page))
           .map( (details, i) => (<Author key={i} details={details} />) )
         }
         <br/>
         <button className='button' onClick={this.handlePreviousClick} disabled={disabledPrevious}><i className="fas fa-arrow-left"></i></button>
         {' '}Page {this.state.page} of {' '} {noOfPages}
         <button className='button' onClick={this.handleNextClick} disabled={disabledNext}><i className="fas fa-arrow-right"></i></button>
       </div>
     );
   }
  }

  export default Authors;