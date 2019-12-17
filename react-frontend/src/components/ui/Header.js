import React from 'react';
import InputWrapper from './InputWrapper';

export default function Header(props) {
    return (
        <header>
            <h1 className="title loading">{props.title}</h1>
            {props.model === "todo" ? (
                <span style={{color: "blue", fontStyle: "italic", position: "absolute", top: "10px" }}>{props.isBusy() ? (<span>Status:  <span className="loading">Loading...</span></span>) : "Status: Ready"}</span>

            ):(
                <span></span>
            )

            }
            <InputWrapper {...props}/>
        </header>
    );
}
