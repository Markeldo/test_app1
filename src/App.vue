<template>
  <div id="app">
    <div
      class="old-browser-message"
      ref="checkBrowser"
      v-show="!DropAvailable"
    >Your browser is too old. Really</div>
    <drop v-if="DropAvailable&&!listLoaded" />
    <list v-if="listLoaded"></list>
  </div>
</template>

<script>
import Drop from "./components/Drop";
import List from "./components/List";

export default {
  name: "App",
  components: {
    Drop,
    List
  },
  computed: {
    DropAvailable() {
      let div = document.createElement("div");
      return (
        ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
        "FormData" in window &&
        "FileReader" in window &&
        "Worker" in window
      );
    },
    listLoaded() {
      return (
        this.$store.state.filename && this.$store.state.filename.length > 0
      );
    }
  }
};
</script>

<style>
*,
html,
body,
div {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  min-width: 200px;
  height: 100vh;
  min-height: 200px;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
}
.old-browser-message {
  background: rgba(255, 100, 100, 0.4);
  padding: 10px;
  color: rgba(255, 100, 100, 0.9);
  margin: 10px;
}
.loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loader div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.loader div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
