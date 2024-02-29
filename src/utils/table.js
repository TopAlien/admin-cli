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
 *   filter: boolean || false 是否处理为搜索项
 *   initialValue: null
 *   filterLabel: null
 *   filterField: null
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
  const queryFormColumn = columnsAll.filter((item) => item.filter)

  return [tableColumns, queryFormColumn, columnsAll]
}

export const getHasInitialValueForm = (columns) => {
  const initialValueForm = {}
  columns.forEach((item) => {
    if (item.initialValue) {
      initialValueForm[item.filterField || item.dataIndex] = item.initialValue
    }
  })
  return initialValueForm
}

export const useTable = ({ request, queryForm, formRef }) => {
  const loading = ref(false)
  const list = ref([])
  const pagination = ref({ current: 1, pageSize: 10, total: 0 })

  const tableLoad = async () => {
    loading.value = true

    try {
      list.value = await (request && request(pagination.value, toValue(queryForm)))
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

  const handleReset = () => {
    formRef.value && formRef.value.resetFields()
    handlePageSize(pagination.value.pageSize)
  }

  tableLoad()

  return { loading, list, pagination, tableLoad, handleReset, handlePageChange, handlePageSize }
}
