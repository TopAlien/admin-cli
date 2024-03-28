<script setup>
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  
  const fsEnum = {
    all: { text: t('quan-bu'), status: 'normal' },
    open: {
      text: t('wei-jie-jue'),
      status: 'danger'
    },
    closed: {
      text: t('yi-jie-jue'),
      status: 'success'
    },
    processing: {
      text: t('jie-jue-zhong'),
      status: 'processing'
    }
  }

  const columns = [
    { no: t('ji-he-bian-hao') },
    { name: { title: t('ji-he-ming-cheng'), search: true, valueType: 'range-picker' } },
    { type: { title: t('nei-rong-ti-cai'), search: true } },
    {
      fs: {
        title: t('shai-xuan-fang-shi'),
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
        title: t('ce-shi-yin-cang'),
        search: true
      }
    },
    {
      action: {
        title: t('cao-zuo'),
        width: '180px',
        slotName: 'action',
        ellipsis: false
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
            no: t('a-sha-de-ka-shang-de-ha-ha'),
            name: 'ashdasd',
            type: t('tu-pian'),
            fs: 'all'
          },
          {
            id: 2,
            no: t('a-sha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-haasha-de-ka-shang-de-ha-ha'),
            name: 'ashdasd',
            type: t('tu-pian-0'),
            fs: 'closed'
          }
        ])
      }, 500)
    })
  }

  const actionRef = ref()

  window.addEventListener('storage', (evt) => {
    if (evt.key === 'reload') {
      console.log('更新一下')
    }
  })

  const handleView = () => {
    window.open('/postmessage?reload=true')
  }
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
      <a-button type="primary">{{ t('key6') }}</a-button>
    </template>
    <template #extraR>
      <a-button @click="actionRef.reload()">{{ t('key5') }}</a-button>
    </template>

    <template #action="{ record }">
      <a-button
        type="text"
        @click="handleView"
      >
        {{ t('key4') }}
      </a-button>
      <a-button type="text">{{ t('key3') }}</a-button>
      <a-button type="text">{{ t('key2') }}</a-button>
    </template>
  </pro-table>
</template>
