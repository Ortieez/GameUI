<script setup>
import { io } from "socket.io-client";

const URL = "http://localhost:3000";
const socket = io(URL, { 
  autoConnect: true
});

function test() {
  socket.emit("test", "test");
  console.log("yes")
}
</script>


<main>
  <button on:click={test}>
    test
  </button> 
</main>

<style>

</style>