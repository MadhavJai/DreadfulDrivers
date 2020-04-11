import React from 'react';
import {View, Text, Button, Linking, Image, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default ({history}) => (
  <View style={styles.container}>
    <Text>Dreadful Drivers</Text>
    <Text>By: Arjun Suthaharan and Madhav Jaisankar</Text>
    <Image
      style={{
        width: 500,
        height: 500,
      }}
      source={require('./logo.png')}
    />
  </View>
);

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
