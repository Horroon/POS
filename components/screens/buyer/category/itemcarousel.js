import React, {Component} from 'react';
import {View, Text} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth} from './itemcarouselslideStyle'
import {itemWidth} from './itemcarouselslideStyle'
import styles from './itemcarouselslideStyle'

export default class MyCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [{id:1, title: 'Hello'}],
    };
  }
  _renderItem = ({item, index}) => {
    return (
      <View style={styles.slideInnerContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  render() {
    return (
      <Carousel
        ref={c => {
          this._carousel = c;
        }}
        data={this.state.pictures}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    );
  }
}
