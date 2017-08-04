import axios from 'axios';
import socket from '../socket';

// ACTION TYPES

const GET_MESSAGE = 'GET_MESSAGE';
const GET_MESSAGES = 'GET_MESSAGES';
const GET_ENGLISH_MESSAGES = 'GET_ENGLISH_MESSAGES';
const GET_SPANISH_MESSAGES = 'GET_SPANISH_MESSAGES';
const GET_FRENCH_MESSAGES = 'GET_FRENCH_MESSAGES';

// ACTION CREATORS

export function getMessage (message) {
  const action = { type: GET_MESSAGE, message };
  return action;
}

export function getMessages (messages) {
  const action = { type: GET_MESSAGES, messages };
  return action;
}

export function getEnglishMessages (messages) {
  const action = { type: GET_ENGLISH_MESSAGES, messages };
  return action;
}

export function getSpanishMessages (messages) {
  const action = { type: GET_SPANISH_MESSAGES, messages };
  return action;
}

export function getFrenchMessages (messages) {
  const action = { type: GET_FRENCH_MESSAGES, messages };
  return action;
}

// THUNK CREATORS

export function fetchMessages () {

  return function thunk (dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        const action = getMessages(messages);
        dispatch(action);
      });
  };
}

export function fetchEnglishMessages () {

  return function thunk (dispatch) {
    return axios.get('/api/messages/translateEnglish')
      .then(res => res.data)
      .then(messages => {
        const action = getEnglishMessages(messages);
        dispatch(action);
      });
  };
}

export function fetchSpanishMessages () {

  return function thunk (dispatch) {
    return axios.get('/api/messages/translateSpanish')
      .then(res => res.data)
      .then(messages => {
        const action = getSpanishMessages(messages);
        dispatch(action);
      });
  };
}

export function fetchFrenchMessages () {

  return function thunk (dispatch) {
    return axios.get('/api/messages/translateFrench')
      .then(res => res.data)
      .then(messages => {
        const action = getFrenchMessages(messages);
        dispatch(action);
      });
  };
}

export function postMessage (message) {

  return function thunk (dispatch) {
    return axios.post('/api/messages', message)
      .then(res => res.data)
      .then(newMessage => {
        const action = getMessage(newMessage);
        dispatch(action);
        socket.emit('new-message', newMessage);
      });
  };
}


// REDUCER

export default function reducer (state = [], action) {

  switch (action.type) {

    case GET_MESSAGES:
      return action.messages;

    case GET_MESSAGE:
      return [...state, action.message];

    case GET_SPANISH_MESSAGES:
      return action.messages
    
    case GET_FRENCH_MESSAGES:
      return action.messages

    case GET_ENGLISH_MESSAGES:
      return action.messages

    default:
      return state;
  }

}
