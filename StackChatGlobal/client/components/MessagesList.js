import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import { changeCurrentChannel, fetchTranslatedMessages, fetchMessages } from '../store';

function MessagesList (props) {

  const { channelId, messages, language } = props;

  return (
    <div>
      <ul className="media-list">
        { 
          messages.sort((message1, message2) => {
            if (message1.id > message2.id){
              return 1
            }
            if (message1.id < message2.id){
              return -1
            }
            return 0
          }).map(message => {
            return <Message message={message} key={message.id} />
          })
        }
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
    console.log('this props', this.props.language)
    console.log('next props', nextProps.language)
    if (nextProps.channel.name !== this.props.channel.name) {
      this.props.changeCurrentChannel(nextProps.channel.name);
    }
    if (nextProps.language !== this.props.language) {
      this.props.fetchTranslatedMessages(nextProps.language)
    }
    if (nextProps.messages.length !== this.props.messages.length) {
      this.props.fetchTranslatedMessages(nextProps.language)
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
    changeCurrentChannel: (channelName) => {
      dispatch(changeCurrentChannel(channelName));
    },
    fetchTranslatedMessages: (language) => {
      dispatch(fetchTranslatedMessages(language))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesListLoader);
