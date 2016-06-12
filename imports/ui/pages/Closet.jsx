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
 
  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  render() {
    return (
      <div className="row">
        <div className="col m6 s12 left Backdrop">
			<img src="/img/Hardwood.jpg"/>
		</div>
		<div className="col m2 s5 Top">
		    <img src="/img/black.jpg"/>
		</div>
		<div className="col m4 offset-m2 s12 Test">
          <div style={styles.root}>
            <GridList
              cellHeight={200}
              style={styles.gridList}
            >
              <Subheader>
                MY CLOSET
                 <div>
                  <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                  >
                    <MenuItem primaryText="All" />
                    <MenuItem primaryText="Favorites" />
                    <MenuItem primaryText="Tops" />
                    <MenuItem primaryText="Bottoms" />
                    <MenuItem primaryText="Dresses" />
                    <MenuItem primaryText="Shoes" />
                    <MenuItem primaryText="Accessories" />
                  </IconMenu>
                     </div>
              </Subheader>
              {tilesData.map((tile) => (
                <GridTile
                  key={tile.img}
                  title={tile.title}
                  subtitle={<span>by <b>{tile.author}</b></span>}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                >
                  <img src={tile.img} />
                </GridTile>
              ))}
            </GridList>
          </div>
		</div>
      </div>

    );
  }
}

Closet.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};