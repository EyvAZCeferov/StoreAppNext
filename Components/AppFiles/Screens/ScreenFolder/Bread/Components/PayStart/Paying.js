import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import firebase from "../../../../../Functions/FireBase/firebaseConfig";
import {StatusBar} from 'expo-status-bar';
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";

const {width, height} = Dimensions.get('window')
let lastPrice = 0
let edvhesabla = 0

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

export default class PayCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: true,
            selectedCard: this.props.cardNumb,
            cards: null,
            checks: null,
            checksCount: 0,
            priceAll: 0,
            edv: 0
        }
    }

    async getInfo() {
        if (this.state.selectedCard) {
            this.setState({refresh: true})
            firebase.database().goOnline();
            var user = firebase.auth().currentUser;
            if (user) {
                var dataW = null
                firebase
                    .database()
                    .ref('users/' + user.uid + '/cards/' + this.state.selectedCard)
                    .on('value', (data) => {
                        dataW = data.val();
                    });
                if (dataW == null) {
                    firebase
                        .database()
                        .ref('users/' + user.uid + '/bonuses/' + this.state.selectedCard)
                        .on('value', (data) => {
                            dataW = data.val();
                        });
                }
                this.setState({
                    cards: dataW,
                    refresh: false
                })
                this.countEDV()
                this.renderTopPanel()
            } else {
                this.props.navigation.goBack();
            }
        }
    }

    componentWillMount() {
        this.getInfo()
        setInterval(() => {
            this.getInfo()
        }, 1000)
    }

    priceCollector() {
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/checks/' + this.props.checkid + '/products/')
                .on('value', (data) => {
                    if (data.numChildren() > 0 && data != null) {
                        data.forEach((data) => {
                            datas.push(data.val());
                        });
                        this.setState({
                            checks: datas,
                            checksCount: data.numChildren()
                        })
                    }
                });
        }
    }

    price() {
        this.priceCollector();
        if (this.state.checks != null && this.state.checksCount > 0) {
            this.state.checks.map(element => {
                var elementPrice = parseFloat(element.price);
                lastPrice = lastPrice + elementPrice;
            })
            this.setState({priceAll: lastPrice})
        }
        lastPrice = 0
        return this.state.priceAll;
    }

    countEDV() {
        this.price();
        if (parseFloat(this.state.priceAll) > 0) {
            edvhesabla = (parseFloat(this.state.priceAll) * 18) / 100;
            this.setState({edv: edvhesabla})
        }
        edvhesabla = 0
        return this.state.edv;
    }

    balance(card) {
        if (card != null) {
            if (card.cvc) {
                return card.cvc
            } else {
                return card.price
            }
        }
    }

    lastBalance(card) {
        if (card != null) {
            let result = 0
            if (card.cvc) {
                result = parseFloat(card.cvc) - parseFloat(this.state.priceAll)
            } else {
                result = parseFloat(card.price) - parseFloat(this.state.priceAll)
            }
            return result
        }
    }

    renderCardDatas() {
        return (
            <View style={{
                backgroundColor: "#fff",
                width: width / 2.2,
                height: height / 3.334,
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
                        <MyText style={{
                            fontSize: 21,
                            fontWeight: "bold",
                            color: "#000",
                            marginTop: 14
                        }} children="Kart Haqqında"/>
                        <View style={{
                            width: '100%',
                            marginTop: 5,
                            flexDirection: "column-reverse",
                            justifyContent: "center"
                        }}>
                            <MyText style={{color: "rgba(0,0,0,.5)", fontSize: 14}} children="Kart Nömrəsi"/>
                            <MyText style={{
                                color: "#000",
                                fontSize: 18
                            }}
                                    children={this.state.cards != null ? this.hideNumb(this.state.cards.cardInfo.number) : '*********'}/>¶
                        </View>
                        <View style={{marginTop: 15}}/>
                        <View style={{
                            width: '100%',
                            marginTop: 5,
                            flexDirection: "column-reverse",
                            justifyContent: "space-around"
                        }}>
                            <MyText style={{color: "rgba(0,0,0,.5)", fontSize: 14}} children="Balans"/>
                            <MyText style={{
                                color: "#000",
                                fontSize: 18
                            }}
                                    children={this.state.cards != null ? this.balance(this.state.cards.cardInfo) + '₼' : 0 + '₼'}/>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderRight() {
        return (
            <View style={{
                backgroundColor: "#7c9d32",
                width: width / 2.6,
                height: height / 3.07,
                borderBottomLeftRadius: width / 5.2,
                borderTopLeftRadius: 0,
                flexDirection: "column",
                paddingHorizontal: 8,
                paddingVertical: 3
            }}>
                <MyText style={{fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 20}} children="Yekun
                    Məbləğ"/>
                <Text
                    style={{
                        color: "rgba(255,255,255,.5)",
                        fontSize: 17,
                        marginLeft: 5,
                        marginTop: 2,
                    }}>{this.state.priceAll} ₼</Text>
                <View style={{marginTop: 5, marginLeft: 5}}>
                    <MyText style={{color: "#fff", fontSize: 20, fontWeight: "bold"}} children="Qalan Məbləğ"/>
                    <MyText
                        style={{
                            color: "rgba(255,255,255,.5)",
                            fontSize: 17,
                            marginLeft: 5,
                            marginTop: 2,
                        }}
                        children={this.state.cards != null ? this.lastBalance(this.state.cards.cardInfo) + "₼" : 0 + "₼"}/>
                </View>
                <View style={{marginTop: 5, marginLeft: 5}}>
                    <MyText style={{color: "#fff", fontSize: 20, fontWeight: "bold"}} children="Ədv %"/>
                    <MyText
                        style={{
                            color: "rgba(255,255,255,.5)",
                            fontSize: 17,
                            marginLeft: 5,
                            marginTop: 2,
                        }} children={this.state.edv + '₼'}/>
                </View>
            </View>
        )
    }

    hideNumb(e) {
        var numb = e;
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

    renderTopPanel() {
        return (
            <View style={styles.cardCotnent}>
                {this.renderCardDatas()}
                {this.renderRight()}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#7c9d32" style='light'/>
                <View style={styles.cardArea}>
                    <View style={styles.card}>
                        {this.renderTopPanel()}
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
