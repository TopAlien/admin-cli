<script setup>
  import { ref } from 'vue'
  import { Message, Notification } from '@arco-design/web-vue'
  import '@arco-design/web-vue/es/message/style/css.js'

  defineProps({
    msg: String
  })

  const count = ref(0)

  const handleMessage = () => {
    console.log('asadasd')
    Notification.info({
      title: 'Notification',
      content: 'This is a notification!'
    })

    Message.info({
      content: '提示一下'
    })
  }
</script>

<template>
  <h1>{{ msg }}</h1>
  <a-button type="primary" @click="handleMessage">asdasd</a-button>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code>
      to test HMR
    </p>
  </div>

  <p class="mt200px">
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>
    , the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
