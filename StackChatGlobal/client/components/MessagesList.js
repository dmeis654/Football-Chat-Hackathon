import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { changeCurrentChannel, fetchEnglishMessages, fetchSpanishMessages, fetchFrenchMessages, fetchMessages } from '../store';

function MessagesList (props) {

  const { channelId, messages, language } = props;

  return (
    <div>
      <ul className="media-list">
        { messages.map(message => <Message message={message} key={message.id} />) }
      </ul>
      <NewMessageEntry channelId={channelId} />
    </div>
  );
}

class MessagesListLoader extends Component {

  componentDidMount () {
    this.props.changeCurrentChannel(this.props.channel.name);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.channel.name !== this.props.channel.name) {
      this.props.changeCurrentChannel(nextProps.channel.name);
    }
    if (nextProps.language === "English" && this.props.language !== "English") {
      this.props.fetchEnglishMessages()
    }
    if (nextProps.language === "Spanish" && this.props.language !== "Spanish") {
      this.props.fetchSpanishMessages()
    }
    if (nextProps.language === "French" && this.props.language !== "French") {
      this.props.fetchFrenchMessages()
    }
    if (nextProps.messages.length !== this.props.messages.length && this.props.language === "English") {
      this.props.fetchEnglishMessages()
    }
    if (nextProps.messages.length !== this.props.messages.length && this.props.language === "Spanish") {
      this.props.fetchSpanishMessages()
    }
    if (nextProps.messages.length !== this.props.messages.length && this.props.language === "French") {
      this.props.fetchFrenchMessages()
    }
  }

  render () {
    if (this.props.language){
      return (
        <div>
        <MessagesList {...this.props} />
        </div>
      );
    }
    else {
      return (
        <div>
          <img id="soccer-field" alt="900 x 500" src="/images/soccer_field.png" />
        </div>
      );
    }
  }
}

const mapStateToProps = function (state, ownProps) {

  const channelId = Number(ownProps.match.params.channelId);

  return {
    channel: state.channels.find(channel => channel.id === channelId) || { name: '' },
    messages: state.messages.filter(message => message.channelId === channelId),
    channelId,
    language: state.language
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    changeCurrentChannel(channelName) {
      dispatch(changeCurrentChannel(channelName));
    },
    fetchMessages() {
      dispatch(fetchMessages())
    },
    fetchEnglishMessages() {
      dispatch(fetchEnglishMessages())
    },
    fetchSpanishMessages() {
      dispatch(fetchSpanishMessages())
    },
    fetchFrenchMessages() {
      dispatch(fetchFrenchMessages())
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesListLoader);
