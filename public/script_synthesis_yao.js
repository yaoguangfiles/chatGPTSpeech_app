const synth = window.speechSynthesis;

const inputForm = document.querySelector("#form_ChatSpeechView");
const inputTxt = document.querySelector(".txt_answer");
const voiceSelect = document.querySelector("select");

const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");

let voices = [];

function populateVoiceList() 
{
  voices = synth.getVoices().sort(function (a, b) 
  {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });

  const selectedIndex = voiceSelect.selectedIndex < 0 ? 29 : voiceSelect.selectedIndex;

  voiceSelect.innerHTML = "";

  for (let i = 0; i < voices.length; i++) 
  {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) 
    {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
  //alert("voiceSelect.selectedIndex: " + voiceSelect.selectedIndex);
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) 
{
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(str_speak) 
{
  // if (synth.speaking) 
  // {
  //   console.error("speechSynthesis.speaking");
  //   return;
  // }

  // var i = 1;
  // while (synth.speaking) {

  //     setTimeout(function timer() {
  //       console.log("speechSynthesis.speaking with i: " + i);
  //     }, i * 1000);
  //     i = i+1;
  // }

  if (str_speak !== "") 
  {
    const utterThis = new SpeechSynthesisUtterance(str_speak);

    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    //const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name"); //Y: -
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name"); //Y: +

    for (let i = 0; i < voices.length; i++) 
    {
      if (voices[i].name === selectedOption) 
      {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function (event) 
{
  event.preventDefault();

  alert(inputTxt.value);

  speak(inputTxt.value);

  inputTxt.blur();
};

pitch.onchange = function () 
{
  pitchValue.textContent = pitch.value;
};

rate.onchange = function () 
{
  rateValue.textContent = rate.value;
};

voiceSelect.onchange = function () 
{
  speak();
};

// function highlightSyntax(){
//   console.log("Syntax highlighted")
// }

// var externalObject = {
//   enhanceImages :function enhanceImages(){
//       console.log("Enhancing images")
//   },
//   measureTimeOnPage :function measureTimeOnPage(){
//       console.log("Measuring time on page")
//   }
// }

function ExternalJSFileFunction(val)
{
  alert("external function called..."+val);
}