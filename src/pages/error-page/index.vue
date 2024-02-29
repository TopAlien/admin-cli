<script setup>
  const fsEnum = {
    all: { text: '全部', status: 'normal' },
    open: {
      text: '未解决',
      status: 'danger'
    },
    closed: {
      text: '已解决',
      status: 'success'
    },
    processing: {
      text: '解决中',
      status: 'processing'
    }
  }

  const columns = [
    { no: '集合编号' },
    { name: '集合名称' },
    { type: { title: '内容体裁', filter: true } },
    {
      fs: {
        title: '筛选方式',
        filter: true,
        valueType: 'select',
        initialValue: 'closed',
        slotName: 'fsSlot',
        valueEnum: fsEnum
      }
    },
    {
      extr: {
        hideInTable: true,
        title: '测试隐藏',
        filter: true
      }
    }
  ]

  const handleLoadData = (pagination, params) => {
    console.log(params)
    console.log(pagination)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            no: '啊啥的卡上的哈哈',
            name: 'ashdasd',
            type: '图片',
            fs: 'all'
          },
          {
            id: 2,
            no: '啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈',
            name: 'ashdasd',
            type: '图片',
            fs: 'closed'
          }
        ])
      }, 500)
    })
  }
</script>

<template>
  <pro-table
    :request="handleLoadData"
    :columns="columns"
  >
    <template #fsSlot="{ record }">
      <a-badge
        :status="fsEnum[record.fs].status"
        :text="fsEnum[record.fs].text"
      />
    </template>

    <template #extraL>
      <a-button type="primary">新建</a-button>
    </template>
    <template #extraR>
      <a-button>导出</a-button>
    </template>
  </pro-table>
</template>
