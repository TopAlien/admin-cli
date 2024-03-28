<script setup>
  import { useI18n } from 'vue-i18n';
  import { onMounted, ref } from 'vue'
  import useState from '../hooks'

  const { t, locale } = useI18n()

  const sayHello = t("message")

  let color = 'coral'
  const isDrawingMode = ref(false)
  // 初始化画布
  let canvas = null
  onMounted(() => {
    canvas = new fabric.Canvas('c', {
      width: 500,
      height: 500,
      backgroundColor: color,
      isDrawingMode: isDrawingMode.value
    })

    // 创建矩形
    let rect = new fabric.Rect({
      top: 20, // 距离画布顶部距离
      left: 30, // 距离画布左侧距离
      width: 60, // 矩形宽度
      height: 40, // 矩形高度
      fill: 'red'
    })
    // 将矩形添加到画布中
    canvas.add(rect)

    const text = new fabric.Text(t('hou-sai-lei'), { left: 95 })
    canvas.add(text)

    const text2 = new fabric.Text(t('wa-ka-ka'), {
      left: 50,
      top: 80
    })
    canvas.add(text2)

    const test3 = new fabric.IText(t('ke-bian-ji-wen-ben'), { top: 150 })
    canvas.add(test3)

    fabric.Image.fromURL('/public/vite.svg', (img) => {
      img.top = 200
      canvas.add(img)
    })
  })

  const toggle = () => {
    color = color === 'coral' ? 'deepskyblue' : 'coral'

    canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas))
  }

  const toggleDraw = () => {
    isDrawingMode.value = !canvas.isDrawingMode
    canvas.isDrawingMode = !canvas.isDrawingMode
  }

  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(true)

  const form = ref({})
  const formRef = ref(null)

  const handleSubmit = () => {}
</script>

<template>
  <h1>{{ sayHello }}</h1>
  <a-form
    ref="formRef"
    :model="form"
    @submit="handleSubmit"
    scroll-to-first-error
    auto-label-width
  >
    <a-form-item
      field="size"
      :label="t('form-size')"
      tooltip="这里是tooltip"
      help="这里是help"
      validate-status="success"
      extra="这里是额外显示的文案"
    >
      <a-radio-group
        v-model="form.size"
        type="button"
      >
        <a-radio value="mini">{{ t('mini') }}</a-radio>
        <a-radio value="small">{{ t('small') }}</a-radio>
        <a-radio value="medium">{{ t('medium') }}</a-radio>
        <a-radio value="large">{{ t('large') }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      field="name"
      :label="t('username')"
      :rules="[
        { required: true, message: 'name is required' },
        { minLength: 5, message: 'must be greater than 5 characters' }
      ]"
      :validate-trigger="['change', 'input']"
    >
      <a-input
        v-model="form.name"
        :placeholder="t('pleaseEnterYourUsername')"
      />
    </a-form-item>
    <a-form-item
      field="age"
      :label="t('age')"
      :rules="[
        { required: true, message: 'age is required' },
        { type: 'number', max: 200, message: 'age is max than 200' }
      ]"
    >
      <a-input-number
        v-model="form.age"
        :placeholder="t('pleaseEnterYourAge')"
      />
    </a-form-item>
    <a-form-item
      field="section"
      :label="t('section')"
      :rules="[{ match: /section one/, message: 'must select one' }]"
    >
      <a-select
        v-model="form.section"
        :placeholder="t('pleaseSelect')"
        allow-clear
      >
        <a-option value="section one">{{ t('sectionOne') }}</a-option>
        <a-option value="section two">{{ t('sectionTwo') }}</a-option>
        <a-option value="section three">{{ t('sectionThree') }}</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="province"
      :label="t('province')"
      :rules="[{ required: true, message: 'province is required' }]"
    >
      <a-cascader
        v-model="form.province"
        :options="options"
        :placeholder="t('pleaseSelect')"
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="options"
      :label="t('options')"
      :rules="[{ type: 'array', minLength: 2, message: 'must select greater than two options' }]"
    >
      <a-checkbox-group v-model="form.options">
        <a-checkbox value="option one">{{ t('sectionOne') }}</a-checkbox>
        <a-checkbox value="option two">{{ t('optionTwo') }}</a-checkbox>
        <a-checkbox value="option three">{{ t('optionThree') }}</a-checkbox>
        <a-checkbox value="option four">{{ t('optionFour') }}</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item
      field="date"
      :label="t('date')"
    >
      <a-date-picker
        v-model="form.date"
        :placeholder="t('pleaseSelect')"
      />
    </a-form-item>
    <a-form-item
      field="time"
      :label="t('time')"
    >
      <a-time-picker
        v-model="form.time"
        :placeholder="t('pleaseSelect')"
      />
    </a-form-item>
    <a-form-item
      field="radio"
      :label="t('radio')"
      :rules="[{ match: /one/, message: 'must select one' }]"
    >
      <a-radio-group v-model="form.radio">
        <a-radio value="radio one">{{ t('radioOne') }}</a-radio>
        <a-radio value="radio two">{{ t('radioTwo') }}</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      field="slider"
      :label="t('slider')"
      :rules="[{ type: 'number', min: 5, message: 'slider is min than 5' }]"
    >
      <a-slider
        v-model="form.slider"
        :max="10"
      />
    </a-form-item>
    <a-form-item
      field="score"
      :label="t('score')"
    >
      <a-rate
        v-model="form.score"
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="switch"
      :label="t('switch')"
      :rules="[{ type: 'boolean', true: true, message: 'must be true' }]"
    >
      <a-switch v-model="form.switch" />
    </a-form-item>
    <a-form-item
      field="multiSelect"
      :label="t('multipleSelect')"
    >
      <a-select
        v-model="form.multiSelect"
        :placeholder="t('pleaseSelect')"
        multiple
      >
        <a-option value="section one">{{ t('sectionOne') }}</a-option>
        <a-option value="section two">{{ t('sectionTwo') }}</a-option>
        <a-option value="section three">{{ t('sectionThree') }}</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="treeSelect"
      :label="t('treeSelect')"

    >
      <a-tree-select
        :data="treeData"
        v-model="form.treeSelect"
        :placeholder="t('pleaseSelect')"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button html-type="submit">{{ t('submit') }}</a-button>
        <a-button @click="formRef.resetFields()">{{ t('reset') }}</a-button>
      </a-space>
    </a-form-item>
  </a-form>

  <a-button @click="setCount((n) => n + 1)">count++</a-button>
  <h3>{{ count }}</h3>

  <a-button @click="setFlag((t) => !t)">{{ flag }}</a-button>

  <a-button
    type="primary"
    @click="toggle"
  >
    {{ t('qie-huan-yan-se') }}
  </a-button>

  <a-button
    type="primary"
    @click="toggleDraw"
  >
    {{ t('key', {expr: isDrawingMode ? t('close') : t('open')}) }}
  </a-button>

  <canvas
    id="c"
    style="border: 1px solid #ccc"
  />
</template>