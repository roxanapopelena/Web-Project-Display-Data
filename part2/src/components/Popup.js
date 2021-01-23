import React from 'react';
import Content from './Content';

import popupStyle from '../assets/css/popup.module.css'

/*
* Popup class to be used in conjunction with the Content component
* Displays a popup window for a selected session
*
* @author Roxana Pop
*/
class Popup extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            display: false
        }

        console.log(this.props.slotData)
    }

    displaySlotData = () => {
        return this.props.slotData.map((it, index) => {
            return (
                <Content key={`${index}${it.sessionId}`} details={it} />
            )
        })
    }

    render = () => {
        return (
            <div className={popupStyle.popup}>
                <div className={popupStyle.popup_inner}>
                    <button className={popupStyle.close_popup_button} onClick={this.props.closePopup}>Close</button>
                    {this.displaySlotData()}
                </div>
            </div>
        )
    }
}

export default Popup;