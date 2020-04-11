/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NativeRouter, Switch, Route} from 'react-router-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ReportScreen from './ReportScreen';
import BrowseReportsScreen from './BrowseReportsScreen';
import PreferencesScreen from './PreferencesScreen';
import SplashScreen from './SplashScreen';

function showPreferences({navigation}) {
  return (
    <View style={styles.container}>
      <PreferencesScreen />
    </View>
  );
}

function showBrowseScreen({navigation}) {
  return <BrowseReportsScreen />;
}

function showReportScreen({navigation, route}) {
  return (
    // <View style={styles.container}>
    <ReportScreen />
    // </View>
  );
}

function showHomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.seperator}>
        <Button
          style={styles.button}
          color="#073763"
          title={'Publish a report'}
          onPress={() => navigation.navigate('Publish Report')}
        />
      </View>
      <View style={styles.seperator}>
        <Button
          color="#073763"
          title={'Browse reports'}
          onPress={() => navigation.navigate('Browse Reports')}
        />
      </View>
      <View style={styles.seperator}>
        <Button
          color="#073763"
          style={styles.seperator}
          title={'Preferences'}
          onPress={() => navigation.navigate('Preferences')}
        />
      </View>
      <View style={styles.seperator}>
        <Button
          color="#073763"
          title={'Back to launch screen'}
          onPress={() => navigation.navigate('Project DD')}
        />
      </View>
    </View>
  );
}

function showSplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Project DD</Text>
      <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timePassed: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setTimePassed();
    }, 2000);
  }

  setTimePassed() {
    this.setState({timePassed: true});
    console.log('Bruh');
  }

  render() {
    if (this.state.timePassed === false) {
      return (
        <View style={styles.container}>
          <SplashScreen />
        </View>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name={'Project DD'} component={showSplashScreen} />
            <Stack.Screen name={'Home'} component={showHomeScreen} />
            <Stack.Screen
              name={'Publish Report'}
              component={showReportScreen}
            />
            <Stack.Screen
              name={'Browse Reports'}
              component={showBrowseScreen}
            />
            <Stack.Screen name={'Preferences'} component={showPreferences} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  seperator: {
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
      flex: 1,
      justifyContent: 'center',
  },
});
