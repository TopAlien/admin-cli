<script setup>
  import Menu from './components/menu.vue'
  import Header from './components/header.vue'
  import Footer from './components/footer.vue'
</script>

<template>
  <a-layout>
    <Header />
    <div class="flex">
      <Menu />
      <div class="content">
        <a-scrollbar class="content_scroll">
          <router-view />
        </a-scrollbar>
        <a-layout-footer>
          <Footer />
        </a-layout-footer>
      </div>
    </div>
  </a-layout>
</template>

<style lang="less">
  .content {
    background-color: var(--color-fill-2);
    padding: 12px 12px 0;
    box-sizing: border-box;
    overflow: hidden;
  }

  .content_scroll {
    height: calc(100vh - @header-height - @footer-height - 12px);
    padding: 12px;
    overflow: auto;
    box-sizing: border-box;
    background-color: white;
    border-radius: 4px;
  }
</style>
