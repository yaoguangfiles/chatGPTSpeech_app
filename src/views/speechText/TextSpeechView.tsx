import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// import {Helmet} from "react-helmet";

export class TextSpeechView extends React.Component {

    componentDidMount() {
        const script = document.createElement("script");
        script.src = "script_synthesis_yao.js";
        script.async = true;
        document.body.appendChild(script);
    }

    render(): React.ReactNode {
        return (
            <div className="App container">
                
                <form>
                    <input id="txt" type="text" className="txt" />
                    <div>
                        <label htmlFor="rate">Rate</label
                        ><input type="range" min="0.5" max="2" value="1" step="0.1" id="rate" />
                        <div className="rate-value">1</div>
                        <div className="clearfix"></div>
                    </div>
                    <div>
                        <label htmlFor="pitch">Pitch</label
                        ><input type="range" min="0" max="2" value="1" step="0.1" id="pitch" />
                        <div className="pitch-value">1</div>
                        <div className="clearfix"></div>
                    </div>
                    <select></select>
                    <div className="controls">
                        <button id="play" type="submit">Play</button>
                    </div>
                </form>
                            
            </div>
        );
    }
}

export default TextSpeechView;