import React, { Component } from "react";
import MyName from "./MyName";
import Counter from "./Counter";

class App extends Component {
  render() {
    return (
      <div>
        <p>
          <MyName
            name="리액트" // props.name을 MyName 컴포넌트로 넘겨줌
          />
        </p>
        <p>
          <Counter />
        </p>
      </div>
    );
  }
}

export default App;
