import * as React from 'react';
import { API } from '../constants';
import Popup from './Popup';

import styles from '../assets/css/schedule.module.css'

/*
* Day class to display details regarding the time slots
* Diplays buttons for each conference day
* If a button is clicked, it will display a table will all available slots for that day
* And of any slot is clicked, it will use the Popup component to display more data
*
* @author Roxana Pop
*/
class Day extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            loading: true,
            showPopup: false,
            popupDetails: [],
            display: false
        }
    }

    componentDidMount = async () => {
        await fetch(`${API}slot-day-details?slotDay=${this.props.dayInt}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ data: JSON.parse(data.payload).data, loading: false })
            })
            .catch(err => console.error(err))
    }

    togglePopup = async (e) => {
        this.setState({ showPopup: !this.state.showPopup })

        if (e.target.attributes.type && e.target.attributes.slotid) {
            const slotId = e.target.attributes.slotid.value

            await fetch(`${API}slot-id-details?slotId=${slotId}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({ popupDetails: JSON.parse(data.payload).data, loading: false })
                })
                .catch(err => console.error(err))
        }
    }

    displayTime = (hour, mins) => {
        let result = '';

        if (hour.length === 1) {
            result = '0' + String(hour) + ':'
        } else {
            result = String(hour) + ':'
        }

        if (mins.length === 1) {
            result += String(mins) + '0'
        } else {
            result += String(mins)
        }

        return result
    }

    displayData = () => {
        return this.state.data.map((it, index) => {
            return (
                <tr key={index}>
                    <td type={it.type} slotid={it.slotId} onClick={this.togglePopup}>
                        {it.type}
                    </td>
                    <td>
                        {`${this.displayTime(it.startHour, it.startMinute)} - ${this.displayTime(it.endHour, it.endMinute)}`}
                    </td>
                </tr>
            )
        })
    }

    handleDayReveal = () => {
        this.setState({ display: !this.state.display })
    }

    render = () => {
        return (
            <>
                { this.state.showPopup ? <Popup slotData={this.state.popupDetails} closePopup={this.togglePopup} /> : null}

{ this.state.display ? <div className={styles.alpha}>
    <table className={styles.schedule} key={this.props.dayInt}>
        <thead>
            <tr>
                <td colSpan={2}>{this.props.dayString}</td>
            </tr>
            <tr>
                <td>Session Type</td>
                <td>Duration</td>
            </tr>
        </thead>

        <tbody>
            {this.state.loading ? <tr><td>Loading</td></tr> : this.displayData()}
        </tbody>
    </table>

    <div className={styles.alpha}>
        <h3>Select a session slot to see details for {this.props.dayString}.</h3>
    </div>
</div> : null}
<button onClick={this.handleDayReveal} className={styles.showDay}>{ !this.state.display ? `Show ${this.props.dayString}` : `Hide ${this.props.dayString}` }</button>
           
                
            </>
        )
    }
}

export default Day;
