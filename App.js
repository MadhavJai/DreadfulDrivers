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
  Image,
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
import SplashScreen from './SplashScreen';


console.disableYellowBox = true;


//functions for navigating through the multiple pages in the application

function showBrowseScreen({navigation}) {
  return <BrowseReportsScreen />;
}

function showReportScreen({navigation, route}) {
  return (
    <ReportScreen />
  );
}

function showHomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dreadful Drivers</Text>
      <Image
        style={{
          width: 330,
          height: 280,
        }}
        source={require('./logo.png')}
      />
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
      <Text style={styles.footer}>Arjun Suthaharan and Madhav Jaisankar</Text>

    </View>
  );
}

//function to display splash screen to user
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
  //constructor for variables used throughout code
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

  //setting boolean for if splash screen has reached time
  setTimePassed() {
    this.setState({timePassed: true});
  }

  //rendering visual components that will be seen by the user
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
    marginTop : 25,
    textAlign: 'right',
  },
  seperator: {
    margin: 8,
    width: 350,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  title : {
    fontSize: 35,
    marginBottom: 15,
  },
});
