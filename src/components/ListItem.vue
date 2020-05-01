<template>
  <li class="item">
    <span class="item__name">{{ user }}</span>
    <span class="item__remove" @click="onRemove"></span>
  </li>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    onRemove() {
      this.$store.dispatch("removeUser", { user: this.user });
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px 6px 15px;
  border-top: 1px solid #ccc;
  &:first-child {
    border-top: 0;
  }

  &__name {
    text-align: left;
  }

  &__remove {
    cursor: pointer;
    height: 19px;
    position: relative;
    transition: 0.2s;
    box-shadow: 0 0 0 1px rgba(85, 85, 85, 0.15);
    border-radius: 9px;

    &:after,
    &:before {
      content: "";
      display: block;
      width: 18px;
      height: 0;
      border-bottom: 2px solid #999;
      transition: 0.2s;
      transform: translateY(9px) rotate(45deg) scale(0.4, 0.4);
    }
    &:before {
      position: absolute;
      transform: translateY(9px) rotate(-45deg) scale(0.4, 0.4);
    }
    &:hover {
      box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.3);
      &:after {
        border-color: red;
        transform: translateY(9px) rotate(45deg) scale(0.8, 0.8);
      }
      &:before {
        border-color: red;
        transform: translateY(9px) rotate(-45deg) scale(0.8, 0.8);
      }
    }
  }
}
</style>