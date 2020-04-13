import React from 'react';
import {
  TextInput,
  StyleSheet,
  Button,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  AppRegistry,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import * as firebase from 'firebase';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from "./SplashScreen";

var reportArray = [];

function showFlatList({navigation}) {
  return (
    <FlatList
      numColumns={1}
      data={reportArray}
      renderItem={({item, index}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailsScreen', {reportObj: item})
          }>
          <View style={styles.item}>
            <Text style={styles.title}>
              {item.idNum + 1}. {item.title}
            </Text>
            <Text style={styles.subTitle}>{item.date}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.idNum}
    />
  );
}

function showDetailsScreen({route, navigation}) {
  const {reportObj} = route.params;
  return (
    <View>
      <Text>Title: {reportObj.title}</Text>
      <Text>{reportObj.date}</Text>
      <Text>Description: {reportObj.desc}</Text>
      <Image
        style={{height: 50, width: 50, marginVertical: 5}}
        source={{uri: reportObj.image}}
      />
      <Text>Location of incident: {reportObj.location}</Text>
      <Text>Make and Model: {reportObj.model}</Text>
      <Text>License plate number of perpetrator: {reportObj.plateNumber}</Text>
      <Text>Upvotes: {reportObj.upvotes}</Text>
      <Button title={'Upvote'} onPress={() => 5} />
    </View>
  );
}

const Stack = createStackNavigator();

export default class BrowseScreen extends React.Component {

   constructor(props) {
       super(props);
       this.state = {
           timePassed: false,
       }
   }

    setTimePassed() {
        this.setState({timePassed: true});
    }

  componentDidMount() {
    reportArray = [];

    const firebaseConfig = {
      apiKey: 'AIzaSyCiS4hoJgPXTRClfOUI-dBQ6hPkdgohqdc',
      authDomain: 'dreadful-drivers.firebaseapp.com',
      databaseURL: 'https://dreadful-drivers.firebaseio.com',
      projectId: 'dreadful-drivers',
      storageBucket: 'dreadful-drivers.appspot.com',
      messagingSenderId: '964121662431',
      appId: '1:964121662431:web:aef498d93e4d26633aea6a',
      measurementId: 'G-2M8NRQYE2T',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase
      .database()
      .ref('data')
      .once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          var reportKey = childSnapshot.key;
          var reportData = childSnapshot.val();
          reportArray.push(reportData);
          console.log(JSON.stringify(reportKey));
          console.log(JSON.stringify(reportData));
          console.log(JSON.stringify(reportArray));
          this.setTimePassed();
        });
      });
  }

  render() {
    if(this.state.timePassed === false){
        return (
            <View style={styles.loadingState}>
                <Text>Loading information</Text>
            </View>
        );
    }
    else{
        console.log(JSON.stringify(reportArray));
        return (
            <Stack.Navigator
                initialRouteName={'ReportsList'}
                screenOptions={{headerShown: false}}>
                <Stack.Screen name={'ReportsList'} component={showFlatList} />
                <Stack.Screen name={'DetailsScreen'} component={showDetailsScreen} />
            </Stack.Navigator>
        );
    }

  }
}

const styles = StyleSheet.create({
    loadingState: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#073763',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  subTitle: {
    fontSize: 16,
    color: '#fff',
  },
});
