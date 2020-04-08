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


const listData = [{ "id": 1,"title":"accident 1","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"vugcvig","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 2,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 3,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 4,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 5,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 6,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 7,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 8,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 9,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 10,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 11,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 12,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},
    {"id": 13,"title":"accident 2","latitude":"43.4941585","longitude":"-79.8709291","model":"8yv","color":"blue","plateNumber":"7tc","date":"2020-04-18","img":null},];

export default class BrowseScreen extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <FlatList
                    numColumns={1}
                    data={listData}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text  style={styles.title}>{item.id.toString()}. {item.title}</Text>
                            <Text style={styles.subTitle}>{item.date}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        );


    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    item: {
        backgroundColor: '#00ffff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 0,
    },
    title: {
        fontSize: 24,
    },
    subTitle: {
        fontSize: 16,
    },

});
