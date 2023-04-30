import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";

import SpeechTextView from "./views/speechText/SpeechTextView";
import TextSpeechView from "./views/speechText/TextSpeechView";
import ChatView from "./views/chatGpt/ChatView";
import ChatSpeechView from "./views/chatGpt/ChatSpeechView";

class App extends React.Component {

  
  componentDidMount() {
    
  }
  
  render() {
    return (
      <main>
        <NavigationBar />
        <Routes>
          <Route path="/" />

            <Route path="/chatSpeechView/" element={ 
            <React.Suspense fallback={<>...</>}>
              <ChatSpeechView  />
            </React.Suspense>} />

            <Route path="/chatView/" element={ 
            <React.Suspense fallback={<>...</>}>
              <ChatView />
            </React.Suspense>} />

            <Route path="/speechText/" element={ 
            <React.Suspense fallback={<>...</>}>
              <SpeechTextView />
            </React.Suspense>} />

            <Route path="/textSpeech/" element={ 
            <React.Suspense fallback={<>...</>}>
              <TextSpeechView />
            </React.Suspense>} />
        </Routes>
      </main>
    );
  }

  componentDidUpdate() {}

  componentDidCatch() {}

  componentWillUnmount() {}

  // addSong = (song: Song) => {
  //   this.setState((state) => {
  //     state.songList.push(song)
  //   });
  // };
}

export default App;
