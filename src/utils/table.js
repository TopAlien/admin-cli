import { ref, toValue } from 'vue'

/**
 *  const columns = setTableColumn([
 *     { no: '集合编号' },
 *     { name: '集合名称' },
 *     { type: '内容体裁' },
 *     { fs: '筛选方式' },
 *     { action: { title: '操作', width: '130px', ... } }
 *   ])
 *
 *   hideInTable: boolean || false
 *   search: boolean || false 是否处理为搜索项
 *   fieldProps: {}
 *   initialValue: null
 *   valueType: 'select' | 'input' || 'input'
 *
 *   valueEnum: interface ValueEnum {
 *   [key: string]: {
 *        text: string;
 *        status: 'danger' | 'normal' | 'success' | 'warning' ...
 *    };
 * }
 *
 *
 *
 * @param simpleArr
 */
const setTableColumn = (simpleArr = []) => {
  if (!simpleArr || !Array.isArray(simpleArr) || !simpleArr?.length) {
    return []
  }

  return simpleArr.map((it) => {
    const key = Object.keys(it)[0]
    const val = it[key]

    const baseConfig = {
      dataIndex: key,
      ellipsis: true,
      tooltip: true
    }

    return typeof val === 'string'
      ? {
          title: val,
          ...baseConfig
        }
      : {
          ...baseConfig,
          ...val
        }
  })
}

export const getColumns = (columns) => {
  const columnsAll = setTableColumn(columns)
  const tableColumns = columnsAll.filter((item) => !item.hideInTable)
  const queryFormColumn = columnsAll.filter((item) => item.search)

  return [tableColumns, queryFormColumn, columnsAll]
}

export const getHasInitialValueForm = (columns) => {
  const initialValueForm = {}
  columns.forEach((item) => {
    if (item.initialValue) {
      initialValueForm[item.dataIndex] = item.initialValue
    }
  })
  return initialValueForm
}

export const useTable = ({ request, queryForm, formRef }) => {
  const loading = ref(false)
  const list = ref([])
  const pagination = ref({ current: 1, pageSize: 10, total: 0 })

  const loadData = async () => {
    loading.value = true

    try {
      list.value = await (request && request(pagination.value, toValue(queryForm)))
    } finally {
      loading.value = false
    }

    pagination.value.total = 200000
  }

  const pageChange = (current) => {
    pagination.value.current = current
    loadData()
  }

  const reload = (pageSize) => {
    pagination.value.current = 1
    pagination.value.pageSize = pageSize || pagination.value.pageSize

    loadData()
  }

  const reset = () => {
    formRef.value && formRef.value.resetFields()
    reload()
  }

  loadData()

  return { loading, list, pagination, loadData, reset, pageChange, reload }
}
