import React, { Component } from "react";
import ReactDOM from "react-dom";
import PureRenderMixin from "react-addons-pure-render-mixin";
import reactMixin from "react-mixin";

class InputBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      $textarea: "",
    };
  }

  handleOnChange(e) {
    this.setState({
      $textarea: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (typeof this.props.sendMessage === "function") {
      this.props.sendMessage(this.state.$textarea);
      this.setState({
        $textarea: "",
      });
    } else {
      console.log("props.sendMessage not defined!");
    }
  }

  render() {
    return (
      <div id="chat-inputbox">
        <form className="flex-row" onSubmit={this.handleSubmit.bind(this)}>
          <div className="flex">
            <textarea onChange={this.handleOnChange.bind(this)} name="message" row="4" value={this.state.$textarea} />
          </div>
          <div style={{ width: "130px", textAlign: "right" }}>
            <button type="submit" className="btn lg color-2">发送</button>
          </div>
        </form>
      </div>
    );
  }
}

reactMixin.onClass(InputBox, PureRenderMixin);

export default InputBox;
