<script setup>
  import { ref } from 'vue'

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
    { name: { title: '集合名称', search: true, valueType: 'range-picker' } },
    { type: { title: '内容体裁', search: true } },
    {
      fs: {
        title: '筛选方式',
        search: true,
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
        search: true
      }
    }
  ]

  const loadData = (pagination, params) => {
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

  const actionRef = ref()
</script>

<template>
  <pro-table
    ref="actionRef"
    :request="loadData"
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
      <a-button @click="actionRef.reload()">手动刷新</a-button>
    </template>
  </pro-table>
</template>
