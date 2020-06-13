<template>
  <div id="terminal">
    <div class="terminal-window">
      <div class="terminal-bar">
        <div class="text-left">
          <span>Console</span>
          <span v-if="$store.state.socket.isConnected">✅</span>
          <span v-if="!$store.state.socket.isConnected">❌</span>
        </div>
      </div>
      <div class="terminal-body">
        <input
          class="command text-input"
          @keyup.enter="sendCommand"
          @keyup.up="rememberCommand"
          @keyup.down="rememberCommand"
          v-model="command"
          autofocus="true"
          type="text"
        />
        <textarea
          disabled="true"
          class="console text-input"
          readonly="true"
          wrap="hard"
          v-model="getHistoryData"
        />
        <div>
          <button
            class="connect pulse"
            v-on:click="connectClient"
            :disabled="$store.state.socket.isConnected"
          >Connect</button>
          <button
            class="disconnect pulse"
            v-on:click="disconnectClient"
            :disabled="!$store.state.socket.isConnected"
          >Disconnect</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InterfaceCLI",
  data() {
    return {
      command: null,
      lastResponse: "",
      commandHistory: [],
      cursor: 0,
      lastCommand: null
    };
  },
  props: {},
  sockets: {
    connect() {
      console.log("Socket connected");
      this.createListener();
    },
    customEmit(val) {
      console.log("Emit: ", val);
    },
    disconnect() {
      console.log("Socket disconnected");
    }
  },
  methods: {
    connectClient: function() {
      if (this.$socket.client.disconnected) {
        this.command = "connecting...";
        setTimeout(() => {
          this.$socket.client.connect();
          this.command = "";
        }, 2000);
      }
    },
    disconnectClient: function() {
      if (this.$socket.client.connected) {
        this.$socket.client.disconnect();
        console.log("diconnect action");
      }
    },
    createListener: function() {
      this.$options.sockets.onmessage = data => {
        console.log("Listened: ", data);
      };
    },
    rememberCommand: function(e) {
      if (this.cursor === 0 && this.commandHistory.length === 1) {
        this.command = this.commandHistory[0];
        return;
      }
      if (e.keyCode === 38) {
        if (this.cursor > 0) {
          this.cursor--;
        }
        this.command = this.commandHistory[this.cursor];
      } else if (e.keyCode === 40 && this.commandHistory.length > 0) {
        if (this.cursor < this.commandHistory.length - 1) {
          this.cursor++;
        }
        this.command = this.commandHistory[this.cursor];
      }
    },
    sendBySocket: function(command) {
      let options = command.replace("  ", " ");
      options = options.split(" ");
      this.$socket.client.emit("chat_message", options);
      this.$store.dispatch("saveHistoryData", `\r\n${command}`);
      this.lastCommand = command;
      this.command = null;
    },
    sendCommand: function(e) {
      if (e.keyCode === 13) {
        this.commandHistory.push(this.command);
        if (this.$store.state.socket.isConnected) {
          if (!this.continue(this.command)) {
            return;
          }
          this.sendBySocket(this.command);
        } else {
          alert("Not connected");
        }
      }
    },
    getSocketData: function() {
      this.lastResponse = this.$store.getters.getSocketData;
    },
    continue: function(command) {
      // if (this.lastCommand === "clear") {
      //   this.$store.dispatch("deleteHistoryData");
      //   this.command = "";
      //   this.$store.dispatch(
      //       "saveHistoryData",
      //       ""
      //     );
      //   return;
      // }
      if (this.lastCommand && this.lastCommand === "sspe list") {
        const pattern = new RegExp(`(?<=${command}:\\s)(.*?).*`, "g");
        this.command = `sspe select --path ${this.lastResponse.match(pattern)}`;
        if (this.command.includes("CANCEL")) {
          this.$store.dispatch(
            "saveHistoryData",
            `\r\nThe action was canceled!`
          );
          return false;
        } else if (command.includes("sspe ml --iter")) {
          this.$store.dispatch(
            "saveHistoryData",
            `\r\n¿You want to run the network training? y/n`
          );
          return true;
        }
        return true;
      } else if (
        this.lastCommand &&
        this.lastCommand.includes("sspe ml --iter")
      ) {
        if (command.toLowerCase() === "y") {
          this.command = this.lastCommand;
        } else {
          this.$store.dispatch(
            "saveHistoryData",
            `\r\nOkay, don´t panic, nothing´s gonna happen.`
          );
        }
      }
      return true;
    }
  },
  mounted() {
    this.connectClient();
  },
  computed: {
    getHistoryData() {
      this.getSocketData();
      return this.$store.getters.getHistoryData;
    }
  }
};
</script>

<style scoped >
#terminal {
  min-height: 55vh;
  max-width: 60%;
  margin: 0 auto;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 5px;
  background: #1d1f21;
  box-shadow: 0px 13px 17px -6px rgba(0, 0, 0, 0.38);
  margin-bottom: 50px;
}
#terminal:hover {
  transform: translate3d(0, -10px, 0);
  box-shadow: 0px 38px 90px -38px rgba(0, 0, 0, 0.45);
}
.terminal-window {
  border-radius: 5px;
  color: #111;
}
.terminal-bar {
  background: rgba(225, 225, 225, 0.75);
  height: 35px;
  line-height: 36px;
  padding-left: 4px;
  padding-top: 1px;
}
.terminal-body {
  text-align: center;
  padding: 8px 8px 0 8px;
  color: #eee;
  line-height: 25px;
  font-family: monospace, Quicksand, sans-serif;
  display: grid;
}
.command {
  color: rgb(14, 216, 31);
  background-color: #1d1f21;
  height: 30px;
  font-size: 18px;
}
.console {
  color: #fff;
  background-color: #1d1f21;
  height: 45vh;
  margin-top: 5px;
  resize: none;
}
.text-input {
  border-width: 0;
  display: block;
  margin-bottom: 5px;
}
button {
  background: none;
  border: 2px solid;
  font: inherit;
  line-height: 1;
  margin: 0.5em;
  padding: 1em 1em;
  width: 115px;
}
.connect {
  color: #8fc866;
}
.disconnect {
  color: #ff7f82;
}
button:hover,
button:focus {
  border-color: var(--hover);
  color: #fff;
}
.pulse:hover,
.pulse:focus {
  animation: pulse 1s;
  box-shadow: 0 0 0 2em rgba(#fff, 0);
}
</style>
