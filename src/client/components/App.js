import React, { Component } from "react";
import { connect } from "react-redux";
import PureRenderMixin from "react-addons-pure-render-mixin";
import reactMixin from "react-mixin";
import MessageList from "./MessageList";
import InputBox from "./InputBox";
import RoomList from "./RoomList";
import { newMessage, switchRoom, addRoom, removeRoom } from "../actionCreator";

class App extends Component {

  getCurrentRoomName() {
    if (!this.props.currentRoom) return "无";
    const room = this.props.rooms.find(r => r.get("id") === this.props.currentRoom);
    return (room && room.get) ? room.get("name") : room;
  }

  isOwner() {
    if (!this.props.currentRoom || !this.props.username) return false;
    const room = this.props.rooms.find(r => r.get("id") === this.props.currentRoom);
    if (!room) return false;
    return room.get("owner") === this.props.username;
  }

  getMessages() {
    return (
      this.props.messages ?
      this.props.messages.get(this.props.currentRoom) :
      []
    );
  }

  addRoom() {
    const name = prompt("房间名称");
    if (!name) return alert("不能没有房间名称");
    this.props.dispatch(addRoom({
      name,
      owner: this.props.username,
    }));
  }

  removeRoom() {
    this.props.dispatch(switchRoom());
    this.props.dispatch(removeRoom(this.props.currentRoom, this.props.username));
  }

  sendMessage(message) {
    console.log("message:", message);
    this.props.dispatch(newMessage({
      roomId: this.props.currentRoom,
      user: this.props.username,
      content: message,
    }));
  }

  render() {
    const {
      currentRoom,
      rooms,
      username,
      dispatch,
    } = this.props;
    console.log();
    return (
      <div className="flex-row">
        <nav id="chat-nav">
          <p>聊天室列表</p>
          <RoomList
            rooms={rooms}
            currentRoom={currentRoom}
            switchRoom={id => dispatch(switchRoom(id))}
          />
          <button className="btn color-2" onClick={this.addRoom.bind(this)}>
            + 创建聊天室
          </button>
        </nav>
        {
          !currentRoom ?
            <h2>请选择一个聊天室</h2> :
            <section className="flex" id="chat-main">
              <header className="flex-row">
                <h3>当前聊天室： {this.getCurrentRoomName()}</h3>
                <span className="flex"></span>
                {
                  !this.isOwner() ?
                    "" :
                    <button
                      onClick={this.removeRoom.bind(this)}
                      className="btn sm color-5"
                    >x 删除该聊天室</button>
                }
              </header>
              <MessageList messages={this.getMessages()} username={username} />
              <InputBox sendMessage={this.sendMessage.bind(this)} />
            </section>
        }
      </div>
    );
  }
}

reactMixin.onClass(App, PureRenderMixin);

function mapStateToProps(state) {
  return {
    rooms: state.get("rooms"),
    currentRoom: state.get("currentRoom"),
    username: state.get("username"),
    messages: state.get("messages"),
  };
}

export default connect(mapStateToProps)(App);
