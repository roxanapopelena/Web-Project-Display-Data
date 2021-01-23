import * as React from 'react'
import { API } from '../constants'
import Day from './Day'

import styles from '../assets/css/schedule.module.css'

/*
* Schedule component to display the days available at the conference
*
* @author Roxana Pop
*/
class Schedule extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            slots: {},
            loading: true
        }
    }

    componentDidMount = async () => {
        await fetch(`${API}slot-days`)
            .then(response => response.json())
            .then(data => {
                this.setState({ slots: data.data, loading: false })
            })
            .catch(err => console.error(err))
    }

    displayData = () => {
        return this.state.slots.map((it, index) => {
            return (
                <Day key={index} dayInt={it.dayInt} dayString={it.dayString} />
            )
        })
    }

    render = () => {
        return (
            <div>
                <h1 className={styles.header}>Schedule Page</h1>
                <hr/>
                <div className={styles.day}>
                    { this.state.loading ? <p>Loading...</p> : this.displayData() }
                </div>
            </div>
        )
    }
}

export default Schedule