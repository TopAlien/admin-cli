import { ref } from 'vue'

function isUpdateFc(nextState) {
  return typeof nextState === "function";
}

// 感觉没啥用啊，不方便了反而
export default function useState(initialState) {
  const state = ref(initialState);

  // nextState: UnwrapRef<T> | UpdateFunction<T>
  const setState = (nextState) => {
    // 检测传入的是不是函数，如果是函数就把state传给函数，把函数执行返回值赋给重新state
    if (isUpdateFc(nextState)) {
      state.value = nextState(state.value);
    } else {
      state.value = nextState;
    }
  };
  return [state, setState];
}