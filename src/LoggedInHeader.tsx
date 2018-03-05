import * as React from 'react';
import './styles/LoggedInHeader.css';
import { PassedProps, State, Props } from './types/LoggedInHeader.d';

class LoggedInHeader extends React.Component<PassedProps, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    render() {
        return (
            <div>
                <div className="logged-in-header-container">

                    <div className="logged-in-header-logo">project match</div>
                    <div className="logged-in-header-create">
                        <button className="logged-in-header-createButton">CREATE NEW PROJECT</button>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Choose A Portal &#x25BC;</button>
                        <div className="dropdown-content">
                            <a href="#">Test Project #1</a>
                            <a href="#">Test Project #2</a>
                            <a className="dropdown-profileLink" href="#">Profile</a>
                        </div>
                    </div>
                    <div className="logged-in-header-profileImageDiv">
                        <button className="logged-in-header-profileImageButton">
                            <img className="profileImage" src={require('./assets/blank image.png')} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default LoggedInHeader;