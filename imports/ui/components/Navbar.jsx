import React, { Component } from 'react';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui/Tabs';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

export default class Navbar extends Component {
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  handleChange(value) {
    this.setState({currentTab: value});
  }

  handleActive(tab) {
    FlowRouter.go(tab.props.value);
  }

  render() {
    let tabContainerStyle = {
      backgroundColor: 'inherit'
    };
    let tabStyle = {
      color: '#424242'
    };
    let inkBarStyle = {
      backgroundColor: '#616161'
    };

    return (
      <div className="row center">
        <div className="col m6 offset-m3 s12">
          <Tabs value={FlowRouter.getRouteName()} onChange={this.handleChange.bind(this)} tabItemContainerStyle={tabContainerStyle} inkBarStyle={inkBarStyle}>
            <Tab style={tabStyle} label="My Closet" value="closet" onActive={this.handleActive.bind(this)}/>
            <Tab style={tabStyle} label="Recommendations" value="recommendations" onActive={this.handleActive.bind(this)}/>
            <Tab style={tabStyle} label="Diary" value="diary" onActive={this.handleActive.bind(this)}/>
          </Tabs>
        </div>
      </div>
    );
  }
}

Navbar.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};