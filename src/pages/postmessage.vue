<template>
  <div>{{ t('key11') }}</div>
  <iframe
    src="http://localhost:9528/#/marketing/multipleOrder/orderForm?type=add"
    width="100%"
    height="600px"
  />
  <a-button
    type="primary"
    @click="reload"
  >
    {{ t('key9') }}
  </a-button>
</template>

<script setup>
  // iframe 子： window.parent.postMessage('ealiwn', 'http://localhost:5173')
  // 父: window.addEventListener('message', fn, false)

  window.addEventListener(
    'message',
    (evt) => {
      console.log(evt)
      console.log('有新的消息')
      localStorage.setItem('reload', Date.now())
    },
    false
  )

  const reload = () => {
    console.log('asdasd')
    localStorage.setItem('reload', Date.now())
  }
</script>
