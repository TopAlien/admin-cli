<script setup>
  import { ref } from 'vue'

  const menus = [
    {
      id: '0',
      title: '用户管理',
      icon: 'i-carbon-3d-curve-auto-vessels',
      children: [
        {
          id: '0_0',
          title: '权限列表'
        },
        {
          id: '0_1',
          title: '人员列表'
        },
        {
          id: '0_2',
          title: '会员列表',
          disabled: true
        },
        {
          id: '0_3',
          title: '职级列表',
          disabled: true
        },
        {
          id: '0_4',
          title: '薪资列表'
        }
      ]
    }
  ]

  const selectedKeys = ref(['0_0'])
</script>
<template>
  <a-menu
    showCollapseButton
    class="cus_menu"
    v-model:selected-keys="selectedKeys"
    auto-open-selected
  >
    <a-sub-menu
      v-for="menu in menus"
      :key="menu.id"
    >
      <template #icon>
        <div :class="menu.icon"></div>
      </template>
      <template #title>{{ menu.title }}</template>
      <a-menu-item
        v-for="child in menu.children"
        :key="child.id"
        v-bind="child"
      >
        {{ child.title }}
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>

<style lang="less">
  .cus_menu {
    height: calc(100vh - @header-height);

    & .arco-menu-inner {
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
</style>
