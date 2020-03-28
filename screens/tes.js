import React from 'react';
import { Image, Animated, Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native';

import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

// s03h03e05c02
const LOGO_URI = `https://i.ibb.co/6s5NRyh/output-onlinepngtools.png`;
const getImageUri = id =>
  `https://raw.githubusercontent.com/kaneki666/demo_react/master/public/${id}.jpg`;
const { width } = Dimensions.get('window');
const height = 800;

const PRODUCT_LIST = [
  {
    id: '1',
    title: 'STEP-1',

    description: 'Login in your bKash account. Click on Donation.',

    bg: '#050505',
  },
  {
    id: '2',
    title: 'STEP-2',

    description: 'Click in Donate with bKash.',

    bg: '#Adc2ee',
  },
  {
    id: '3',
    title: 'STEP-3',

    description: 'Fill up all the necessary fields.',

    bg: '#ffc491',
  },
  {
    id: '4',
    title: 'STEP-4',

    description: 'Enter your bKash Number.',

    bg: '#f37298',
  },
  {
    id: '5',
    title: 'STEP-5',

    description: 'Enter your bKash Verification Code.',

    bg: '#fff1b6',
  },
  {
    id: '6',
    title: 'STEP-6',

    description: 'You will get confirmation.',

    bg: '#ffe8e5',
  },
];

export default class App extends React.Component {
  _scrollX = new Animated.Value(0);
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Animated.ScrollView
          pagingEnabled
          scrollEventThrottle={16}
          horizontal
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this._scrollX } } }], {
            useNativeDriver: true,
          })}
          contentContainerStyle={styles.scrollViewContainer}>
          {PRODUCT_LIST.map((item, i) => this._renderItem(item, i))}
        </Animated.ScrollView>
        <Image source={{ uri: LOGO_URI }} style={styles.logoImage} />
      </View>
    );
  }

  _renderItem = (item, i) => {
    const inputRange = [(i - 2) * width, (i - 1) * width, i * width, (i + 1) * width];
    const imageScale = this._scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.4, 1, 0.4],
    });
    const imageOpacity = this._scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.2, 1, 0.2],
    });

    return (
      <View key={item.id} style={[styles.container, styles.item]}>
        <Animated.Image
          source={{ uri: getImageUri(item.id) }}
          style={[
            styles.image,
            {
              transform: [
                {
                  scale: imageScale,
                },
              ],
              opacity: imageOpacity,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.metaContainer,
            {
              opacity: imageOpacity,
            },
          ]}>
          <Text style={[styles.font, styles.title]}>{item.title}</Text>
          <Text style={[styles.font, styles.subtitle]}>{item.subtitle}</Text>
          <Text style={[styles.font, styles.description]}>{item.description}</Text>
          <Text style={[styles.font, styles.price]}>{item.price}</Text>
        </Animated.View>
        {this._renderRadialGradient(item.bg, inputRange)}
      </View>
    );
  };

  _renderRadialGradient = (color, inputRange) => {
    const rotate = this._scrollX.interpolate({
      inputRange,
      outputRange: ['0deg', '-15deg', '0deg', '15deg'],
    });
    const translateX = this._scrollX.interpolate({
      inputRange,
      outputRange: [0, width, 0, -width],
    });
    const opacity = this._scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.5, 1, 0.5],
    });

    return (
      <Animated.View
        style={[
          styles.svgContainer,
          {
            transform: [
              {
                rotate,
              },
              {
                translateX,
              },
              {
                scale: 1.3,
              },
            ],
            opacity,
          },
        ]}>
        <Svg height={height} width={width}>
          <Defs>
            <RadialGradient id="grad" cx="50%" cy="35%" r="60%" gradientUnits="userSpaceOnUse">
              <Stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <Stop offset="100%" stopColor={color} stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width={width} height={height} fill={`url(#grad)`} fillOpacity="0.9" />
        </Svg>
      </Animated.View>
    );
  };
}

const styles = StyleSheet.create({
  item: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    color: '#222',
  },
  image: {
    width: width * 0.85,
    height: width * 0.85,
    resizeMode: 'contain',
  },
  metaContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    padding: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '900',
  },
  description: {
    fontSize: 14,
    marginVertical: 15,
    textAlign: 'center',
  },
  price: {
    fontSize: 42,
    fontWeight: '400',
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  logoImage: {
    width: width / 5,
    height: width / 5,
    position: 'absolute',
    top: 10,
    resizeMode: 'contain',
  },
});
