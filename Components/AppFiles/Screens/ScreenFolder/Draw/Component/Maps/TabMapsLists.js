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
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";

function MyText(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });
    if (!fontsLoaded) {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    } else {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                fontFamily: "Poppins_400Regular"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    }
}


export default class TabMapsLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            maps: null,
            refreshing: true,
            loading: true
        };
    }

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

        function getKilom(latis, longis, valToDeg = true, resultAsMiles = true) {

            let C_RADIUS_EARTH_KM = 6371.1;
            let C_RADIUS_EARTH_MI = 3958.82;
            let C_PI = 3.14159265358979;
            let X = 1;
            if (valToDeg) {
                X = 1;
            } else {
                X = 24
            }

            // convert to decimal degrees
            let Lat1 = that.state.latitude * X;
            let Long1 = that.state.longitude * X;
            let Lat2 = latis * X;
            let Long2 = longis * X;


            Lat1 = (Lat1 / 180) * C_PI;
            Lat2 = (Lat2 / 180) * C_PI;
            Long1 = (Long1 / 180) * C_PI;
            Long2 = (Long2 / 180) * C_PI;
            let Delta = null
            if (Lat1 > Lat2 || Long1 > Long2) {
                Delta = (2 * Math.asin(Math.sqrt((Math.pow(Math.sin((Lat1 - Lat2) / 2), 2) + Math.cos(Lat1) * Math.cos(Lat2) * (Math.pow(Math.sin((Long1 - Long2) / 2), 2))))));
            } else {
                Delta = (2 * Math.asin(Math.sqrt((Math.pow(Math.sin((Lat2 - Lat1) / 2), 2) + Math.cos(Lat1) * Math.cos(Lat2) * (Math.pow(Math.sin((Long2 - Long1) / 2), 2))))));
            }
            let lastLoc = ""
            if (resultAsMiles) {
                lastLoc = (Delta * C_RADIUS_EARTH_MI);
            } else {
                lastLoc = (Delta * C_RADIUS_EARTH_KM);
            }
            let loc = lastLoc.toString()
            let mOrKm = resultAsMiles ? "M" : "KM"
            return loc.substr(0, 5) + " " + mOrKm
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
                    <MyText children={item.name}/>
                    <MyText children={item.address}/>
                </Body>
                <Right>
                    <Button transparent>
                        <MyText children={getKilom(item.coords.lat, item.coords.lng, true, false)} />
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
