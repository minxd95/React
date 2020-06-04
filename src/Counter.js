import React, { useState } from "react";

function Counter(props) {
  const [numState, setNumState] = useState({ number: 0 });
  function handleIncrease() {
    setNumState({ number: numState.number + 1 });
  }
  function handleDecrease() {
    setNumState({ number: numState.number - 1 });
  }
  return (
    <div>
      <h1>카운터</h1>
      <div>값: {numState.number}</div>
      <button onClick={handleIncrease}>+</button>
      <button onClick={handleDecrease}>-</button>
    </div>
  );
}

export default Counter;
