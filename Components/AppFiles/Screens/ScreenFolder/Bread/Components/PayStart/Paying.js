import React from 'react';
import {View, Text, StyleSheet, Dimensions, ImageBackground, ScrollView, FlatList} from 'react-native';
import {AntDesign, Feather, Ionicons, FontAwesome} from '@expo/vector-icons';
import firebase from "../../../../../Functions/FireBase/firebaseConfig";
import {Tooltip} from 'react-native-elements';

const {width, height} = Dimensions.get('window')

export default class PayCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: null,
            refresh: true,
        };
    }

    async getInfo() {
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/cards')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({
                        cards: datas,
                        refresh: false
                    });
                });
        } else {
            this.props.navigation.navigate('CreateAccount');
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    async handleRefresh() {
        this.getInfo();
        this.setState({refresh: false})
    }

    price() {
        return '0.00'
    }

    renderCards({item, index}) {
        function hideNumb() {
            var numb = item.cardInfo.number;
            //use slice to remove first 12 elements
            let first12 = numb.slice(4, 14);
            //define what char to use to replace numbers
            let char = '*'
            let repeatedChar = char.repeat(numb.length - 14);
            // replace numbers with repeated char
            first12 = first12.replace(first12, repeatedChar);
            //concat hidden char with last 4 digits of input
            let hiddenNumbers = numb.slice(0, 4) + first12 + numb.slice(numb.length - 4);
            //return
            return hiddenNumbers;
        }

        return (
            <View style={styles.cardOne} key={index}>
                <Text style={styles.cardOnePass}>{hideNumb()}</Text>
                <Text style={styles.cardOneVal}>{item.cardInfo.cvc}Azn</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardArea}>
                    <View style={styles.card}>
                        <View style={styles.cardCotnent}>
                            <View style={{
                                backgroundColor: "#fff",
                                width: width / 1.94,
                                height: height / 3,
                                borderRadius: 12
                            }}>
                                <View style={{
                                    justifyContent: "space-between",
                                    flex: 1,
                                    flexDirection: "column",
                                    marginVertical: 10,
                                    paddingHorizontal: 15
                                }}>
                                    <View>
                                        <Text style={{fontSize: 20, fontWeight: "bold"}}>Balans</Text>
                                        <View style={{width: '100%', height: 100, marginTop: 5}}>
                                            <FlatList style={{width: '100%', height: 100, paddingHorizontal: 5}}
                                                      data={this.state.cards} refreshing={this.state.refresh}
                                                      onRefresh={this.handleRefresh}
                                                      keyExtractor={(index) => index}
                                                      renderItem={this.renderCards}/>
                                        </View>
                                    </View>
                                    <View style={{marginTop: 5}}>
                                        <Text style={{fontSize: 25, fontWeight: "bold"}}>Yekun Məbləğ</Text>
                                        <Text
                                            style={{
                                                color: "rgba(0,0,0,.5)",
                                                fontSize: 15,
                                                marginLeft: 5
                                            }}>{this.price()}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                backgroundColor: "#7c9d32",
                                width: width / 3,
                                height: height / 3.03,
                                borderBottomLeftRadius: width / 5.2,
                                borderTopLeftRadius: 0,
                                flexDirection: "column",
                                paddingHorizontal: 8,
                                paddingVertical: 15
                            }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    alignContent: "center"
                                }}>
                                    <Tooltip popover={<Text>Info here</Text>}>
                                        <AntDesign name="shoppingcart" size={30} color="#fff"/>
                                    </Tooltip>
                                    <Tooltip popover={<Text>Info here</Text>}>
                                        <Feather name="shopping-bag"
                                                 size={29} color="#fff"/>
                                    </Tooltip>
                                </View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    alignContent: "center"
                                }}>
                                    <Tooltip popover={<Text>Info here</Text>}>
                                        <AntDesign name="mobile1" size={24} color="#fff"/>
                                    </Tooltip>
                                </View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    alignContent: "center",
                                }}>
                                    <Tooltip popover={<Text>Info here</Text>}>
                                        <Ionicons name="ios-qr-scanner" style={{marginLeft: 10}}
                                                  size={28} color="#fff"/>
                                    </Tooltip>
                                    <Tooltip popover={<Text>Info here</Text>}>
                                        <FontAwesome name="barcode" style={{marginLeft: 15}} size={27} color="#fff"/>
                                    </Tooltip>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    cardArea: {
        width: width,
        height: height,
        backgroundColor: "#7c9d32",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
    card: {
        width: width - 50,
        height: height / 3,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#fff",
    },
    cardCotnent: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    cardOne: {
        flex: 1,
        flexDirection: "row",
        paddingLeft: 3,
        paddingVertical: 3,
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center"
    },
    cardOnePass: {
        color: "rgba(0,0,0,.5)",
        fontSize: 14,
    },
    cardOneVal: {
        fontSize: 15,
        color: "#7c9d32"
    }
})