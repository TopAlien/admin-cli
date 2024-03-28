# Vue 3 + Vite

## 其他功能参考[https://github.com/TopAlien/vue-admin](https://github.com/TopAlien/vue-admin)

### 1、vue3

### 2、vue-router4

### 3、arco-vue

### 4、pinia

### 5、unocss

## 1、新开tab数据通信（不同源）

```js
第一步：使用iframe侨接页面(开一个同源路由，使用iframe交互
)
iframe
子：window.parent.postMessage('data...', 'http://localhost:5173')
父: window.addEventListener('message', fn, false)

第二步: 使用同源storage通信方式
```

## 2、新开tab数据通信（同源）

```js
1、原页面
window.addEventListener('storage', (evt) => {
    if (evt.key === ' .... 自定义storage - Key') {
        console.log('更新一下')
    }
})

2、新打开的tab页面
localStorage.setItem('....自定义storage - Key', Date.now())
```
