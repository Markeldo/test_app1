<template>
  <li class="item">
    <span class="item__name">{{ user }}</span>
    <span class="item__remove" @click="onRemove">❌</span>
  </li>
</template>

<script>

export default {
  props: ["user"],
 /* render: function (createElement) {
    return createElement(
      'li',   // имя тега
      {class : "item"},
      this.user // массив дочерних элементов
    )
  },*/
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
    border-radius: 9px;
    font-size: 10px;
    height: 19px;
    width: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      font-size: 12px;
    }
  }

  /*&__remove {
    cursor: pointer;
    height: 19px;
    position: relative;
    box-shadow: 0 0 0 1px rgba(85, 85, 85, 0.15);
    border-radius: 9px;

   /* &:after,
    &:before {
      content: "";
      display: block;
      width: 18px;
      height: 0;
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
  }*/
}
</style>