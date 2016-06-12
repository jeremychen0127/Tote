import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const path = '/img/';
const category = 'everyday';
const numPictures = 6;
const pictureFileExt = '.png';

export default class FemaleEverydayQuestion extends Component {
  renderGrids() {
    let grids = [];
    let pictureIndex = 1;
    while (pictureIndex <= numPictures) {
      grids.push(
        <GridTile
          cellHeight={400}
          key={category + pictureIndex}
          title=''
          actionPosition="left"
          titlePosition="top"
          actionIcon={<IconButton><StarBorder color="red" /></IconButton>}>
          <img src={path + category + pictureIndex + pictureFileExt} />
        </GridTile>
      );
      pictureIndex++;
    }
    return grids;
  }

  render() {
    return (
      <div>
        <GridList
          cols={3}>
            {this.renderGrids()}
        </GridList>
      </div>
    );
  }
}