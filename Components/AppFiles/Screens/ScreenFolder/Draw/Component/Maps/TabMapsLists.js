import * as React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    View,
    FlatList,
} from 'react-native';
import {
    Button,
    List,
    ListItem,
    Thumbnail,
    Left,
    Right,
    Body,
} from 'native-base';
import * as Permissions from 'expo-permissions';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import firebase from '../../../../../Functions/FireBase/firebaseConfig';
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

export default class TabMapsLists extends React.Component {
    state = {
        latitude: null,
        longitude: null,
        maps: null,
        refreshing: true,
        loading: true
    };

    async getInfo() {
        firebase.database().goOnline()
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('maps')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({
                        maps: datas,
                        refreshing: false,
                        loading: false,
                    });
                });
        } else {
            this.props.navigation.navigate('Home');
        }
    }

    componentDidMount() {
        this.getInfo();
        this.getPerm();
    }

    componentWillUnmount() {
        firebase.database().goOffline();
    }

    async getPerm() {
        const {status} = await Permissions.getAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            const response = await Permissions.askAsync(Permissions.LOCATION);
        }
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) =>
                this.setState({latitude, longitude}),
            (error) => console.log('Error:', error)
        );
    }

    renderLoc({item, index}) {
        var that = this;

        function getKilom(latis, longis) {
            var hesablaLong = longis - that.state.longitude;
            var hesablaLat = latis - that.state.latitude;
            var kokalti = Math.sqrt(hesablaLong * hesablaLong + hesablaLat * hesablaLat)
            return Math.ceil(kokalti*100);
        }

        return (
            <ListItem style={styles.firstList} thumbnail key={index}>
                <Left>
                    <Thumbnail
                        square
                        source={{
                            uri: item.image_url,
                        }}
                        style={styles.thumbImage}
                    />
                </Left>
                <Body>
                    <Text>{item.name}</Text>
                    <Text>{item.address}</Text>
                </Body>
                <Right>
                    <Button transparent>
                        <Text>{getKilom(item.coords.lat, item.coords.lng)} M</Text>
                    </Button>
                </Right>
            </ListItem>
        );
    }

    renderRefreshLists() {
        return (
            <ScrollView>
                <ShimmerPlaceholder
                    visible={false}
                    isInteraction={true}
                    style={{width: width, height: 90, marginBottom: 15}}
                />
                <ShimmerPlaceholder
                    visible={false}
                    isInteraction={true}
                    style={{width: width, height: 90, marginBottom: 15}}
                />
                <ShimmerPlaceholder
                    visible={false}
                    isInteraction={true}
                    style={{width: width, height: 90, marginBottom: 15}}
                />
                <ShimmerPlaceholder
                    visible={false}
                    isInteraction={true}
                    style={{width: width, height: 90, marginBottom: 15}}
                />
                <ShimmerPlaceholder
                    visible={false}
                    isInteraction={true}
                    style={{width: width, height: 90, marginBottom: 15}}
                />
                <ShimmerPlaceholder
                    visible={false}
                    isInteraction={true}
                    style={{width: width, height: 90, marginBottom: 15}}
                />
            </ScrollView>
        )
    }

    render() {
        return (
            <View>
                <View style={styles.f1}>
                    <ScrollView style={styles.scrollrecent}>
                        <List style={styles.w100}>
                            {this.state.refreshing || this.state.loading ?
                                this.renderRefreshLists() :
                                (
                                    <FlatList
                                        style={styles.w100}
                                        data={this.state.maps}
                                        renderItem={this.renderLoc.bind(this)}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                )}
                        </List>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    f1: {
        width: width,
        height: height,
    },
    scrollrecent: {
        flex: 1,
        width: width,
    },
    w100: {
        width: width,
    },
    firstList: {
        marginTop: 15,
    },
    thumbImage: {
        borderRadius: 100,
    },
});
