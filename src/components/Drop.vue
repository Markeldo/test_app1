<template>
  <div class="drop-area">
    <form class="drop-form" ref="form">
      Drop file here
      <!--input type="file"-->
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resultArray: []
    };
  },
  mounted() {
    var self = this;
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
      let fileName = e.dataTransfer.files[0].name;
      reader.onload = function() {
        let result = JSON.parse(reader.result);
        self.proceedObj(result);
        self.resultArray.sort(function(a, b) {
          if (a.toLowerCase() > b.toLowerCase()) {
            return 1;
          }
          if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        self.$store.dispatch("updateStore", {
          incoming: self.resultArray,
          filename: fileName
        });
      };
    });
  },
  methods: {
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

      /*console.log(arr);
      let incoming = arr;
      if (incoming.user) {
        context.commit('addUser', incoming.user);
      }
      if (payload.filename) {
        context.commit('setFilename', { filename: payload.filename })
      }
      if (incoming.replies && incoming.replies.length > 0) {
        incoming.replies.forEach((item) => {
          context.dispatch('updateStore', { incoming: item });
        });
      }*/
    }
  }
};
</script>

<style lang="less" scoped>
.drop-form {
  background: #ccc;
  min-height: 150px;
  min-width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  &--hovered {
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
  }
}
</style>