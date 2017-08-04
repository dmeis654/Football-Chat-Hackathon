import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MessagesList from './MessagesList';
import NewChannelEntry from './NewChannelEntry';
import store, { fetchMessages, fetchChannels } from '../store';
import {fetchSpanishMessages } from '../store';

export default class Main extends Component {

  componentDidMount () {
    //const messagesThunk = fetchMessages();
    //const spanishMessagesThunk = fetchSpanishMessages();
    const channelsThunk = fetchChannels();
    
    //store.dispatch(messagesThunk);
    //store.dispatch(spanishMessagesThunk);
    store.dispatch(channelsThunk);
  }

  render () {
    return (
      <div>
        <Sidebar />
        <Navbar />
        <main>
          <Switch>
            <Route path="/new-channel" component={NewChannelEntry} />
            <Route path="/channels/:channelId" component={MessagesList} />
            <Redirect to="/channels/1" />
          </Switch>
        </main>
      </div>
    );
  }
}


// const mapStateToProps = function (state, ownProps) {

//   return {
//     // channel: state.channels.find(channel => channel.id === channelId) || { name: '' },
//     // messages: state.messages.filter(message => message.channelId === channelId),
//     // channelId
//     //channel: state.channels,
//     //messages: state.messages,
//     //channelId: channelId
//   };
// };

// const mapDispatchToProps = function (dispatch) {
//   return {
//     // changeCurrentChannel(channelName) {
//     //   dispatch(changeCurrentChannel(channelName));
//     // },
//     // fetchSpanishMessages() {
//     //   dispatch(fetchSpanishMessages())
//     // }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Main);