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

import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

var tempArray = [];

export default class ReportScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      longitude: null,
      latitude: null,
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
          <Text>Title of Incident</Text>
          <TextInput
            style={{height: 40}}
            placeholder="Enter Title"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({title: text})}
          />
        </View>
        <View style={styles.sameLine}>
          <Text>Location</Text>
          <Button
            color="#073763"
            title={'Get location'}
            onPress={() => this.getLocation()}
          />
        </View>
        <View style={styles.centerText}>
          <Text>Vehicle Info</Text>
        </View>
        <View style={styles.sameLine}>
          <Text>Model: </Text>
          <TextInput
            placeholder="Enter Vehicle Model"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({model: text})}
          />
        </View>
        <View style={styles.sameLine}>
          <Text>Color: </Text>
          <TextInput
            placeholder="Enter Vehicle Color"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({color: text})}
          />
        </View>
        <View style={styles.sameLine}>
          <Text>Licence Plate: </Text>
          <TextInput
            placeholder="Enter License Plate"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({plateNumber: text})}
          />
        </View>

        <View style={styles.sameLine}>
          <Text>Date of Event: </Text>
          <DatePicker
            style={{width: 200}}
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
          <Text>Picture of Driver: </Text>
          <Button
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
              width: 100,
              height: 100,
              marginTop: 25,
              marginBottom: 25,
            }}
            source={{uri: this.state.imgPath}}
          />
        </View>

        <View>
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
      var granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Allow Location Usage?',
          message: 'Dreadful Drivers needs access to your location ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission granted!");
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
    tempArray = [];
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
