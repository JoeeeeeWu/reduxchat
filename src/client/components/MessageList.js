import React, { Component, propTypes } from "react";
import Message from "./Message";
import PureRenderMixin from "react-addons-pure-render-mixin";
import reactMixin from "react-mixin";

class MessageList extends Component {

  isSelf(message) {
    return this.props.username === message.get("user");
  }

  $getMessages(messages) {
    if (!messages || messages.size === 0) return <p>还没有消息</p>;
    return messages.map((message, index) => (
      <Message
        key={index}
        isSelf={this.isSelf(message)}
        message={message}
      />
    ));
  }

  render() {
    return (
      <ul className="chat-messages">
        {
          this.$getMessages(this.props.messages)
        }
      </ul>
    );
  }
}

reactMixin.onClass(MessageList, PureRenderMixin);

export default MessageList;
