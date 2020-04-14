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
  PermissionsAndroid, ScrollView, RefreshControl,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import * as firebase from 'firebase';
import ImgToBase64 from 'react-native-image-base64';

const tempArray = [];


export default class ReportScreen extends React.Component {

  //mounting firebase to application, to read and write data being stored in the online database
  componentDidMount() {
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

  //initializing variables that will be used throughout the program
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
      plateNumber: '',
      date: '',
      imgPath: ' ',
    };
  }

  render() {
    const {date} = this.state;
    return (
      <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} >
        <View style={styles.horizontal}>
          <Text style={styles.importantText}>* </Text>
          <Text >Title of Incident</Text>
        </View>
        <TextInput
            style={styles.descriptionInput}
            placeholder="Enter Title"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({title: text})}
            ref={input => { this.title = input }}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#ff0000', marginTop: 12}}>* </Text>
          <Text style={{marginTop : 12}}>Description</Text>
        </View>
        <TextInput
            style={styles.descriptionInput}
            placeholder={'Enter description'}
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({description: text})}
            ref={input => { this.description = input }}
        />
        <View style={styles.sameLine}>
          <Text style={{color: '#ff0000', marginTop: 12}}>* </Text>
          <Text style={{marginTop : 12}}>Location:</Text>
          <TextInput
              style={styles.input}
            placeholder={'Enter location'}
            returnKeyLabel={'next'}
              value={this.state.location}
            onChangeText={text => this.setState({location: text})}
              ref={input => { this.location = input }}
          />
          <Text style={{marginTop: 12}}> Or   </Text>
          <View style={{height : 25, marginTop : 5}}>
          <Button
              color="#073763"
              title={'Get location'}
              onPress={() => this.getLocation()}
          />
          </View>
        </View>

        <View style={styles.centerText}>
          <Text style={{fontSize: 20, marginVertical: 0, color: '#073763'}}>Vehicle Info</Text>
        </View>
        <View style={styles.horizontal}>
          <Text style={styles.importantText2}>* </Text>
          <Text style={{marginTop : 6}}>Model:</Text>
        </View>
        <TextInput
            style={styles.descriptionInput}
            placeholder="Enter Vehicle Model"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({model: text})}
            ref={input => { this.model = input }}
        />
        <View style={styles.horizontal}>
          <Text style={styles.importantText2}>* </Text>
          <Text style={{marginTop : 3}}>Color:</Text>
        </View>
        <TextInput
            style={styles.descriptionInput}
            placeholder="Enter Vehicle Color"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({color: text})}
            ref={input => { this.color = input }}
        />
        <View style={styles.horizontal}>
          <Text style={{marginTop : 6}}>Licence Plate:</Text>
        </View>
        <TextInput
            style={styles.descriptionInput}
            placeholder="Enter License Plate"
            returnKeyLabel={'next'}
            onChangeText={text => this.setState({plateNumber: text})}
            ref={input => { this.plateNumber = input }}
        />

        <View style={styles.sameLine}>
          <Text style={styles.importantText2}>* </Text>
          <Text style={{marginTop : 6}}>Date of Event:            </Text>
          <DatePicker
            style={{width: 200, marginBottom: 10}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2020-01-01"
            maxDate={new Date()}
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
            }}
            onDateChange={date => {
              this.setState({date: date});
            }}
          />
        </View>

        <View style={styles.sameLine}>
          <Text style={{paddingTop: 6}}>Picture:     </Text>
          <View style={{marginRight: 12}}>
          <Button
            color="#073763"
            title="Take Picture"
            onPress={() => this.capture()}
            style={{marginRight: 5}}
          />
          </View>
          <Button
            color="#073763"
            title="Reset Picture"
            onPress={() => this.resetImage()}
          />
        </View>
        <View style={{borderWidth: 1}}>
          <Image
            key={this.state.imgPath}
            style={{
              width: 200,
              height: 200,
              marginTop: 5,
              marginBottom: 5,
            }}
            source={{uri: this.state.imgPath}}
          />
        </View>
        <Text style={styles.importantText2}>* Required Fields</Text>
        <View style={{marginTop: 5, marginBottom: 25}}>
          <Button
            color="#073763"
            title="Publish Report"
            onPress={() => this.publish()}
          />
        </View>

      </ScrollView>
      </View>
    );
  }

  //function called to retrieve location information using devices GPS
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
            var latitude = parseFloat(JSON.stringify(position.coords.latitude)).toFixed(2).toString();
            var longitude = parseFloat(JSON.stringify(position.coords.longitude)).toFixed(2).toString();



            Alert.alert(
              'Location Retrieved', "Latitude: " + latitude + "\nLongitude: " + longitude
            );
            this.setState({longitude: longitude});
            this.setState({latitude: latitude});
            this.setState({location : latitude + ',' + longitude});
          },
          error => {
            console.log(error.code, error.message);
          },
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    Geocoder.init('AIzaSyCiS4hoJgPXTRClfOUI-dBQ6hPkdgohqdc', {language: 'en'}); // set the language
    Geocoder.from(41.89, 12.49)
      .then(json => {
        var addressComponent = json.results[0].address_components[0];
        console.log(addressComponent);
      })
      .catch(error => console.warn(error));
  };

  //function used to open native camera and take picture, crop it and store it as Base64 Data URI
  capture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        ImgToBase64.getBase64String(image.path)
        .then(base64String => {

          this.setState({imgPath: "data:image/jpeg;base64," + base64String});
        })
        .catch(err => {
          Alert.alert("Error", "Something went wrong when encoding the image. Please try again");
        })


      })
      .catch(e => {
        //if picture is never taken, width and height states are updated
        Alert.alert('Picture Not Captured', 'Picture was not captured.');
      });
  };

  //function to reset image to blank
  resetImage = () => {
    this.setState({imgPath: ' '});
  };

  //function that retrievs all user inputted data, stores it into variables, and sends the data to oneline database (Firebase)
  publish = () => {
    var missingFields = 'Provide details in the following fields: \n';

    if (this.state.title == null) {
      missingFields += 'Title';
    }
    if (this.state.description == null) {
      missingFields += '\nDescription';
    }

    if (
      this.state.location == null &&
      (this.state.longitude == null && this.state.latitude == null)
    ) {
      missingFields += '\nLocation';
    }
    if (this.state.model == null) {
      missingFields += '\nCar Model';
    }
    if (this.state.color == null) {
      missingFields += '\nColor';
    }
    if (this.state.date == '') {
      missingFields += '\nDate information';
    }


    if (missingFields == 'Provide details in the following fields: \n') {
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
      };
      tempArray.push(report);

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
        });
      }, 5000);
      Alert.alert(
          'Succesfully Published Report!'
      );

      this.title.clear();
      this.setState({title : null});
      this.description.clear();
      this.setState({description : null});
      this.location.clear();
      this.setState({location : null});
      this.setState({latitude : null});
      this.setState({longitude : null});
      this.model.clear();
      this.setState({model : null});
      this.color.clear();
      this.setState({color : null});
      this.plateNumber.clear();
      this.setState({plateNumber : null});
      this.setState({date : ''});
      this.setState({imgPath: ' '});



    }
    else{
      Alert.alert(
          'Error in Publishing : Missing Fields',
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
    marginTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  sameLine: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  buttonSpace: {
    marginRight: 5,
  },
  centerText: {
    alignItems: 'center',
  },
  scrollView: {
    alignItems: 'center',
  },
  importantText: {
    color: '#ff0000',
  },
  importantText2: {
    marginTop: 6,
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
    height: 40,
    borderColor: '#073763',
    borderWidth: 1,
  },
  input2: {
    width: 100,
    margin: 5,
    height: 36,
    borderColor: '#073763',
    borderWidth: 1,
  },
  buttonSize: {
    height: 25,
  },

});
