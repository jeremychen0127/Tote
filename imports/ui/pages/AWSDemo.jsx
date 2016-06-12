import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

import RaisedButton from 'material-ui/RaisedButton';

import { FashionItemCollection } from '../../api/fashionItem';

export default class AWSDemo extends Component {


	  getChildContext() {
	    return {muiTheme: getMuiTheme(baseTheme)};
	  }

	componentWillMount(){
		Slingshot.fileRestrictions("myImageUploads", {
		  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
		  maxSize: 2 * 1024 * 1024,
		});
	}
		
	upload() {
		var uploader = new Slingshot.Upload("myImageUploads");
		uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
		  if (error) {
		    // Log service detailed response
		    console.error('Error uploading: ', uploader.xhr.response);
		    alert (error);
		  }
		  else {
		    Meteor.call("tote.FashionItem.addItem", Meteor.user()._id, downloadUrl);
		  }
		});
	}

	 formSubmit(){
    // Ofcourse you'll have other fields...
    Meteor.users.update( { _id: Meteor.userId() }, {

    });
  }

		render() {
			return (
				<form>

					<div>
						<input type="file" id="input" onChange={this.upload.bind(this)} />
					</div>

					<div>
						<button type="submit" onClick={this.formSubmit.bind(this)}>Submit</button>
					</div>

				</form>
			);
		}
}

AWSDemo.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};