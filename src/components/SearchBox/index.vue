<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const emit = defineEmits(['search', 'reset'])
  const slots = defineSlots()

  const props = defineProps({
    title: {
      type: String,
      default: '查询表格'
    }
  })

  const handleSearch = () => {
    emit('search')
  }

  const handleReset = () => {
    emit('reset')
  }
</script>

<template>
  <div
    v-if="props.title"
    class="header_title"
  >
    {{ props.title }}
  </div>
  <div class="search_box">
    <div class="search_form flex-1">
      <slot />
    </div>

    <div class="right_btn">
      <a-space
        direction="vertical"
        :size="16"
      >
        <a-button
          type="primary"
          @click="handleSearch"
        >
          <template #icon>
            <i class="i-carbon-search inline-block v-sub" />
          </template>
          {{ t('key8') }}
        </a-button>
        <a-button @click="handleReset">
          <template #icon>
            <i class="i-carbon-reset inline-block v-sub" />
          </template>
          {{ t('key7') }}
        </a-button>
      </a-space>
    </div>
  </div>

  <div
    v-if="slots.extraL || slots.extraR"
    class="flex justify-between mb16px"
  >
    <a-space>
      <slot name="extraL"><span></span></slot>
    </a-space>
    <a-space>
      <slot name="extraR"><span></span></slot>
    </a-space>
  </div>
</template>

<style>
  .search_box {
    display: flex;
    border-bottom: 1px solid rgb(229, 230, 235);
    margin-bottom: 16px;
  }

  .right_btn {
    height: 80px;
    padding-left: 16px;
    margin-bottom: 16px;
    border-left: 1px solid rgb(229, 230, 235);
  }
</style>
