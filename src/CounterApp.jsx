import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'

function CounterApp() {
  //count: 현재 또는 이전 상태 값; setCount(): 상태값 변경 함수
  const [count, setCount] = useState(0)
  function plusMax10(count) {
    if (count >= 10) return 10;
    return count + 1;
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount((count) => count + 1)}>+</button>
      <button onClick={() => setCount((count) => count + 2)}>+2</button>
      <button onClick={() => setCount((count) => count - 1)}>-</button>
      <button onClick={() => setCount(0)}>reset</button>
      <button onClick={() => setCount((count) => plusMax10(count))}>+(최대 10까지)</button>
      <button onClick={() => setCount((count) => count >= 10 ? 10 : count + 1)}>+(최대 10까지)</button>
      <button onClick={() => setCount((count) => count < 10 ? count + 1 : count)}>+(최대 10까지)</button>
      {/* <button onClick={setCount(0)}>reset</button> */}
      {/* <button
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button> */}
    </>
  )
}

export default CounterApp
