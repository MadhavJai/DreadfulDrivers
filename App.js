/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  NativeRouter,
  Switch,
  Route,
  Link,
  BackButton,
} from 'react-router-native';
// import 'react-native-gesture-handler';

import LaunchScreen from './LaunchScreen';
import HomeScreen from './HomeScreen';

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
  }

  render() {
    if (!this.state.timePassed) {
      return (
          <NavigationContainer>
            <View style={styles.container}>
              <LaunchScreen/>
            </View>
          </NavigationContainer>
      );
    } else {
      return (
          <NavigationContainer>
            <View style={styles.container}>
              <HomeScreen/>
            </View>
          </NavigationContainer>
      );
    }
    // return (
    //   <NativeRouter>
    //     <View style={styles.container}>
    //       <Switch>
    //         <Route exact path="/" component={LaunchScreen} />
    //         <Route exact path="/home" component={HomeScreen} />
    //       </Switch>
    //     </View>
    //   </NativeRouter>
    // );
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
});
