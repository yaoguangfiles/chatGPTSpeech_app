import React from 'react';
import { useForm } from "react-hook-form";
import ChatDataGram from '../../models/chatDataGram';
import APIChatService from '../../services/apiChatService';

import { createHashHistory } from "history";
import axios from 'axios';
import ChatResponse from '../../models/chatResponse';

function ChatView() {

  const { register, handleSubmit, formState: {errors} } = useForm();

  const protocol = window.location.protocol;
  const domain = window.location.hostname;
  const port = window.location.port;
  const full = `${protocol}//${domain}:${port? port : ""}`
  const url_passengers = `${full}/Passengers`

  const onSubmit = (data: any) => {

    const json_raw = `{"model": "${data.model}","messages": [{"role": "user", "content": "${data.content}"}]}`;

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

      console.log("JSON_obj.choices.message.content: ");
      console.log(JSON_obj.choices[0].message.content);
    });

    // var chatDataGram : ChatDataGram = {
    //   //data: chatResponse,
    //   model: data.model,
    //   messages: [{role: "user", content: data.content}]
    // };

    // console.log("chatDataGram: ");
    // console.log(chatDataGram);

    // APIChatService.sendChatMsg(chatDataGram)
    //   .then((response) => {
    //     console.log("response.data: ");
    //     console.log(response.data);

    //     console.log("response.data: ");
    //     console.log(response.data.constructor.name);

    //     alert("Sys: Sent a Chat Msg!");
    //   })
    //   .catch((err: Error) => {
    //     console.log(err);
    //   });
  }

  return (
    <div id="app" className="container my-3">

      <div className="card mt-3">
          {/* <div className="card-header">Add a Passenger</div> */}
          <div className="card-header">
          <p style={{ fontSize: 20, color: "#ffffff", textAlign: "left", paddingLeft: "20px" }}>FLIGHT SYS &gt; Add a Passenger</p>
                </div>
            <div className="card-body">

              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                  <input {...register("model", { required: true })} className="form-control" placeholder="Model" value="gpt-3.5-turbo" />
                  {errors.name?.type === 'required' && <span> This field is required</span>}
                </div>
                <div className="form-group">
                  <input {...register("content", { required: true })} className="form-control" placeholder="Content" value="How are you?" />
                  {errors.name?.type === 'required' && <span> This field is required</span>}
                </div>
               

                <button className="btn btn-sm btn-primary" >Send Chat Msg</button>
                <button className="btn btn-sm btn-warning ml-2" >Clear</button>

              </form>
            </div>
      </div>
    </div>
  );
}

export default ChatView;