import React, { useEffect } from "react";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import dotenv from "dotenv";
import authHeader from "./auth-header";
import AuthService from "./AuthService";

dotenv.config();

const dbUrl = process.env.REACT_APP_DB_HOST;
var usernamePage;
var chatPage;
var usernameForm;
var messageForm;
var messageInput;
var messageArea;
var connectingElement;

var stompClient;
var username;
var roomId;
var colors;

function connect(event) {
  const url = "https://" + dbUrl + "/ws";
  // username = document.querySelector("#name").value.trim();
  username = AuthService.getCurrentUser().username;

  if (username) {
    roomId = document.querySelector("#roomId").value.trim();
    usernamePage.classList.add("hidden");
    chatPage.classList.remove("hidden");

    // var socket = new SockJS("/ws");
    var socket = new SockJS(url);
    stompClient = Stomp.over(socket);

    stompClient.connect(authHeader(), onConnected, onError);
  }
  event.preventDefault();
}

function onConnected() {
  // const url = "/app/chat/" + roomId + "/addUser";
  // console.log("url = " + url);

  // Subscribe to the Public Topic
  //    stompClient.subscribe('/topic/public', onMessageReceived);

  // stompClient.subscribe(
  //   "https://" + dbUrl + "/topic/" + roomId,
  //   onMessageReceived
  // );

  stompClient.subscribe("/topic/" + roomId, onMessageReceived);
  stompClient.subscribe(
    "/topic/" + username + "/queue/" + roomId,
    onMessageReceived
  );

  // Tell your username to the server
  // stompClient.send(url, {}, JSON.stringify({ sender: username, type: "JOIN" }));
  stompClient.send(
    "/app/chat/" + roomId + "/addUser",
    {},
    JSON.stringify({ sender: username, type: "JOIN" })
  );

  connectingElement.classList.add("hidden");
}

function onError(error) {
  connectingElement.textContent =
    "Could not connect to WebSocket server. Please refresh this page to try again!";
  connectingElement.style.color = "red";
}

function sendMessage(event) {
  var messageContent = messageInput.value.trim();
  if (messageContent && stompClient) {
    var chatMessage = {
      sender: username,
      content: messageInput.value,
      type: "CHAT",
    };
    stompClient.send(
      "/app/chat/" + roomId + "/sendMessage",
      {},
      JSON.stringify(chatMessage)
    );
    messageInput.value = "";
  }
  event.preventDefault();
}

function onMessageReceived(payload) {
  var message = JSON.parse(payload.body);

  var messageElement = document.createElement("li");

  if (message.type === "JOIN") {
    messageElement.classList.add("event-message");
    message.content = message.sender + " joined!";
  } else if (message.type === "LEAVE") {
    messageElement.classList.add("event-message");
    message.content = message.sender + " left!";
  } else {
    messageElement.classList.add("chat-message");

    var avatarElement = document.createElement("i");
    var avatarText = document.createTextNode(message.sender[0]);
    avatarElement.appendChild(avatarText);
    avatarElement.style["background-color"] = getAvatarColor(message.sender);

    messageElement.appendChild(avatarElement);

    var usernameElement = document.createElement("span");
    var usernameText = document.createTextNode(message.sender);
    usernameElement.appendChild(usernameText);
    messageElement.appendChild(usernameElement);
  }

  var textElement = document.createElement("p");
  var messageText = document.createTextNode(message.content);
  textElement.appendChild(messageText);

  messageElement.appendChild(textElement);

  messageArea.appendChild(messageElement);
  messageArea.scrollTop = messageArea.scrollHeight;
}

function getAvatarColor(messageSender) {
  var hash = 0;
  for (var i = 0; i < messageSender.length; i++) {
    hash = 31 * hash + messageSender.charCodeAt(i);
  }
  var index = Math.abs(hash % colors.length);
  return colors[index];
}

const Chat = () => {
  ("use strict");
  useEffect(() => {
    usernamePage = document.querySelector("#username-page");
    chatPage = document.querySelector("#chat-page");
    usernameForm = document.querySelector("#usernameForm");
    messageForm = document.querySelector("#messageForm");
    messageInput = document.querySelector("#message");
    messageArea = document.querySelector("#messageArea");
    connectingElement = document.querySelector(".connecting");

    stompClient = null;
    username = null;
    roomId = null;

    colors = [
      "#2196F3",
      "#32c787",
      "#00BCD4",
      "#ff5652",
      "#ffc107",
      "#ff85af",
      "#FF9800",
      "#39bbb0",
    ];
  });

  return (
    <div style={{ marginTop: "100px" }}>
      <noscript>
        <h2>Sorry! Your browser doesn't support Javascript</h2>
      </noscript>

      <div id="username-page">
        <div class="username-page-container">
          <h1 class="title">Type your username</h1>
          <form
            id="usernameForm"
            name="usernameForm"
            onSubmit={(event) => connect(event)}
          >
            <div class="form-group">
              <input
                type="text"
                id="roomId"
                placeholder="roomId"
                autocomplete="off"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <button type="submit" class="accent username-submit">
                Start Chatting
              </button>
            </div>
          </form>
        </div>
      </div>

      <div id="chat-page" class="hidden">
        <div class="chat-container">
          <div class="chat-header">
            <h2>Spring WebSocket Chat Demo</h2>
          </div>
          <div class="connecting">Connecting...</div>
          <ul id="messageArea"></ul>
          <form
            id="messageForm"
            name="messageForm"
            onSubmit={(event) => sendMessage(event)}
          >
            <div class="form-group">
              <div class="input-group clearfix">
                <input
                  type="text"
                  id="message"
                  placeholder="Type a message..."
                  autocomplete="off"
                  class="form-control"
                />
                <button type="submit" class="primary">
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
