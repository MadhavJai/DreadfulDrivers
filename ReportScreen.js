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
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

export default class ReportScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      location: null,
      model: null,
      color: null,
      plateNumber: null,
      dateofEvent: null,
      imgPath: null,
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Publish Report</Text>
        <View style={styles.sameLine}>
          <Text>Title of Incident</Text>
          <TextInput
            placeholder="Enter Title"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({title: text})}
          />
        </View>
        <View style={styles.sameLine}>
          <Text>Location</Text>
          <TextInput
            placeholder="Enter Location (will be replaced with geolocation)"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({location: text})}
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
          <TextInput
            placeholder="Enter Time (will be replaced with datepicker)"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({dateofEvent: text})}
          />
        </View>

        <View style={styles.sameLine}>
          <Text>Picture of Driver: </Text>
          <Button
            color="#129b3c"
            title="Take Picture"
            onPress={() => this.capture()}
          />
          <Button
            color="#009cc4"
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
            color="#129b3c"
            title="Publish Report"
            onPress={() => this.publish()}
          />
        </View>
      </View>
    );
  }

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
    Alert.alert('Publish Called YEET');
    console.log('test');
    var title = this.state.title;
    var location = this.state.location;
    var model = this.state.model;
    var color = this.state.color;
    var plateNumber = this.state.plateNumber;
    var date = this.state.dateofEvent;
    var img = this.state.imgPath;

    var report = {title, location, model, color, plateNumber, date, img};
    console.log('title : ' + report.title);
    console.log('location : ' + report.location);
    console.log('model : ' + report.model);
    console.log('color : ' + report.color);
    console.log('plate number : ' + report.plateNumber);
    console.log('date : ' + report.date);
    console.log('image data : ' + report.img);
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
