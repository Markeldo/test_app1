<template>
  <div class="drop-area">
    <form class="drop-form" ref="form">
      Drop file here
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resultArray: [],
      worker : new Worker('/workers/parseObj.js')
    };
  },
  mounted() {
    var self = this;
    self.worker.addEventListener('message', function(e) {
      console.log('asdasdasdasdasd');
      console.log(new Date());
      self.$store.dispatch("updateStore", {
          incoming: e.data,
        });
    }, false);

    [
      "drag",
      "dragstart",
      "dragend",
      "dragover",
      "dragenter",
      "dragleave",
      "drop"
    ].forEach(event => {
      this.$refs.form.addEventListener(event, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    this.$refs.form.addEventListener("dragover", function() {
      this.classList.add("drop-form--hovered");
    });
    this.$refs.form.addEventListener("dragleave", function() {
      this.classList.remove("drop-form--hovered");
    });
    this.$refs.form.addEventListener("drop", function(e) {
      this.classList.remove("drop-form--hovered");
      let reader = new FileReader();
      reader.readAsText(e.dataTransfer.files[0]);
      self.$store.dispatch("updateStore", {
          filename: e.dataTransfer.files[0].name
        });
      reader.onload = function() {
        self.worker.postMessage({ str : reader.result});
      };
    });
  },
  methods: {
    parseObj(obj) {
      let queue = [];
      let resultArray = [];
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          queue.push(obj[i]);
        }
      } else {
        queue.push(obj);
      }

      while (queue.length > 0) {
        let tmpNode = queue.shift();
        if (resultArray.indexOf(tmpNode.user) === -1) {
          resultArray.push(tmpNode.user);
        }
        if (tmpNode.replies) {
          for (let i = 0; i < tmpNode.replies.length; i++) {
            queue.push(tmpNode.replies.shift());
          }
        }
      }

      return resultArray;
    },
    proceedObj(obj) {
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          this.proceedObj(obj[i]);
        }
        return;
      }
      if (obj.user) {
        if (this.resultArray.indexOf(obj.user) === -1) {
          this.resultArray.push(obj.user);
        }
      }
      if (obj.replies && obj.replies.length > 0) {
        for (let i = 0; i < obj.replies.length; i++) {
          this.proceedObj(obj.replies[i]);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.drop-form {
  background: #ccc;
  height: 150px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #999;
  }
  &--hovered {
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
  }
}
.loader {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>