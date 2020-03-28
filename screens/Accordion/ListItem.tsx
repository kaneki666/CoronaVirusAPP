import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const LIST_ITEM_HEIGHT = 70;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2B2f37',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderColor: 'white',
  },
  name: {
    fontSize: 16,
    color: 'white',
  },
});

export interface ListItem {
  name: string;
  points: string;
}

interface ListItemProps {
  item: ListItem;
  isLast: boolean;
}

export default ({ item, isLast }: ListItemProps) => {
  const bottomRadius = isLast ? 8 : 0;
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius,
        },
      ]}>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );
};
