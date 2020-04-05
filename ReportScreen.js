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

export default ({}) => (
  <View>
    <Text style={styles.title}>Publish Report</Text>
    <View style={styles.sameLine}>
      <Text>Title of Incident</Text>
      <TextInput>Input Title Here</TextInput>
    </View>
    <View style={styles.sameLine}>
      <Text>Location</Text>
      <TextInput>Geolocation Here</TextInput>
    </View>
    <View>
      <Text style={styles.subtitle}>Vehicle Info</Text>
    </View>
    <View style={styles.sameLine}>
      <Text>Model: </Text>
      <TextInput>Model Here</TextInput>
    </View>
    <View style={styles.sameLine}>
      <Text>Color: </Text>
      <TextInput>Color Here</TextInput>
    </View>
    <View style={styles.sameLine}>
      <Text>Licence Plate: </Text>
      <TextInput>Plate Number Here</TextInput>
    </View>

    <View style={styles.sameLine}>
      <Text>Time of event: </Text>
      <TextInput>Time using datepicker here</TextInput>
    </View>
    <View>
      <Text style={styles.subtitle}>Picture</Text>
    </View>
    <View style={styles.sameLine}>
      <Text>Take Picture: </Text>
      <Button color="#129b3c" title="Take Picture" onPress={() => capture()} />
      <Button
        color="#009cc4"
        title="Reset Picture"
        onPress={() => resetImage()}
      />
    </View>

    <View>
      <Button
        color="#129b3c"
        title="Publish Report"
        onPress={() => publish()}
      />
    </View>
  </View>
);

function capture() {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    //once promise is met, sets imgPath state to the images path
    var imgString = image.path;
  });
}
function resetImage() {
  var imgString = null;
}
function publish() {
  Alert.alert('Publish Called');
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
