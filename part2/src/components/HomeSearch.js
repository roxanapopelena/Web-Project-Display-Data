import React from 'react';
import Search from './Search';
import Session from './Session.js';
import {API} from '../constants';

import '../assets/css/Buttons.css';
import '../assets/css/HomeSearch.css';

/*
* Component to display a welcome message for the home page and a search feature
* Initially does not show any session names;
* Filters session names by input
* Data is displayed in pages
*
* @author Roxana Pop
*/
class HomeSearch extends React.Component {

 constructor(props) {
 super(props);
 this.state = {
   page:1,
   pageSize:10,
   query:"",
   data:[]
   } 

   this.handleSearch = this.handleSearch.bind(this);
 }

 handleSearch = (e) => {
   this.setState({page:1,query:e.target.value})
   this.searchDetails(e.target.value)
 }

 searchDetails = (query) => {
   const url = `${API}sessions?search=${query}`
   
   fetch(url)
     .then( (response) => response.json() )
     .then( (data) => {
       this.setState({data:data.data})
     })
   .catch ((err) => {
     console.log("something went wrong ", err)
   });
 }

 handlePreviousClick = () => {
   this.setState({page:this.state.page-1})
 }

 handleNextClick = () => {
   this.setState({page:this.state.page+1})
 }

 render() {

   let filteredData =  (
     this.state.data      
   )

   let noOfPages = Math.ceil(filteredData.length/this.state.pageSize)
   if (noOfPages === 0) {noOfPages=1}
   let disabledPrevious = (this.state.page <= 1)
   let disabledNext = (this.state.page >= noOfPages)

   return (
     <div className='container'>
       <h1>Welcome</h1>
       <h2 className='message-header'>We are delighted to have you here.</h2>
       <div className='message'>
       <p>CHI2020 is dedicated to bringing you the latest information regarding every aspect of the Human-Computer Interaction field. 
         On our website you can find the schedule for this year's event and information about our plethora of presentations. 
         On top of that, you can now filter through all of our lovely authors and find presentations that interest you the most.
         This year, we promise to bring the most relevant pieces of science to out community.</p>
         <br/>
         <p>We’re transforming the way we operate to continuously improve our ability to adapt to new challenges, especially in these times. 
           Our employees and partners have continued to meet the challenges of our field and to excel despite setbacks. 
           We should all be very proud of where we are today and excited about where we are headed.</p>
       </div>
       <div className='search'>
         <h3>Below you can search for specific sessions or to browse for something that meets your interests.</h3>
       <Search query={this.state.query} handleSearch={this.handleSearch}/>
       { 
         filteredData
         .slice(((this.state.pageSize*this.state.page)-this.state.pageSize),(this.state.pageSize*this.state.page))
         .map( (details, i) => (<Session key={i} details={details} />) )
       }
       <button className='button' onClick={this.handlePreviousClick} disabled={disabledPrevious}><i className="fas fa-arrow-left"></i></button>
       {' '}Page {this.state.page} of {' '}{noOfPages}
       <button className='button' onClick={this.handleNextClick} disabled={disabledNext}><i className="fas fa-arrow-right"></i></button>
       </div>
     </div>
   );
 }
}

export default HomeSearch;