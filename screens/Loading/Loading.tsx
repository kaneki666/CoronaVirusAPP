import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { timing } from 'react-native-redash';

import CircularProgress from './CircularProgress2';

export default () => {
  return (
    <View style={styles.container}>
      <CircularProgress
        progress={timing({
          duration: 1 * 1000,
          from: 0,
          to: 1,
          easing: Easing.linear,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
