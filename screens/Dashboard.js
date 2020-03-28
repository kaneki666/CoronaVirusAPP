import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import SwipeCards from './SwipeCards';
const { width, height } = Dimensions.get('window');

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{ uri: this.props.image }} />
        <Text style={styles.text}>Swipe To Change</Text>
      </View>
    );
  }
}

const cards = [
  {
    name: '0',
    image:
      'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/IMG-20200325-WA0001.jpg',
  },
  {
    name: '1',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/help1.jpg',
  },
  {
    name: '2',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/help2.jpg',
  },
  {
    name: '3',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/help3.jpg',
  },
  {
    name: '4',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/help5.jpg',
  },
  {
    name: '5',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/20.jpg',
  },
  {
    name: '6',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/21.jpg',
  },
  {
    name: '7',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/22.jpg',
  },
  {
    name: '8',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/23.jpg',
  },
  {
    name: '9',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/24.jpg',
  },
  {
    name: '10',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/25.jpg',
  },
  {
    name: '11',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/26.jpg',
  },
  {
    name: '13',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/27.jpg',
  },
  {
    name: '13',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/26.jpg',
  },
  {
    name: '14',
    image: 'https://raw.githubusercontent.com/kaneki666/demo_react/master/public/29.jpg',
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: cards,
      outOfCards: false,
    };
  }

  cardRemoved(index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3;

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);
    }
  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={true}
        showYup={false}
        showNope={false}
        renderCard={cardData => <Card {...cardData} />}
        cardRemoved={this.cardRemoved.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#ff5c2c',
    backgroundColor: '#2B2f37',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    width: width * 0.85,
    height: width * 0.85,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white',
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
