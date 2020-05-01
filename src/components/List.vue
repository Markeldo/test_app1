<template>
  <div class="list">
    <div class="list__filename">{{ filename }}</div>
    <ul class="list__ul">
      <list-item v-for="(user, index) in items" :key="index" :user="user" />
    </ul>
  </div>
</template>

<script>
import ListItem from "./ListItem";

export default {
  components: { ListItem },
  computed: {
    filename() {
      return this.$store.state.filename;
    },
    items() {
      return this.$store.state.list;
    }
  },
  mounted() {}
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