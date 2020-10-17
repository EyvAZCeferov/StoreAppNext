import React from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import {StatusBar} from 'expo-status-bar'
import {Thumbnail, List, ListItem} from 'native-base'
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";
import {t} from "../../../../../Lang";
import {AntDesign} from "@expo/vector-icons";
import firebase from "../../../../../Functions/FireBase/firebaseConfig";

const {width, height} = Dimensions.get("window")

function MyText(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });
    if (!fontsLoaded) {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                textAlign: "center"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    } else {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                textAlign: "center",
                fontFamily: "Poppins_400Regular"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    }
}

const pinIcon = require("../../../../../../../assets/images/pin/pinImage.jpeg")

export default class PinAbout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            pinData: null,
            userData: null,
            checks: null
        }
    }

    getInfo() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = []
            var numData = 0
            firebase
                .database()
                .ref('users/' + user.uid + '/userInfos')
                .on('value', (data) => {
                    var datasss = data.toJSON()
                    var usArr = JSON.stringify(datasss)
                    this.setState({userData: usArr})
                });
            firebase
                .database()
                .ref('users/' + user.uid + '/pinArena/1')
                .on('value', (data) => {
                    var datasss = data.toJSON()
                    var pinArr = JSON.stringify(datasss)
                    this.setState({pinData: pinArr})
                });
            firebase
                .database()
                .ref('users/' + user.uid + '/pinArena/1/shoppings/')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    numData = data.numChildren()
                });
            if (numData != 0) {
                this.setState({checks: datas})
            }
            this.setState({refresh: false})
            this.renderContent()
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    componentWillMount() {
        this.getInfo()
    }

    renderFlatListDatas({item, index}) {
        var that = this

        function convertStampDate(unixtimestamp) {

            var months_arr = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

            var date = new Date(unixtimestamp * 1000);

            var year = date.getFullYear();

            var month = months_arr[date.getMonth()];

            var day = date.getDate();

            var hours = date.getHours();

            var minutes = "0" + date.getMinutes();

            var seconds = "0" + date.getSeconds();

            var fulldate = day + ' ' + month + ' ' + 2020 + ' ' + hours + ':' + minutes.substr(-2);

            return fulldate;
        }

        return (
            <ListItem onPress={() =>
                that.props.navigation.navigate("OtherPages", {
                    screen: 'OneCheck',
                    params: {
                        checkid: item.checkId,
                    }
                })
            }
                      key={index} style={{flexDirection: "row", justifyContent: "space-between", padding: 10}}>
                <View>
                    <AntDesign name="shoppingcart" color="#7c9d32" size={24}/>
                </View>
                <View>
                    <MyText children={convertStampDate(item.date)} style={{textAlign: "left"}}/>
                </View>
                <View>
                    <MyText textColor="#7c9d32" style={{fontWeight: "bold"}} children={"+ " + item.price}/>
                </View>
            </ListItem>
        )
    }

    onHandleRefresh() {
        var that = this
        that.setState({refresh: true})
        that.getInfo()
    }

    renderFlatList() {
        if (this.state.checks != null) {
            return (
                <List>
                    <FlatList
                        data={this.state.checks}
                        renderItem={this.renderFlatListDatas.bind(this)}
                        refreshing={this.state.refresh}
                        onRefresh={this.onHandleRefresh.bind(this)}/>
                </List>
            )
        } else {
            return (
                <View style={styles.alignCenter}>
                    <MyText style={styles.nullObject} children={t('noResult')}/>
                </View>
            )
        }
    }

    renderImage(usDatas) {
        if (this.state.refresh) {
            return (
                <View style={{width: "100%", height: "100%"}}>
                    <ActivityIndicator size="large" color="#fff"/>
                </View>
            )
        } else {
            return (
                <Thumbnail
                    source={usDatas.profPic ? {uri: usDatas.profPic} : pinIcon}
                    large circular/>
            )
        }

    }

    renderContent() {
        if (this.state.refresh) {
            return (
                <View style={[styles.container, styles.alignCenter]}>
                    <ActivityIndicator size="large" color="#7c9d32"/>
                </View>
            )
        } else {
            var usDatas = JSON.parse(this.state.userData)
            var pinInfo = JSON.parse(this.state.pinData)
            if (usDatas != null) {
                return (
                    <View style={styles.container}>
                        <StatusBar backgroundColor="#7c9d32" style="light"/>
                        <View style={styles.header}>
                            <View style={[styles.alignCenter, {height: "100%", paddingTop: 20}]}>
                                <View style={{flexDirection: "row", justifyContent: "space-between", width: width}}>
                                    <TouchableOpacity style={{paddingLeft: width / 23}}
                                                      onPress={() => this.props.navigation.goBack()}>
                                        <AntDesign name="back" color="#fff"
                                                   size={24}/>
                                    </TouchableOpacity>
                                    {this.renderImage(usDatas)}
                                    <View style={{width: width / 9}}/>
                                </View>
                                <MyText children={usDatas.email}
                                        style={{fontWeight: "bold", marginVertical: 15}}
                                        textColor={'#fff'}/>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    width: "100%",
                                }}>
                                    <MyText textColor={'#fff'} style={{fontWeight: "bold"}}
                                            children={"Pin saylarınız"}/>
                                    <MyText textColor={'#fff'} style={{fontSize: 22}}
                                            children={pinInfo.cardInfo.price}/>
                                </View>
                            </View>
                        </View>
                        <View style={styles.content}>
                            {this.renderFlatList()}
                        </View>
                    </View>
                )
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#7c9d32" style="light"/>
                {this.renderContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: width,
        height: (height / 2) - 80,
        backgroundColor: "#7c9d32"
    },
    alignCenter: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        alignContent: "center",
        height: "100%"
    },
    nullObject: {
        color: '#D50000',
        fontSize: 22,
        fontWeight: 'bold',
    },
    content: {
        width: width,
        height: (height / 2) + 80
    }
})
