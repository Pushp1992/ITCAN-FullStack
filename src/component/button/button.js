import React from 'react';
import '../button/button.css';

function Button(props) {
    const className = `button ${props.type}`
    return(
        <React.Fragment>
            <button className={className} disabled={props.boolean} onClick={props.handleClick}> {props.label} </button>
        </React.Fragment>
    )

}

export default Button;