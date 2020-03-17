import React from 'react';
import {View, Text, Button, Linking} from 'react-native';

export default ({history}) => (
  <View>
    <Text>Project DD launch screen</Text>
    <Text>
      Should go to home screen automatically after one second. Right now it only
      does that with the press of a button.
    </Text>
    <Button title={'go to home screen'} onPress={() => history.push("/home")} />
    <Text>
      If you want to learn more about how I did this.
      <Text
        style={{color: 'blue'}}
        onPress={() =>
          Linking.openURL('https://www.youtube.com/watch?v=VYSIT2leZ1g')
        }>
        CLICK HERE
      </Text>
    </Text>
  </View>
);
