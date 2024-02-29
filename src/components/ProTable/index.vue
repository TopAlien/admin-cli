<script setup>
  import { computed, ref } from 'vue'
  import SearchBox from '../SearchBox/index.vue'
  import { setTableColumn } from '@/utils/table.js'

  const slots = defineSlots()

  const props = defineProps({
    columns: {
      type: Array,
      default: () => []
    },
    load: {
      type: Function
    },
    params: {
      type: Object,
      default: () => {}
    }
  })
  const columns = computed(() => setTableColumn(props.columns))

  const loading = ref(false)
  const list = ref([])
  const pagination = ref({ current: 1, pageSize: 10, total: 0 })

  const tableLoad = async () => {
    loading.value = true

    try {
      list.value = await (props.load && props.load(pagination.value))
    } finally {
      loading.value = false
    }

    pagination.value.total = 200000
  }

  const handlePageChange = (current) => {
    pagination.value.current = current
    tableLoad()
  }

  const handlePageSize = (pageSize) => {
    pagination.value.current = 1
    pagination.value.pageSize = pageSize

    tableLoad()
  }

  tableLoad()

  const formRef = ref(null)
  const handleReset = () => {
    formRef.value && formRef.value.resetFields()
    handlePageSize(pagination.value.pageSize)
  }
</script>

<template>
  <SearchBox
    v-if="slots.filter"
    @search="handlePageSize(pagination.pageSize)"
    @reset="handleReset"
  >
    <a-form
      ref="formRef"
      :model="props.params"
    >
      <slot name="filter" />
    </a-form>
  </SearchBox>

  <div
    v-if="slots.extraL || slots.extraR"
    class="flex justify-between mb12px"
  >
    <a-space>
      <slot name="extraL"><span></span></slot>
    </a-space>
    <a-space>
      <slot name="extraR"><span></span></slot>
    </a-space>
  </div>

  <a-table
    v-bind="$attrs"
    :loading="loading"
    :data="list"
    :pagination="
      pagination.total
        ? {
            ...pagination,
            showJumper: true,
            showTotal: true,
            showPageSize: true
          }
        : false
    "
    :columns="columns"
    @page-change="handlePageChange"
    @page-size-change="handlePageSize"
  >
    <template
      v-for="(_, key, i) in slots"
      :key="i"
      v-slot:[key]="{ text, title, record, index, column, filtered, indent, expanded }"
    >
      <slot
        :name="key"
        v-bind="{
          text,
          title,
          record,
          index,
          column,
          filtered,
          indent,
          expanded
        }"
      />
    </template>
  </a-table>
</template>
