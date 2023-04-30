var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

var recognition = new SpeechRecognition();
if (SpeechGrammarList) {
  // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
  // This code is provided as a demonstration of possible capability. You may choose not to use it.
  var speechRecognitionList = new SpeechGrammarList();
  var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
}
//recognition.continuous = false; //Y:-
recognition.continuous = true; //Y:+
recognition.lang = 'en-US';
//recognition.interimResults = false; //Y:-
recognition.interimResults = true; //Y:+
recognition.maxAlternatives = 1;

var final_transcript = '';

var diagnostic = document.querySelector('.output');
var btn_speak = document.querySelector('.btn_speak');
var btn_doneSpeake = document.querySelector('.btn_doneSpeake');

var txt_answer = document.querySelector('.txt_answer');
var txt_ask = document.querySelector('.txt_ask');
//var txt_ask = document.querySelector('#id_txt_ask');

//const inputTxt = document.querySelector(".txt_answer");

//var bg = document.querySelector('html');
//var hints = document.querySelector('.hints');

// var colorHTML= '';
// colors.forEach(function(v, i, a){
  // console.log(v, i);
  // colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
// });
//hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try ' + colorHTML + '.';

btn_speak.onclick = function() {
  // speak("ready.");

  final_span.innerHTML = '';
  interim_span.innerHTML = '';

  // setTimeout(function timer() {
  //   console.log("speechSynthesis.speaking with i: " + 1);
  // }, 1 * 1000);

  //recognition.stop();

  recognition.start();
  //ignore_onend = false;

  //speak("ready.");

  console.log('Y: click on diagnostic');
  console.log('Ready to receive a color command.');
}


btn_doneSpeake.onclick = function() {

  recognition.stop();
  final_span.innerHTML = '';
  interim_span.innerHTML = '';

  console.log("T: Done with speaking.");
  console.log("T: Submit spoken text");

  document.getElementById('form_ask').requestSubmit();
}

// function startButton(event) {
//   if (recognizing) {
//     recognition.stop();
//     return;
//   }
//   final_transcript = '';
//   recognition.lang = select_dialect.value;
//   recognition.start();
//   ignore_onend = false;
//   final_span.innerHTML = '';
//   interim_span.innerHTML = '';
//   start_img.src = 'mic-slash.gif';
//   showInfo('info_allow');
//   showButtons('none');
//   start_timestamp = event.timeStamp;
// }


// document.body.onclick = function() {
  // recognition.start();
  // console.log('Ready to receive a color command.');
// }

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
  
  // code from webspeechdemo.html

  var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) 
    {
      if (event.results[i].isFinal) 
      {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);

    // if (final_transcript || interim_transcript) {
    //   showButtons('inline-block');
    // }
  //};

  // original code for speech to text recogingion
  
  var color = event.results[0][0].transcript;
  diagnostic.textContent = 'Result received: ' + color + '.';
  txt_answer.value = color;
  //txt_ask.value = color;
  //bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);

  console.log("T: color asked: " + color);

  if (color != "Ready.")
  {
    //document.getElementById('id_txt_ask').value = color;

    document.getElementById('id_txt_ask').value = final_span.innerHTML;

    //console.log("T: question asked: " + txt_ask.value);
    console.log("T: question asked: " + final_span.innerHTML);

    //document.getElementById('form_ask').requestSubmit();
  }
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
