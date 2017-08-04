import React, { Component }  from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class ChannelList extends Component {
  constructor(props) {
      super(props)
  }

  render () {
    return (
      <ul>
        {
          this.props.channels.map(channel => {
            channel.messagesPerChannel = this.props.messages.filter(message => message.channelId === channel.id).length
            return channel
          }).sort((channel1, channel2) => {
            if (channel1.messagesPerChannel > channel2.messagesPerChannel){
              return -1
            }
            if (channel1.messagesPerChannel < channel2.messagesPerChannel){
              return 1
            }
            return 0
          }).map(channel => {
            return (
              <li key={channel.id}>
                <NavLink to={`/channels/${channel.id}`}>
                  <div>
                    <span>⚽ {channel.name}</span>
                    <span className="badge">{ channel.messagesPerChannel }</span>
                  </div>
                </NavLink>
              </li>
            );
          })
        }
        <li id="create-channel" >
          <NavLink to="/new-channel">Create a channel...</NavLink>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    messages: state.messages,
    channels: state.channels
  };
};

const mapDispatchToProps = function (dispatch) {
  return {

  };
};

// We need to wrap the component in `withRouter` so that the NavLinks will be able to update
// Because `connect` implements `shouldComponentUpdate`, it will block re-rendering unless it detects
// a prop change. When we change the url, neither the messages nor the channels we send to the ChannelList
// component change, so the component doesn't re-render. What `withRouter` does is it passes the Router's
// props down to its inner component.
//
// It's equivalent to saying:
//
// const ConnectedChannelList = connect(mapStateToProps)(ChannelList);
//
// ...elsewhere, in a `render`:
// <Route component={ConnectedChannelList} />
//
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelList));
