import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {
  NativeRouter,
  Switch,
  Route,
  Link,
  BackButton,
} from 'react-router-native';

export default () => (
  <View style={styles.container}>
    <Text style={{marginBottom: 100, textAlign: 'center'}}>Dreadful Drivers</Text>
    <Button style={styles.button1} title={'Publish a report'} onPress={() => 5} />
    <Button style={styles.button1} title={'Browse reports'} onPress={() => 5} />
    <Button
      style={styles.button1}
      title={'Back to launch screen'}
      onPress={() => 5}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  button1: {
    marginBottom: 10,
  },
});
