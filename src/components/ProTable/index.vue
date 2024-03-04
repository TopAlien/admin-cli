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

  const [tableColumns, queryFormColumns] = getColumns(props.columns)

  const queryForm = ref(getHasInitialValueForm(queryFormColumns))

  const formRef = ref(null)

  const { loading, list, pagination, pageChange, reload, reset } = useTable(props.request, { formRef, queryForm })

  defineExpose({
    reset,
    reload
  })
</script>

<template>
  <SearchBox
    v-if="queryFormColumns.length"
    :title="$attrs.title"
    @search="reload"
    @reset="reset"
  >
    <a-form
      ref="formRef"
      :model="queryForm"
      layout="inline"
      :label-col="{ style: { width: '75px' } }"
      :wrapper-col-props="{ span: 18 }"
    >
      <a-row :gutter="16">
        <a-col
          :span="8"
          v-for="item in queryFormColumns"
          :key="item.dataIndex"
        >
          <a-form-item
            :label="item.title"
            :field="item.dataIndex"
          >
            <!--  input  -->
            <a-input
              v-if="!item.valueType || item.valueType === 'input'"
              v-model="queryForm[item.dataIndex]"
              v-bind="item.fieldProps"
              :placeholder="`请输入${item.title}`"
            />

            <!--  select  -->
            <a-select
              v-if="item.valueType === 'select'"
              v-model="queryForm[item.dataIndex]"
              v-bind="item.fieldProps"
              :placeholder="`请选择${item.title}`"
            >
              <a-option
                v-for="(value, key) in item.valueEnum"
                :value="key"
                :label="value.text"
              />
            </a-select>

            <a-range-picker
              v-if="item.valueType === 'range-picker'"
              disabled-input
              v-model="queryForm[item.dataIndex]"
              v-bind="item.fieldProps"
            />
          </a-form-item>
        </a-col>
      </a-row>
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
    @page-change="pageChange"
    @page-size-change="reload"
  >
    <template
      v-for="(_, key) in slots"
      :key="key"
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
