import React from 'react';
import { API } from '../constants';
import Presentation from './Presentation';

/*
* Content component to display the content of a session
* Data is retrieved from the API
*
* @author Roxana Pop
*/
class Content extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sessionDetails: {},
            loading: true,
            display: false
        }
    }

    loadSessionData = () => {
        this.setState({ display: !this.state.display })

        fetch(`${API}session-id-details?sessionId=${this.props.details.sessionId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ sessionDetails: JSON.parse(data.payload).data, loading: false })
            })
            .catch(err => console.error(err))

        console.log(this.state.sessionDetails)
    }

    showSessionData = () => {
        console.log(this.state.sessionDetails)

        return this.state.sessionDetails.map((it, index) => {
            return (
                <div key={index}>
                    <Presentation details={it} />
                </div>
            )
        })
    }

    render = () => {
        return (
            <div>
                <h3 onClick={this.loadSessionData}>{this.props.details.name} - {this.props.details.type} - {this.props.details.room}</h3>
                <p>Chair: {this.props.details.chair}</p>
                <br/>
                <hr></hr>
                

                { this.state.display ?
                    <div>
                        {this.state.loading ? <p>Loading...</p> : this.showSessionData()}
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default Content;