<script setup>
  import { ref } from 'vue'
  const columns = [{ no: '集合编号' }, { name: '集合名称' }, { type: '内容体裁' }, { fs: '筛选方式' }]

  const form = ref({ name: 'ealien' })
  const handleLoadData = (pagination) => {
    console.log(form.value)
    console.log(pagination)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            no: '啊啥的卡上的哈哈',
            name: 'ashdasd',
            type: '图片',
            fs: '全局'
          },
          {
            id: 2,
            no: '啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈啊啥的卡上的哈哈',
            name: 'ashdasd',
            type: '图片',
            fs: '全局'
          }
        ])
      }, 500)
    })
  }
</script>

<template>
  <pro-table
    v-model:params="form"
    :columns="columns"
    :load="handleLoadData"
  >
    <template #filter>
      <a-form-item
        label="姓名"
        field="name"
      >
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item
        label="年龄"
        field="age"
      >
        <a-input v-model="form.age" />
      </a-form-item>
    </template>
    <template #extraL>
      <a-button type="primary">新建</a-button>
    </template>
    <template #extraR>
      <a-button>导出</a-button>
    </template>
  </pro-table>
</template>
