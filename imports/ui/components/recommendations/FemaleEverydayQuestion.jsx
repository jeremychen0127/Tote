import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const path = '/img/everyday/';
const pictures = [
  'Tomboy',
  'sexy',
  'Cute',
  'boho',
  'Punk',
  'Sophisticated'
];
const pictureFileExt = '.png';

export default class FemaleEverydayQuestion extends Component {
  renderGrids() {
    let grids = [];
    let pictureIndex = 0;
    <h1>Which outfit most closely resembles your daily style?</h1>
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
              onClick={this.props.handleFemaleEverydayChange}/>
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

FemaleEverydayQuestion.propTypes = {
  handleFemaleEverydayChange: React.PropTypes.func.isRequired
}