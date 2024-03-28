<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<template>
  <div class="footer_box">{{ t('key10') }}</div>
</template>

<style lang="less">
  .footer_box {
    height: @footer-height;
    line-height: @footer-height;
    text-align: center;
  }
</style>
