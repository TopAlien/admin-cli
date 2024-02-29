<script setup>
  import { ref } from 'vue'
  import SearchBox from '../SearchBox/index.vue'
  import { getColumns, getHasInitialValueForm, useTable } from '@/utils/table.js'

  const slots = defineSlots()

  const props = defineProps({
    columns: {
      type: Array,
      default: () => []
    },
    request: {
      type: Function
    }
  })

  const [tableColumns, queryFormColumn] = getColumns(props.columns)

  const queryForm = ref(getHasInitialValueForm(queryFormColumn))

  const formRef = ref(null)

  const { loading, list, pagination, handleReset, handlePageChange, handlePageSize } = useTable({
    request: props.request,
    formRef,
    queryForm
  })
</script>

<template>
  <SearchBox
    v-if="queryFormColumn.length"
    @search="handlePageSize(pagination.pageSize)"
    @reset="handleReset"
  >
    <a-form
      ref="formRef"
      :model="queryForm"
    >
      <a-form-item
        v-for="item in queryFormColumn"
        :key="item.dataIndex"
        :label="item.filterLabel || item.title"
        :field="item.filterField || item.dataIndex"
      >
        <!--  input  -->
        <a-input
          v-if="!item.valueType || item.valueType === 'input'"
          v-model="queryForm[item.filterField || item.dataIndex]"
          :placeholder="`请输入${item.filterLabel || item.title}`"
        />

        <!--  select  -->
        <a-select
          v-if="item.valueType === 'select'"
          v-model="queryForm[item.filterField || item.dataIndex]"
          :placeholder="`请选择${item.filterLabel || item.title}`"
        >
          <a-option
            v-for="(value, key) in item.valueEnum"
            :value="key"
            :label="value.text"
          />
        </a-select>
      </a-form-item>
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
    :columns="tableColumns"
    @page-change="handlePageChange"
    @page-size-change="handlePageSize"
  >
    <template
      v-for="(_, key, i) in slots"
      :key="i"
      v-slot:[key]="{ record, rowIndex, column, expanded }"
    >
      <slot
        :name="key"
        v-bind="{
          record,
          rowIndex,
          column,
          expanded
        }"
      />
    </template>
  </a-table>
</template>
