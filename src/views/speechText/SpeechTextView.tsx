import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// import {Helmet} from "react-helmet";

export class SpeechTextView extends React.Component {

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "script_recognition_yao.js";
        script.async = true;
        document.body.appendChild(script);
    }

    render(): React.ReactNode {
        return (
            <div className="App container">
                
                <div>
                <p className="output"><em>receiving text from your speech ...</em></p>
                </div>
                {/* <Helmet>
                <script src="script_recognition_yao.js" type="text/javascript" />
                </Helmet> */}
                {/* <script src="script.js"></script> */}
                            
            </div>
        );
    }
}

export default SpeechTextView;