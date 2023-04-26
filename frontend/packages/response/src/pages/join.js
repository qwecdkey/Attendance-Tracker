/**
 * join-form.js
 *
 * @Author - Will Humphlett - will@humphlett.net
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 25 APR 23
 *
 * Join a quiz with a code
 */
// Main
import React from "react";
import axios from "axios";
// Components
// Functions
import { joinAsResponder } from "../functions/join-as-responder";
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class JoinForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            joinCode: ""
        }
        this.joinAsResponder = props.joinAsResponder;
        this.inputRef = React.createRef();
    }

    handleInputChange = (event) => {
        const joinCode = event.target.value.replace(/[^0-9]/g, '');
        this.setState({ joinCode: joinCode }, () => {
            this.inputRef.current.focus();
            this.inputRef.current.setSelectionRange(joinCode.length, joinCode.length);
        });
    };

    handleJoinClick = (event) => {
        event.stopPropagation();
        this.joinAsResponder(this.state.joinCode);
    }

    render() {
        return (
            <div className={"h-100 d-flex align-self-center justify-content-center flex-column"}>
                <div className={"card secondary-dark-theme join-form-card col-12 col-sm-9 col-md-6 col-lg-5 col-xl-4"}>
                    <div className={"card primary-dark-theme text-dark-theme text-center col-12 pt-1 pb-0 px-3 "}>
                        <h3><strong>Enter a Code:</strong></h3>
                    </div>
                    <div className={"card code-entry-card col-12 mt-3 pb-0 text-center"}>
                        <input
                            className={"code-entry-input"}
                            type={"text"}
                            maxLength={5}
                            value={this.state.joinCode}
                            key={this.state.joinCode}
                            ref={this.inputRef}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className={"card btn button-card join-button primary-dark-theme text-dark-theme col-12 mt-3 align-self-center"}
                    onClick={this.handleJoinClick}>
                        Join
                    </div>
                </div>
            </div>

        )
    }
}

export default JoinForm