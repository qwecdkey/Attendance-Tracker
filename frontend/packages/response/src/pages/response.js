/**
 * response.js
 *
 * @Author - Will Humphlett - will@humphlett.net
 * @Author - Ethan Brown - ewbrowntech@gmail.com
 * @Version - 16 APR 23
 *
 * Respond to a quiz
 */
// Main
import React from "react";
import axios from "axios";
// Components
import { Navbar } from "@frontend/common/build"
import JoinForm from "./join";
import QuizDisplay from "../components/quiz-display";
import CompletionScreen from "../components/completion-screen";
// Functions
// Stylesheets
import "bootstrap/dist/css/bootstrap.css"
import "../stylesheets/main.css"

class Response extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionId: null,
            client: null,
            activeQuestion: null,
            quizState: "loading",
            isAcceptingResponses: false,
            endTime: null,
        }
        this.setSessionId = this.setSessionId.bind(this);
        this.setClient = this.setClient.bind(this);
        this.setQuizState = this.setQuizState.bind(this);
        this.addClientHandlers = this.addClientHandlers.bind(this);
        this.setActiveQuestion = this.setActiveQuestion.bind(this);
    }

    setSessionId = (sessionId) => {
        this.setState({ sessionId: sessionId });
    }

    setClient = (client, callback) => {
        this.setState({ client: client }, () => {
            callback();
        });
    }

    cycleQuizState = (data) => {
        if (data.currentQuestion === null) {
            this.setQuizState("completed")
        }
        else if (this.state.quizState === "loading") {
            this.setQuizState("pre-response")
        }
        else if (this.state.quizState === "pre-response") {
            this.setQuizState("response")
        }
        else if (this.state.quizState === "response") {
            this.setQuizState("pre-response")
        }
    }

    setQuizState = (state) => {
        this.setState( { quizState: state})
    }

    addClientHandlers = (client, setActiveQuestion) => {
        client.onmessage = (message) => {
            const data = JSON.parse(message.data)
            if (data) {
                console.log(data)
                setActiveQuestion(data)
                this.cycleQuizState(data)
            }
        }
    }

    setActiveQuestion = (data) => {
        this.setState({
            sessionId: data.id,
            activeQuestion: data.current_question ? {
                index: data.current_question.index,
                answerChoices: data.current_question.answer_set,
                isMultipleSelectionAllowed: false
            } : null,
            isAcceptingResponses: data.isAcceptingResponses,
            endTime: data.end_time
        })
    }

    render() {
        return (
            <div className={"primary-dark-theme"}>
                <div className={"content"}>
                    <div className={"p-2 h-100"}>
                        {this.state.sessionId === null ? (
                            <JoinForm
                                client={this.state.client}
                                setClient={this.setClient}
                                addClientHandlers={this.addClientHandlers}
                                setActiveQuestion={this.setActiveQuestion}
                            />
                        ) : this.state.quizState !== "completed" ? (
                            <QuizDisplay
                                sessionId={this.state.sessionId}
                                activeQuestion={this.state.activeQuestion}
                                quizState={this.state.quizState}
                                isAcceptingResponses={this.state.isAcceptingResponses}
                            />
                        ) : (
                            <CompletionScreen />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Response;

