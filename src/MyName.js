import React from "react";

function MyName({ name }) {
  return <div>안녕하세요! 제 이름은 {name} 입니다.</div>;
}

export default MyName;

/* 
defaultProps을 class 안에 정의
import React, { Component } from "react";

class MyName extends Component {
  static defaultProps = {
    name: "기본 이름",
  };
  render() {
    return <div>안녕하세요! 제 이름은 {this.props.name} 입니다.</div>;
    // this.props을 통해 props 값 참조
  }
}

export default MyName;
*/

/*
defaultProps을 class 밖에 정의
import React, { Component } from "react";

class MyName extends Component {
  render() {
    return <div>안녕하세요! 제 이름은 {this.props.name} 입니다.</div>;
  }
}

MyName.defaultProps = {
  name: "기본 이름",
};

export default MyName; */
