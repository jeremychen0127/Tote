import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const path = '/img/celebrity/';
const pictures = [
  'tomboy',
  'sexy',
  'cute',
  'chic',
  'punk',
  'soph'
];
const pictureFileExt = '.jpg';

export default class FemaleCelebrityQuestion extends Component {
  renderGrids() {
    let grids = [];
    let pictureIndex = 0;
    while (pictureIndex < pictures.length) {
      grids.push(
        <GridTile
          key={pictures[pictureIndex]}
          cellHeight={400}
          title=''
          actionPosition="left"
          titlePosition="top"
          actionIcon={<IconButton><StarBorder color="red" /></IconButton>}>
            <img
              className="pictureGrid"
              src={path + pictures[pictureIndex] + pictureFileExt}
              value={pictures[pictureIndex]}
              onClick={this.props.handleFemaleCelebrityChange}/>
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

FemaleCelebrityQuestion.propTypes = {
  handleFemaleCelebrityChange: React.PropTypes.func.isRequired
}