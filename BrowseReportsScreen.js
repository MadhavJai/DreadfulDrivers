import React from 'react';
import{
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

var reportArray = [];

export default class BrowseScreen extends React.Component {

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

        firebase.database().ref('data').once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                var reportKey = childSnapshot.key;
                var reportData = childSnapshot.val();
                reportArray.push(reportData);
                console.log(JSON.stringify(reportKey));
                console.log(JSON.stringify(reportData));
                console.log(JSON.stringify(reportArray));
            })
        });
    }

    render() {
        console.log(JSON.stringify(reportArray));
        return (
            // <View style={styles.container}>
                <FlatList
                    numColumns={1}
                    data={reportArray}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => this.selectReport()}>
                            <View style={styles.item}>
                                <Text  style={styles.title}>{item.idNum + 1}. {item.title}</Text>
                                <Text style={styles.subTitle}>{item.date}</Text>
                            </View>
                        </TouchableOpacity>

                    )}
                    keyExtractor={item => item.idNum}
                />
            // </View>
        );
    }

    selectReport = () => {
        Alert.alert("Clicked");
    }
}

const styles = StyleSheet.create({

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
