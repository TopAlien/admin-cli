<script setup>
const menus = [
  {
    id: "0",
    title: "Navigation 1",
    icon: "i-carbon-3d-curve-auto-vessels",
    children: [
      {
        id: "0_0",
        title: "Menu 1",
      },
      {
        id: "0_1",
        title: "Menu 2",
      },
      {
        id: "0_2",
        title: "Menu 3",
        disabled: true,
      },
      {
        id: "0_3",
        title: "Menu 4",
        disabled: true,
      },
      {
        id: "0_4",
        title: "Menu 5",
      },
    ],
  },
];
</script>
<template>
  <a-menu showCollapseButton class="cus_menu">
    <a-sub-menu v-for="menu in menus" :key="menu.id">
      <template #icon>
        <div :class="menu.icon"></div>
      </template>
      <template #title>{{ menu.title }}</template>
      <a-menu-item v-for="child in menu.children" :key="child.id" v-bind="child"
        >{{ child.title }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<style lang="less">
.cus_menu {
  width: @menu-width;
  height: calc(100vh - @header-height);

  & .arco-menu-inner {
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
