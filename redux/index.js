const compose = (...funcs) => [...funcs].reduce((a, b) => (...args) => a(b(...args)));
const appleMiddleWares = (...middlewares) => store => dispatch => {
  const chain = middlewares.map(middleware => middleware(store));
  return compose(...chain)(dispatch);
}

const createStore = (reducer, initialState = {}, enhancer) => {
  let state = initialState;
  const listeners = [];

  const subscribe = (listener) => listeners.push(listener);
  let dispatch = (action) => {
    state = reducer(state, action);
    for (let listener of listeners) {
      listener();
    }
  }
  const getState = () => state;
  dispatch = enhancer({ getState })(dispatch);
  // 初始化
  dispatch({
    type: Symbol()
  });
  return {
    subscribe,
    dispatch,
    getState
  }
}

const combineReducers = (reducers) => {
  return (state, action) => {
    return Object.keys(reducers)
      .map(key => [key, reducers[key]])
      .reduce((prev, [key, reducer]) => {
        prev[key] = reducer(state[key], action);
        return prev;
      }, {});
  }
}

const logMiddleware = (simpleStore) => (dispatch) => (action) => {
  console.log("current:", simpleStore.getState());
  console.log("action:", action);
  dispatch(action);
  console.log("next", simpleStore.getState());
}

const timeMiddleware = (simpleStore) => (dispatch) => (action) => {
  console.log("time:", new Date().getTime());
  dispatch(action);
}

const counterInitState = {
  count: 0
};

const counterReducer = (state = counterInitState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}

const infoInitState = {
  name: "hahaha",
  description: "lalala"
}

const infoReducer = (state = infoInitState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}

const reducer = combineReducers({
  counter: counterReducer,
  info: infoReducer
});

let store = createStore(reducer, {}, appleMiddleWares(timeMiddleware, logMiddleware));

/*自增*/
store.dispatch({
  type: 'INCREMENT'
});
// /*自减*/
// store.dispatch({
//   type: 'DECREMENT'
// });
// /*修改 name*/
// store.dispatch({
//   type: 'SET_NAME',
//   name: '前端九部2号'
// });