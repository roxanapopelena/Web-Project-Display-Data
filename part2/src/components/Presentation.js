import React from 'react';
import { API } from '../constants';

/*
* Presentation component to display details of a presentation
* Data is retrieved from the API
*
* @author Roxana Pop
*/
class Presentation extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            display: false,
            authorData: [],
            loadingAuthors: true
        }
    }

    componentDidMount = async () => {
        await fetch(`${API}presentation-authors?contentId=${this.props.details.contentId}`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ authorData: JSON.parse(data.payload).data, loadingAuthors: false })
            })
            .catch(err => console.error(err))
    }

    displayAuthors = () => {
        return this.state.authorData.map((it, index) => {
            return (
                <li key={index}>
                    {it.name} {it.authorInst ? `from ${it.authorInst}` : null}
                </li>
            )
        })
    }

    displayPresentationData = (e) => {
        this.setState({ display: !this.state.display })
    }

    render = () => {
        return (
            <div>
                <h3>{this.props.details.title}</h3>
                <button className='button' onClick={this.displayPresentationData}>{this.state.display ? 'Hide' : 'Show'} details</button>
                { this.state.display ?
                    <div>
                        <p>{this.props.details.abstract}</p>
                        <p>{this.props.details.award === '' ? '' : 'Award: ' + this.props.details.award}</p>
                        {this.state.loadingAuthors ? 'Loading authors...' : <div><h4>Authors</h4><ul>{this.displayAuthors()}</ul></div>}
                    </div> : null}
            </div>
        )
    }
}

export default Presentation;