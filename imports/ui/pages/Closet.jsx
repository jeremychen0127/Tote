import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import { createContainer } from 'meteor/react-meteor-data';

import {FashionItemCollection} from '../../api/fashionItem';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 300,
    height: 600,
    overflowY: 'auto',
    marginBottom: 2,
  },
};

const tilesData = [
  {
    img: '/img/logo.png',
    title: 'Breakfast',
  },
  {
    img: '/img/Hardwood.jpg',
    title: 'Breakfast',
  },
    {
      img: '/img/black.jpg',
      title: 'Breakfast',
    },
   {
        img: '/img/woodenfloor.jpg',
        title: 'Breakfast',
   },
   {
        img: '/img/black.jpg',
        title: 'Breakfast',
   },
];

export default class Closet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridListCategory: '',
      photoCategory: '',
      topUrl: '',
      bottomUrl: '',
    };

    this.handleGridListChange = (event, index, value) => this.setState({gridListCategory: value});

    this.handlePhotoCategoryChange = (event, index, value) => this.setState({photoCategory: value});
  }
 
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
    var _this = this;
    uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
      if (error) {
        // Log service detailed response
        console.error('Error uploading: ', uploader.xhr.response);
        alert (error);
      }
      else {
        console.log(_this.state.photoCategory);
        Meteor.call("tote.FashionItem.addItem", downloadUrl, _this.state.photoCategory);
      }
    });
  }

  formSubmit(){
    // Ofcourse you'll have other fields...
    Meteor.users.update( { _id: Meteor.userId() }, {

    });
  }

  handleStarClick(event) {
    if (event.target.value.category === 'tops') {
      this.setState({topUrl: event.target.value.itemUrl});
    } else if (event.target.value.category === 'bottoms') {
      this.setState({bottomUrl: event.target.value.itemUrl});
    }
  }

  renderGridList() {
    var _this = this;
    var filteredItems = this.props.fashionItems.filter((item) => {
      return item.category === _this.state.gridListCategory;
    });
    return filteredItems.map((item) => {
      return (
        <GridTile
          key={item.itemUrl}
          value={item}
          title=' '
          actionIcon={<IconButton onClick={_this.handleStarClick.bind(_this)}><StarBorder color="red" /></IconButton>}
        >
          <img src={item.itemUrl} />
        </GridTile>
      );
    });
  }

  render() {
    if (this.props.doneLoading) {
      return (
        <div>
          <div className="row">
            <div className="col offset-m4 m2">
              <DropDownMenu value={this.state.photoCategory} onChange={this.handlePhotoCategoryChange}
                anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
                targetOrigin={{horizontal: 'middle', vertical: 'top'}}
              >
                <MenuItem value="all" primaryText="All" />
                <MenuItem value="tops" primaryText="Tops" />
                <MenuItem value="bottoms" primaryText="Bottoms" />
                <MenuItem value="dresses" primaryText="Dresses" />
                <MenuItem value="shoes" primaryText="Shoes" />
              </DropDownMenu>
            </div>
            <form action="#">
                <div className="file-field input-field btn col m2">
                  <span>Upload</span>
                  <input type="file" id="input" onChange={this.upload.bind(this)} />
                </div>
            </form>
          </div>
          <div className="row">
            <div className="col m8">
              <div className="center">
                {
                  this.state.topUrl ?
                    <img src={this.state.topUrl} />
                  :
                    <Paper />
                }
              </div>
            </div>
            <div className="col m4">
              <div style={styles.root}>
                <GridList
                  cellHeight={200}
                  style={styles.gridList}
                >
                  <Subheader className="center">
                    <DropDownMenu value={this.state.gridListCategory} onChange={this.handleGridListChange}
                      anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
                      targetOrigin={{horizontal: 'middle', vertical: 'top'}}
                    >
                      <MenuItem value="all" primaryText="All" />
                      <MenuItem value="tops" primaryText="Tops" />
                      <MenuItem value="bottoms" primaryText="Bottoms" />
                      <MenuItem value="dresses" primaryText="Dresses" />
                      <MenuItem value="shoes" primaryText="Shoes" />
                    </DropDownMenu>
                  </Subheader>
                  {this.renderGridList()}

                </GridList>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}



Closet.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  let handle = Meteor.subscribe('tote.FashionItem');
  if (handle.ready()) {
    if (Meteor.userId()) {
      let items = FashionItemCollection.find({userId: Meteor.userId()}).fetch();
      return {fashionItems: items, doneLoading: true};
    }
  }
  return {doneLoading: false};
}, Closet);