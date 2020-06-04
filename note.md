# 1일차

## CRA을 통한 프로젝트 생성

```
npx create-react-app my-app
cd my-app
npm start (or yarn start)
```

### npm이 아닌 npx를 사용하는 이유 :

npm을 이용해 전역 설치를 할 경우 최신버전으로 업그레이드를 수동으로 해줘야 한다. 특히 React는 업데이트가 매우 빈번하기 때문에 npm으로 설치할 경우 버전관리가 어렵다.  
하지만 npx는 최신버전의 CRA를 일시적으로 설치 후 실행한 다음 바로 삭제시키기 때문에 CRA에 대한 버전 관리를 할 필요성이 없어진다.

---

## JSX 문법

1.  열린 태그는 반드시 닫아줘야 함 ex) br, input 등을 포함한 모든 태그

2.  두 개 이상의 엘리먼트는 반드시 하나의 엘리먼트로 감싸져야 함

    ```javascript
    <div>
        <div>
            Hello
        </div>
        <div>
            Bye
        </div>
    </div> { /* 또는 <Fragment></Fragment>를 사용*/ }
    ```

3.  자바스크립트의 값을 사용하고 싶을 때에는 {} 사용

    ```javascript
    <div>{name}, hello!</div>
    ```

4.  조건부 렌더링

    - 삼항연산자 사용 (true, false 둘 다 동작)

      ```javascript
      <div>{1 + 1 === 2 ? <div>맞아요!</div> : <div>틀려요!</div>}</div>
      ```

    - AND 연산자 사용 (true 일때만 동작)

      ```javascript
      <div>{1 + 1 === 2 && <div>맞아요!</div>}</div>
      ```

    - 복잡한 조건 (IIFE(즉시실행함수) 사용)

      ```javascript
      <div>
        {(function () {
          if (value === 1) return <div>하나</div>;
          if (value === 2) return <div>둘</div>;
          if (value === 3) return <div>셋</div>;
        })()}
      </div>
      ```

5.  Style은 객체로 표현

    ```javascript
    const style = {
      backgroundColor: "black",
      padding: "16px",
      color: "white",
      fontSize: "12px",
    };

    return <div style={style}>hi there</div>;
    ```

6.  HTML에서의 class 속성은 className으로

    ```javascript
    <div className="App">리액트</div>
    ```

7.  주석

    ```javascript
    <div>
      {/* 주석은 이렇게 */}
      <h1
      // 태그 사이에
      >
        리액트
      </h1>
    </div>
    ```

# 2일차

리액트에서 다루는 데이터는 <b>props</b>와 <b>state</b>가 있다.

## props

부모 컴포넌트가 자식 컴포넌트에게 주는 값.

자식 컴포넌트에서는 props 수정 불가.

```javascript
// MyName.js
import React, { Component } from "react";

class MyName extends Component {
  render() {
    return <div>안녕하세요! 제 이름은 {this.props.name} 입니다.</div>;
    // this.props을 통해 props 값 참조
  }
}

export default MyName;
```

```javascript
// App.js
import React, { Component } from "react";
import MyName from "./MyName";

class App extends Component {
  render() {
    return <MyName name="리액트" />; // props.name을 MyName 컴포넌트로 넘겨줌
  }
}

export default App;
```

실행결과

```
안녕하세요! 제 이름은 리액트 입니다.
```

## defaultProps

부모 컴포넌트에서 실수로 props를 빼먹거나 일부로 비워야 할 때 사용되는 기본 props 값

```javascript
import React, { Component } from "react";

class MyName extends Component {
  // static으로 정의
  static defaultProps = {
    name: "기본 이름",
  };
  render() {
    return <div>안녕하세요! 제 이름은 {this.props.name} 입니다.</div>;
  }
}

export default MyName;
```

또는 아래와 같이 클래스 밖에 정의할 수도 있다.

```javascript
import React, { Component } from "react";

class MyName extends Component {
  render() {
    return <div>안녕하세요! 제 이름은 {this.props.name} 입니다.</div>;
  }
}

MyName.defaultProps = {
  name: "기본 이름",
};

export default MyName;
```

함수형 컴포넌트의 경우 아래와 같이 사용

```javascript
import React from "react";

function MyName({ name }) {
  // 중괄호 안에 props의 이름을 적어서 인자로 받는다.
  return <div>안녕하세요! 제 이름은 {name} 입니다.</div>;
}

export default MyName;
```

## state

### Class형 컴포넌트에서의 state

```javascript
import React, { Component } from "react";

class Counter extends Component {
  // state 최초값 선언
  state = {
    number: 0,
  };

  // Arrow Function을 이용해야 render에서 이벤트 처리시 this가 정상 작동
  handleIncrease = () => {
    // setState 함수를 통한 state값 변경 (merge 방식)
    this.setState({
      number: this.state.number + 1,
    });
  };

  handleDecrease = () => {
    this.setState({
      number: this.state.number - 1,
    });
  };

  render() {
    return (
      <div>
        <h1>카운터</h1>
        <div>값: {this.state.number}</div>
        <button onClick={this.handleIncrease}>+</button>
        <button onClick={this.handleDecrease}>-</button>
      </div>
    );
  }
}

export default Counter;
```

클래스형 컴포넌트에서 사용하는 setState()는 기존 state와 병합(merge) 한다.

(다른말로 하자면 바뀐부분만 교체하고 나머지는 유지한다.)

### 함수형 컴포넌트에서의 state

<u>여기서부터느 함수형 컴포넌트를 '주'로 공부함..(클래스 공부후 클래스형도)</u>

```javascript
// 위 코드의 함수형 컴포넌트 버전
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
```

- 함수형 컴포넌트에서는 useState를 이용하여 state를 관리한다.
- useState함수는 *인자로 전달된 state*와 *해당 state를 변경시키는 함수*를 길이 2의 배열에 한 칸씩 각각 담아 리턴한다.
- useState은 클래스형 컴포넌트의 setState과는 다르게 대치(replace)방식을 사용한다. 즉, 리턴된 함수로 state를 변경하면 기존의 state는 모두 날라간다. 여기서, 변경할 필요가 없는 state 요소도 매번 같이 넣어줘야 한다는 이슈가 생기는데, 이를 해결하기 위한 방법으로 useState를 여러 번 사용하여 state를 나눠서 관리하는 방법이 있다. (아래 코드 참초)

```javascript
import React, { useState } from "react"; // 함수형 컴포넌트에서는 Component 대신 useState를 임포트

function Counter(props) {
  const [inNumState, setInNumState] = useState({ innumber: 0 }); // 증가하는 변수를 가진 state
  const [deNumState, setDeNumState] = useState({ denumber: 0 }); // 감소하는 변수를 가진 state
  function handleIncrease() {
    setInNumState({ innumber: inNumState.innumber + 1 });
  }
  function handleDecrease() {
    setDeNumState({ denumber: deNumState.denumber - 1 });
  }
  return (
    <div>
      <h1>카운터</h1>
      <div>값: {inNumState.innumber}</div>
      <div>값: {deNumState.denumber}</div>
      <button onClick={handleIncrease}>+</button>
      <button onClick={handleDecrease}>-</button>
    </div>
  );
}

export default Counter;
```
