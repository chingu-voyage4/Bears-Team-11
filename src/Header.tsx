import * as React from 'react';
import '/styles/Header.css'

class Header extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            
        };
    }

    Render() {

        return (
            <div>
                <div className="bar">
                    <div className="title">
                        <h1>Header</h1>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header;