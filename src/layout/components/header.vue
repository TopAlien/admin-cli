<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>

<template>
  <div class="header_box">{{ t('header') }}</div>
</template>

<style lang="less">
  .header_box {
    height: @header-height;
    line-height: @header-height;
    padding: 0 12px 0;
    box-sizing: border-box;
    text-align: right;
  }
</style>
