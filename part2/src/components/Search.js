import React from 'react'
import '../assets/css/Search.css'

/*
* General Search component used in various other components
* Displays an input box used to filter data
*
* @author Roxana Pop
*/
class Search extends React.Component {
    render() {
      return (
        <div>
          <p>{this.props.query}</p>
          <input
            className='inputSearch'
            type='text' 
            placeholder='Search...'
            value={this.props.query}
            onChange={this.props.handleSearch}
          />
        </div>
      )
    }       
}

export default Search;