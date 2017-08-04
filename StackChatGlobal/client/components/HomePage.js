import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

export default class Hompage extends Component {
    render () {
        return (
        <div>
            Welcome to StackChat!
        </div>
        );
  }
}