import axios from "axios";
import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// import {Helmet} from "react-helmet";

declare var ExternalJSFileFunction: (val: any) => void;
declare var speak: (val: any) => void;

export class ChatSpeechView extends React.Component<any, any> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = { 
            model: "gpt-3.5-turbo",
            content: "How are you? AI",
            answer: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit_ask = this.handleSubmit_ask.bind(this);

        // this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        //Y: add javascript source for text to speech.
        const script_textToSpeech = document.createElement("script");
        script_textToSpeech.src = "script_synthesis_yao.js";
        script_textToSpeech.async = true;
        document.body.appendChild(script_textToSpeech);

        //Y: add javascript source for speech to text.
        const script_speechToText = document.createElement("script");
        script_speechToText.src = "script_recognition_yao.js";
        script_speechToText.async = true;
        document.body.appendChild(script_speechToText);
    }


    // handleChange(event: { target: { model: any; }; }) {
    //     this.setState({model: event.target.model});
    // }
    
    handleChange(event: { target: { value: any; }; }) {
        alert("content: " + event.target.value);
        this.setState({
            model: event.target.value,
            content: event.target.value,
            answer: event.target.value
        });
    }

    handleSubmit_ask(event: { preventDefault: () => void; }) 
    {
        event.preventDefault();
        
        const content_ele = document.getElementById("id_txt_ask") as HTMLInputElement;
        const content_str = content_ele.value;
        //alert("content_str: " + content_str);

        const json_raw = `{"model": "${this.state.model}","messages": [{"role": "user", "content": "${content_str}"}]}`;

        speak("Your question. " + content_str);

        //ExternalJSFileFunction("Paul");
        //speak("Paul");

        // alert("A name was submitted: model:" + this.state.model +", content: " + this.state.content);
        //alert("A name was submitted: " + json_raw);
        console.log("T: question aksed has been submitted. json_str: " + json_raw);

        const headers = { 
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        };

        console.log("json_raw: ");
        console.log(json_raw);

        axios.post("https://api.openai.com/v1/chat/completions", json_raw, { headers })
        .then((response) => {
            console.log("response.data: ");
            console.log(response.data);

            const JSON_str = JSON.stringify(response.data);

            // console.log("JSON_str: ");
            // console.log(JSON_str);

            const JSON_obj = JSON.parse(JSON_str);
            // console.log("JSON_obj.id: ");
            // console.log(JSON_obj.id);

            const answer_response = JSON_obj.choices[0].message.content;
            console.log("JSON_obj.choices.message.content: ");
            console.log(answer_response);

            this.setState({
                answer: answer_response
            });

            //document.getElementById('form_ask').requestSubmit();

            //alert("answer_response: " + answer_response);
            console.log("T: answer_response: " + answer_response);

            speak("The AI answer. " + answer_response);
        });
    }

    render() {

        return (
            <>
                <div className="App container">

                    <form id="form_ChatSpeechView">
                        AI Answer:
                        {/* <input id="txt" type="textarea" className="txt_answer" value={this.state.answer} onChange={this.handleChange.bind(this)} /> */}
                        <input id="txt" type="textarea" className="txt_answer" value={this.state.answer} onChange={this.handleChange.bind(this)}/>
                        <div>
                            <label htmlFor="rate">Rate</label><input type="range" min="0.5" max="2" value="1" step="0.1" id="rate" />
                            <div className="rate-value">1</div>
                            <div className="clearfix"></div>
                        </div>
                        <div>
                            <label htmlFor="pitch">Pitch</label><input type="range" min="0" max="2" value="1" step="0.1" id="pitch" />
                            <div className="pitch-value">1</div>
                            <div className="clearfix"></div>
                        </div>
                        <select></select>
                        <div className="controls">
                            <button id="play" type="submit">Play</button>
                        </div>
                    </form>

                </div>

                <div className="card mt-3">
                    {/* <div className="card-header">Add a Passenger</div> */}
                    
                    <div className="card-body">

                        <form id = "form_ask" onSubmit={this.handleSubmit_ask}>
                            <label>
                            Model:
                            <input type="text" value={this.state.model} onChange={this.handleChange.bind(this)} />
                            </label>

                            <label>
                            Question Asked:
                            <input type="text" id="id_txt_ask" className="txt_ask" onChange={this.handleChange.bind(this)}/>
                            {/* <input type="text" id="id_txt_ask" className="txt_ask" value={this.state.content} onChange={this.handleChange.bind(this)} /> */}
                            </label>

                            <input type="submit" value="Submit" />

                        </form>
                    </div>
                </div>

                <div className="App container">
                
                <div>
                    <p className="output"><em>receiving text from your speech ...</em></p>

                    <span id="final_span" className="final"></span>
                    <span id="interim_span" className="interim"></span>

                    <input className="btn_speak" type="button" value="Start Speak" />
                    <input className="btn_doneSpeake" type="button" value="Finish Speak" />
                </div>
                            
            </div>
        </>

        );
    }
}

export default ChatSpeechView;
