<template>
  <div class="list">
    <div class="list__filename">{{ filename }}</div>
    <div class="list__rendering">{{ status }}</div>
    <div class="list__ul" v-if="items.length > 0">
      <!--div class="item" v-for="(user, index) in items" :key="index">
         <span class="item__name">{{ user }}</span>
         <span class="item__remove" @click="onRemove(user)"></span>
      </div-->
      <!--div v-for="(list, i) in items" :key="i"-->
        <list-item v-for="(user, index) in items" :key="index" :user="user"/>
      <!--/div-->
    </div>
  </div>
</template>

<script>
//import Vue from 'vue'
import ListItem from "./ListItem";

export default {
  components: { ListItem },
  computed: {
    status() {
      return this.$store.state.status;
    },
    filename() {
      return this.$store.state.filename;
    },
    items() {
      return this.$store.state.list;
      /*return Object.freeze(Vue.util.extend([], this.$store.state.list));*/
    }
  },
  methods: {
    onRemove(user) {
      this.$store.dispatch("removeUser", { user: user });
    }
  },
  beforeUpdate() {
    console.log('beforeUpdate ' + new Date());
  },
  updated() {
    console.log('updated ' + new Date());
  }
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  min-width: 250px;
  align-items: stretch;
  &__filename {
    padding: 12px 15px;
    text-align: center;
    font-weight: bold;
  }
  &__rendering {
    text-align: center;
  }

  &__ul {
    list-style: none;;
    padding: 0;
    margin: 0;
    max-height: 300px;
    overflow: auto;
    border: 1px solid #ccc;
  }
}

</style>