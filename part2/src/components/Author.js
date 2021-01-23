import React from 'react'
import { API } from '../constants'
import '../assets/css/Author.css'

/*
* Author component
* Loads  and presents the presentations of an author by fetching data from the API
*
* @author Roxana Pop
*/

class Author extends React.Component {

    state = {
    display:false,
    titles:[]
  }
    
    loadContentDetails = () => {
      const url = `${API}author-details?authorId=${this.props.details.authorId}`
      fetch(url)
        .then( (response) => response.json() )
        .then( (data) => {
          console.log(data);
          this.setState({ titles: JSON.parse(data.payload).data})
        })
         .catch ((err) => {
           console.log("something went wrong ", err)
        }
      );
    }

    handleAuthorClick = () => {
      this.setState({display:!this.state.display})
      this.loadContentDetails()
    }

    displayTitle = () => {
      console.log('titles',this.state.titles)

        return this.state.titles.map((i,index) => {
            return (
                   <li className='pres_list' key ={index} titles={i}>Presentations:{i.title}</li>
            )
        })
  }
    
    
    render() {
    return (
      <div>
        <br/>
        <h2 onClick={this.handleAuthorClick}>{this.props.details.name}</h2>
        { this.state.display ? this.displayTitle() :  <p></p>}
      </div>
    );
}
}

export default Author;