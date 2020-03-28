import React from 'react';
import {
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';

import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

// s03h03e05c02
const LOGO_URI = `https://i.ibb.co/6s5NRyh/output-onlinepngtools.png`;
const getImageUri = id =>
  `https://raw.githubusercontent.com/kaneki666/demo_react/master/public/${id}.png`;
const { width } = Dimensions.get('window');
const height = 800;

const PRODUCT_LIST = [
  {
    id: 'coro1',
    title: 'Overview',

    description:
      'Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.The best way to prevent and slow down transmission is be well informed about the COVID-19 virus, the disease it causes and how it spreads. Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not touching your face.   The COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose when an infected person coughs or sneezes, so it’s important that you also practice respiratory etiquette (for example, by coughing into a flexed elbow).',

    bg: '#Aee0ed',
  },
  {
    id: 'coro2',
    title: 'Prevention',

    description: 'To prevent infection and to slow transmission of COVID-19, do the following',
    sub1:
      '1-- Wash your hands regularly with soap and water, or clean them with alcohol-based hand rub.',
    sub2: '2-- Maintain at least 1 metre distance between you and people coughing or sneezing.',
    sub3: '3-- Avoid touching your face.',
    sub4: '4-- Cover your mouth and nose when coughing or sneezing.',
    sub5: '5-- Stay home if you feel unwell.',
    sub6: '6-- Refrain from smoking and other activities that weaken the lungs.',
    sub7:
      '7-- Practice physical distancing by avoiding unnecessary travel and staying away from large groups of people.',

    bg: '#Adc2ee',
  },
  {
    id: 'coro3',
    title: 'Symptoms',

    description:
      'The COVID-19 virus affects different people in different ways.  COVID-19 is a respiratory disease and most infected people will develop mild to moderate symptoms and recover without requiring special treatment.  People who have underlying medical conditions and those over 60 years old have a higher risk of developing severe disease and death.',
    subtitle: 'Common symptoms include:',
    sub1: 'Common symptoms include:',
    sub2: '1-- fever',
    sub3: '2-- iredness',
    sub4: '3-- dry cough',
    sub5: 'Other symptoms include:',
    sub6: '1-- shortness of breath',
    sub7: '2-- aches and pains',
    sub8: '3-- sore throat',
    sub9: '4-- and very few people will report diarrhoea, nausea or a runny nose',
    des:
      'Remarks: People with mild symptoms who are otherwise healthy should self-isolate and contact their medical provider or a COVID-19 information line for advice on testing and referral. People with fever, cough or difficulty breathing should call their doctor and seek medical attention.',

    bg: '#ffc491',
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

          <Text style={[styles.font, styles.description]}>{item.description}</Text>

          <Text style={[styles.font, styles.symptom]}>
            {item.sub1}
            {'\n'}
            {item.sub2}
            {'\n'}
            {item.sub3}
            {'\n'}
            {item.sub4}
            {'\n'}
            {item.sub5}
            {'\n'}
            {item.sub6}
            {'\n'}
            {item.sub7}
            {'\n'}
            {item.sub9}
            {'\n'}
            {item.sub9}
          </Text>

          <Text style={[styles.font, styles.description]}>{item.des}</Text>
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
  symptom: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
