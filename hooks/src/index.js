import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

class Node {
  constructor() {
    this.value = undefined;
    this.next = null;
  }
}

let cursor = new Node();
const top = cursor;

function useState(initialState) {
  cursor.value = cursor.next === null ? initialState : cursor.value;
  let current = cursor;
  cursor.next = cursor.next === null ? new Node() : cursor.next;
  cursor = cursor.next;
  function setState(newState) {
    current.value = newState;
    render();
  }
  return [current.value, setState];
}

function selfUseEffect(callback, deps) {
  const hasNodeps = !deps;
  const lastDeps = cursor.value;
  const hasChanges = deps && deps.length ? deps.some((e, i) => e !== (lastDeps ? lastDeps[i] : undefined)) : false;
  if (hasNodeps || hasChanges || !lastDeps) {
    callback();
    cursor.value = deps;
  }
  if (cursor.next === null) {
    cursor.next = new Node();
  }
  cursor = cursor.next;
}

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(2);
  selfUseEffect(() => console.log(count), [count]);
  const [count3, setCount3] = useState(3);
  return (
    <div className="App">
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <div>{count2}</div>
      <button onClick={() => setCount2(count2 + 2)}>+2</button>
      <div>{count3}</div>
      <button onClick={() => setCount3(count3 + 3)}>+3</button>
    </div>
  );
}

function render() {
  cursor = top;
  ReactDOM.render(<App />, document.getElementById('root'));
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
