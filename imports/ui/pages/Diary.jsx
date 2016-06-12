import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import RaisedButton from 'material-ui/RaisedButton';

import { FashionItemCollection } from '../../api/fashionItem';

export default class Diary extends Component {


	  getChildContext() {
	    return {muiTheme: getMuiTheme(baseTheme)};
	  }

		render() {
			return (
				<div className="center">
				  <br /><br />
				  <img src='/img/diary3.jpg' height={650} width={500}/>
				  <br /><br />
				  <img src='/img/diary2.jpg' height={650} width={500}/>
				  <br /><br />
				  <img src='/img/diary1.jpg' height={650} width={500}/>
				</div>
			);
		}
}

Diary.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};