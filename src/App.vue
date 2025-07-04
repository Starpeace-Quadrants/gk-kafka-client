<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { protocolMessage } from '@/composable/message_protocol'
import { ref } from 'vue'

let feedback = ref('')

const callback = async (response) => {
  updateFeedback('Verifying token...')
  try {
    const res = await fetch('https://auth.localhost/google/verify', {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + response.credential,
        Accept: 'application/json'
      })
    })

    if (!res.ok) {
      updateFeedback(`Token verification failed with status ${res.status}`)
      return
    }

    const json = await res.json()
    updateFeedback('Token verified')
    begin(json.sessionId)
  } catch (err) {
    updateFeedback(`Token verification error: ${err}`)
  }
}

function begin(sessionId) {
  updateFeedback('Opening socket...')

  let socket
  try {
    socket = new WebSocket('wss://relay.localhost/ws')
  } catch (err) {
    updateFeedback(`Failed to create WebSocket: ${err}`)
    return
  }

  socket.onopen = function () {
    updateFeedback('Connection established')
    updateFeedback('Sending authentication to server')
    const optional = { sessionId: sessionId }
    socket.send(protocolMessage('authentication', 'authenticate', optional))
  }

  socket.onmessage = function (event) {
    updateFeedback(`Data received from server: ${event.data}`)
  }

  socket.onclose = function (event) {
    if (event.wasClean) {
      updateFeedback(`Connection closed cleanly, code=${event.code} reason=${event.reason}`)
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      updateFeedback('Connection died')
    }
  }

  socket.onerror = function (error) {
    updateFeedback(`WebSocket error: ${error}`)
  }
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
