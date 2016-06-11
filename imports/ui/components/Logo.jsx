import React, { Component } from 'react';

export default class Logo extends Component {
  render() {
    return (
      <div className="row center">
        <div className="col m8 offset-m2 s12">
          <img src="/img/logo.png" height="100"/>
        </div>
      </div>
    );
  }
}