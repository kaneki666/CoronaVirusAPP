/* eslint-disable react-native/sort-styles */
/* eslint-disable import/order */
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Block, Button, Text } from 'expo-ui-kit';
import { LinearGradient } from 'expo-linear-gradient';

// screens
import Dashboard from '../screens/Corona';
import Messages from '../screens/tes';
import Contact from '../screens/Dashboard';
import WHO from '../screens/Accordion/Accordion';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerLeft: () => (
            <Button transparent onPress={() => navigation.openDrawer()}>
              <MaterialCommunityIcons
                name="menu"
                size={24}
                color="#ff5c2c"
                style={{ paddingHorizontal: 10 }}
              />
            </Button>
          ),
        }}>
        <Stack.Screen name="Home">{props => <Dashboard {...props} />}</Stack.Screen>
        <Stack.Screen name="Messages">{props => <Messages {...props} />}</Stack.Screen>
        <Stack.Screen name="Contact">{props => <Contact {...props} />}</Stack.Screen>
        <Stack.Screen name="WHO">{props => <WHO {...props} />}</Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
      <Block>
        <Block flex={0.4} margin={20} bottom>
          <Image
            source={{
              uri: 'https://i.ibb.co/6s5NRyh/output-onlinepngtools.png',
              height: 60,
              width: 60,
              scale: 0.5,
            }}
            resizeMode="center"
            style={styles.avatar}
          />
          <Text white title>
            Covid-19 CoronaVirus Outbreak
          </Text>
        </Block>
        <Block>
          <DrawerItem
            label="CORONA UPDATE"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Home')}
            icon={() => <MaterialCommunityIcons name="update" color="white" size={16} />}
          />
          <DrawerItem
            label=" DONATE বিদ্যানন্দ - Bidyanondo"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate('Messages')}
            icon={() => <FontAwesome5 name="donate" color="white" size={16} />}
          />
          <DrawerItem
            label="INFORMATION"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate('Contact')}
            icon={() => <MaterialCommunityIcons name="information" color="white" size={16} />}
          />
          <DrawerItem
            label="WHO INFORMATION"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate('WHO')}
            icon={() => <MaterialCommunityIcons name="information" color="white" size={16} />}
          />
        </Block>
      </Block>
      <Block flex={false}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://mohammadsadman.netlify.com/');
          }}>
          <Text
            style={{
              fontStyle: 'italic',
              color: 'white',
              textAlign: 'right',

              fontSize: 15,
            }}>
            <MaterialCommunityIcons name="web" color="white" size={15} />
            Developed By Sadman
          </Text>
        </TouchableOpacity>
      </Block>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#050505', '#2B2f37']}>
      <Drawer.Navigator
        // hideStatusBar
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
