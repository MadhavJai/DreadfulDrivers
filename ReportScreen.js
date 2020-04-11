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
  }

  constructor(props) {
    super(props);
    this.state = {
      idNum: 0,
      title: null,
      description: null,
      longitude: null,
      latitude: null,
      location: null,
      model: null,
      color: null,
      plateNumber: null,
      date: '',
      imgPath: ' ',
      upvotes: 0,
    };
  }

  render() {
    const {date} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.horizontal}>
          <Text style={styles.importantText}>* </Text>
          <Text style={{paddingTop: 6}}>Title of Incident:</Text>

        </View>
        <TextInput
            style={styles.descriptionInput}
            placeholder="Enter Title"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({title: text})}
        />
        <View style={styles.horizontal}>
          <Text style={styles.importantText}>* </Text>
          <Text style={{paddingTop: 6}}>Description</Text>

        </View>
        <TextInput
            style={styles.descriptionInput}
            placeholder={'Enter description'}
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({description: text})}
        />
        <View style={styles.sameLine}>
          <Text style={styles.importantText}>* </Text>
          <Text style={{paddingTop: 6}}>Location:            </Text>
          <TextInput
              style={styles.input}
            placeholder={'Enter location'}
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({location: text})}
          />
          <Text style={{paddingTop: 6}}> Or </Text>
          <Button
            color="#073763"
            title={'Get location'}
            onPress={() => this.getLocation()}
          />
        </View>
        <View style={styles.centerText}>
          <Text style={{fontSize: 18}}>Vehicle Info</Text>
        </View>
        <View style={styles.sameLine}>
          <Text style={styles.importantText}>* </Text>
          <Text style={{paddingTop: 6}}>Model:</Text>
          <TextInput
              style={styles.input}
            placeholder="Enter Vehicle Model"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({model: text})}
          />
          <Text style={{paddingTop: 6}}>Color:</Text>
          <TextInput
              style={styles.input}
              placeholder="Enter Vehicle Color"
              returnKeyLabel={'next'}
              onChangeText={text => this.setState({color: text})}
          />
        </View>
        <View style={styles.sameLine}>
          <Text style={{paddingTop: 6}}>Licence Plate:</Text>
          <TextInput
              style={styles.input}
            placeholder="Enter License Plate"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({plateNumber: text})}
          />
        </View>

        <View style={styles.sameLine}>
          <Text style={styles.importantText}>* </Text>
          <Text style={{paddingTop: 6}}>Date of Event:                 </Text>
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
              width: 75,
              height: 75,
              marginTop: 5,
              marginBottom: 5,
            }}
            source={{uri: this.state.imgPath}}
          />
        </View>

        <View style={styles.sameLine}>
          <Button
            color="#073763"
            title="Publish Report"
            onPress={() => this.publish()}
          />
        </View>
        <Text style={styles.importantText}>* Required Fields</Text>
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
    console.log('Now to get retrieve location from coordinates.');
    Geocoder.init('AIzaSyCiS4hoJgPXTRClfOUI-dBQ6hPkdgohqdc', {language: 'en'}); // set the language
    Geocoder.from(41.89, 12.49)
      .then(json => {
        var addressComponent = json.results[0].address_components[0];
        console.log(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  capture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
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
    this.setState({imgPath: ' '});
  };

  publish = () => {
    var missingFields = '';

    if (this.state.title == null) {
      missingFields += 'Title cannot be empty';
    }
    if (this.state.description == null) {
      missingFields += '\nDescription cannot be empty';
    }

    if (
      this.state.location == null &&
      (this.state.longitude == null && this.state.latitude == null)
    ) {
      missingFields += '\nLocation information cannot be empty';
    }
    if (this.state.model == null) {
      missingFields += '\nCar model information cannot be empty';
    }
    if (this.state.date == '') {
      missingFields += '\nDate information cannot be empty';
    }
    console.log(missingFields);

    if (missingFields == '') {
      this.setState({
        reportArray: null,
      });
      var title = this.state.title;
      var desc = this.state.description;
      var longitude = this.state.longitude;
      var latitude = this.state.latitude;
      var location = this.state.location;
      var model = this.state.model;
      var color = this.state.color;
      var plateNumber = this.state.plateNumber;
      var date = this.state.date;
      var img = this.state.imgPath;
      var upvotes = this.state.upvotes;
      var numCount = 0;
      var report = {
        title,
        desc,
        latitude,
        longitude,
        location,
        model,
        color,
        plateNumber,
        date,
        img,
        upvotes,
      };
      tempArray.push(report);

      console.log('title : ' + report.title);
      console.log('desc : ' + report.desc);
      console.log('latitude : ' + report.latitude);
      console.log('longitude : ' + report.longitude);
      console.log('location : ' + report.location);
      console.log('model : ' + report.model);
      console.log('color : ' + report.color);
      console.log('plate number : ' + report.plateNumber);
      console.log('date : ' + report.date);
      console.log('image data : ' + report.img);
      console.log('report array: ' + JSON.stringify(tempArray));

      var dataRef = firebase.database().ref('data');

      dataRef.once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          numCount++;
          console.log(numCount);
          this.setState({
            idNum: numCount,
          });
        });
      });

      setTimeout(function() {
        console.log('COUNT: ' + numCount.toString());
        dataRef.push().set({
          idNum: numCount,
          title: report.title,
          desc: report.desc,
          latitude: report.latitude,
          longitude: report.longitude,
          location: report.location,
          model: report.model,
          color: report.color,
          plateNumber: report.plateNumber,
          date: report.date,
          image: report.img,
          upvotes: report.upvotes,
        });
      }, 5000);
      Alert.alert(
          'Succesfully Published Report!'
      );
    }
    else{
      Alert.alert(
          'Error : Missing Fields',
          missingFields,
      );
    }
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    justifyContent: 'flex-start',
    textAlign: 'center',
    marginTop: 5,
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
  importantText: {
    paddingTop: 6,
    color: '#ff0000',
  },
  input: {
    margin: 5,
    height: 36,
    borderColor: '#073763',
    borderWidth: 1,
  },
  descriptionInput: {
    width: 250,
    margin: 5,
    height: 36,
    borderColor: '#073763',
    borderWidth: 1,
  },

});
