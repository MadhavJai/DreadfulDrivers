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
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import * as firebase from 'firebase';

const tempArray = [];

export default class ReportScreen extends React.Component {
  componentWillMount() {
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

    // firebase
    //   .database()
    //   .ref('users/001')
    //   .set({
    //     name: 'test',
    //     age: 21,
    //   });
  }

  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      longitude: null,
      latitude: null,
      location: null,
      model: null,
      color: null,
      plateNumber: null,
      date: '',
      imgPath: null,
      reportArray: null,
    };
  }

  render() {
    const {date} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Publish Report</Text>
        <View style={styles.horizontal}>
          <Text style={{paddingTop: 6}}>Title of Incident: </Text>
          <TextInput
            style={{height: 35}}
            placeholder="Enter Title"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({title: text})}
          />
        </View>
        <View style={styles.horizontal}>
          <Text style={{paddingTop: 6}}>Description: </Text>
          <TextInput
            style={{height:35,marginTop: 0}}
            placeholder={"Enter description"}
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({description: text})}
          />
        </View>
        <View style={styles.sameLine}>
          <Text style={{paddingTop: 6}}>Location </Text>
          <TextInput
              style={{height:35,marginTop: 0}}
              placeholder={"Enter location"}
              returnKeyLabel={'next'}
              onChangeText={text => this.setState({location: text})}
          />
          <Text style={{paddingTop: 6}}> Or   </Text>
          <Button
            color="#073763"
            title={'Get location'}
            onPress={() => this.getLocation()}
          />

        </View>
        <View style={styles.centerText}>
          <Text style={{marginVertical: 10, fontSize: 18}}>Vehicle Info</Text>
        </View>
        <View style={styles.sameLine}>
          <Text  style={{paddingTop: 6}}>Model: </Text>
          <TextInput style={{height:35,marginTop: 0}}
            placeholder="Enter Vehicle Model"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({model: text})}
          />
        </View>
        <View style={styles.sameLine}>
          <Text style={{paddingTop: 6}}>Color: </Text>
          <TextInput
              style={{height:35,marginTop: 0}}
            placeholder="Enter Vehicle Color"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({color: text})}
          />
        </View>
        <View style={styles.sameLine}>
          <Text style={{paddingTop: 6}}>Licence Plate: </Text>
          <TextInput
              style={{height:35,marginTop: 0}}
            placeholder="Enter License Plate"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({plateNumber: text})}
          />
        </View>

        <View style={styles.sameLine}>
          <Text style={{paddingTop: 6}}>Date of Event: </Text>
          <DatePicker
            style={{width: 200, marginBottom: 15}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({date: date});
            }}
          />
        </View>

        <View style={styles.sameLine}>
          <Text style={{paddingTop: 6}}>Picture of Driver: </Text>
          <Button
              style={{marginRight: 5}}
            color="#073763"
            title="Take Picture"
            onPress={() => this.capture()}
          />
          <Button
            color="#073763"
            title="Reset Picture"
            onPress={() => this.resetImage()}
          />
        </View>
        <View>
          <Image
            key={this.state.imgPath}
            style={{
              width: 50,
              height: 50,
              marginTop: 5,
              marginBottom: 5,
            }}
            source={{uri: this.state.imgPath}}
          />
        </View>

        <View style={styles.sameLine}>
          <Button color="#073763" title="Go back" onPress={() => 5} />
          <Button
            color="#073763"
            title="Publish Report"
            onPress={() => this.publish()}
          />
        </View>
      </View>
    );
  }

  getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow Location Usage?',
          message: 'Dreadful Drivers needs access to your location ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted!');
        await Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            var latitude = JSON.stringify(position.coords.latitude);
            var longitude = JSON.stringify(position.coords.longitude);
            Alert.alert(
              'Location Retrieved',
              'latitude : ' + latitude + '\nlongitude : ' + longitude,
            );
            this.setState({longitude: longitude});
            this.setState({latitude: latitude});
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  capture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        //once promise is met, sets imgPath state to the images path
        this.setState({imgPath: image.path});
      })
      .catch(e => {
        //if picture is never taken, width and height states are updated
        Alert.alert('Camera Error', 'Error: "No Image Selected" ');
      });
  };

  resetImage = () => {
    this.setState({imgPath: null});
  };
  publish = () => {
    this.setState({
      reportArray: null,
    });
    var title = this.state.title;
    var longitude = this.state.longitude;
    var latitude = this.state.latitude;
    var model = this.state.model;
    var color = this.state.color;
    var plateNumber = this.state.plateNumber;
    var date = this.state.date;
    var img = this.state.imgPath;
    var report = {
      title,
      latitude,
      longitude,
      model,
      color,
      plateNumber,
      date,
      img,
    };
    tempArray.push(report);
    this.setState({
      reportArray: JSON.stringify(tempArray),
    });
    console.log('title : ' + report.title);
    console.log('latitude : ' + report.latitude);
    console.log('longitude : ' + report.longitude);
    console.log('model : ' + report.model);
    console.log('color : ' + report.color);
    console.log('plate number : ' + report.plateNumber);
    console.log('date : ' + report.date);
    console.log('image data : ' + report.img);
    console.log('report array: ' + JSON.stringify(tempArray));
    console.log('report array: ' + this.state.reportArray);
    Alert.alert('Array of reports', JSON.stringify(tempArray));

    var dataRef = firebase.database().ref('data'); // .push({report});
    dataRef.push().set({
      report,
    });

    // firebase
    //   .database()
    //   .ref('data')
    //   .push({
    //     report,
    //   });
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    marginTop: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  sameLine: {
    flexDirection: 'row',
  },
  buttonSpace: {
    marginRight: 5,
  },
  centerText: {
    alignItems: 'center',
  },
});
