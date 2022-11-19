<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {protocolMessage} from "@/composable/message_protocol";
import {ref} from "vue";

let feedback = ref('')

const callback = (response) => {
  updateFeedback("Verifying Token")
  updateFeedback(response.credential)
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  fetch('http://localhost:3000/google/verify', {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + response.credential,
      'Accept': 'application/json'
    })
  }).then(response => response.json())
      .then(json => begin(json.sessionId))
}

function begin(sessionId) {
  updateFeedback('Opening socket')

  let socket = new WebSocket("ws://localhost:8099/ws");
  console.log(socket)
  updateFeedback('Socket open')
  socket.onopen = function () {
    updateFeedback("Connection established");
    updateFeedback("Sending to server");
    let optional = {"sessionId": sessionId};
    socket.send(protocolMessage('authentication', 'authenticate', optional));
  };

  socket.onmessage = function (event) {
    updateFeedback(`Data received from server: ${event.data}`);
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      updateFeedback(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      updateFeedback('Connection died');
    }
  };

  socket.onerror = function (error) {
    updateFeedback(`${error.value}`);
  };
}

function updateFeedback(fb) {
  feedback.value = feedback.value + fb + '\n'
}
</script>

<template>
  <div>
    <HelloWorld msg="Websocket test client"/>
    <GoogleLogin :callback="callback"/>
    <div>
      <textarea id="debug-window" cols="100" rows="30" v-bind:value="feedback"></textarea>
    </div>
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
