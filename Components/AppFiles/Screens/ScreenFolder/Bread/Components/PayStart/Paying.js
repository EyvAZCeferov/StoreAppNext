import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import firebase from "../../../../../Functions/FireBase/firebaseConfig";

const {width, height} = Dimensions.get('window')

export default function PayCards(props) {

    const [refresh, setRefresh] = React.useState(true);
    const [selectedCard, setSelectedCard] = React.useState(props.cardNumb);
    const [cards, setCards] = React.useState(null);
    const [checks, setChecks] = React.useState(null);
    const [priceAll, setPriceAll] = React.useState(15)

    function getInfo() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        if (user) {
            firebase
                .database()
                .ref('users/' + user.uid + '/cards/' + selectedCard)
                .on('value', (data) => {
                        var dataW = data.val();
                        setCards(dataW);
                        setRefresh(false)
                    }
                );
        } else {
            props.navigation.goBack();
        }
    }

    React.useEffect(() => {
        getInfo();
    }, [])

    async function handleRefresh() {
        this.getInfo();
        this.setState({refresh: false})
    }

    function priceCollector() {
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/checks/' + props.checkid)
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    setChecks(datas);
                });
        } else {
            alert('Connection Problem');
        }
    }

    function price() {
        priceCollector();
        let result = 0;
        checks.map(element => {
            result += element.price;
        })
        return result;
    }

    function renderCardDatas() {
        return (
            <View style={{
                backgroundColor: "#fff",
                width: width / 2.2,
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
                        <Text style={{
                            fontSize: 21,
                            fontWeight: "bold",
                            color: "#000",
                            marginTop: 14
                        }}>Kart Haqqında</Text>
                        <View style={{
                            width: '100%',
                            marginTop: 5,
                            flexDirection: "column-reverse",
                            justifyContent: "center"
                        }}>
                            <Text style={{color: "rgba(0,0,0,.5)", fontSize: 14}}>Kart Nömrəsi</Text>
                            <Text style={{
                                color: "#000",
                                fontSize: 18
                            }}>{cards != null ? hideNumb(cards.cardInfo.number) : '*********'} </Text>
                        </View>
                        <View style={{marginTop: 15}}/>
                        <View style={{
                            width: '100%',
                            marginTop: 5,
                            flexDirection: "column-reverse",
                            justifyContent: "space-around"
                        }}>
                            <Text style={{color: "rgba(0,0,0,.5)", fontSize: 14}}>Balans</Text>
                            <Text style={{
                                color: "#000",
                                fontSize: 18
                            }}>{cards != null ? cards.cardInfo.cvc : 0} ₼</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function renderRight() {
        return (
            <View style={{
                backgroundColor: "#7c9d32",
                width: width / 2.6,
                height: height / 3.03,
                borderBottomLeftRadius: width / 5.2,
                borderTopLeftRadius: 0,
                flexDirection: "column",
                paddingHorizontal: 8,
                paddingVertical: 3
            }}>
                <Text style={{fontSize: 20, fontWeight: "bold", color: "#fff", marginTop: 20}}>Yekun
                    Məbləğ</Text>
                <Text
                    style={{
                        color: "rgba(255,255,255,.5)",
                        fontSize: 17,
                        marginLeft: 5,
                        marginTop: 2,
                    }}>{price()} ₼</Text>
                <View style={{marginTop: 5, marginLeft: 5}}>
                    <Text style={{color: "#fff", fontSize: 20, fontWeight: "bold"}}>Qalan Məbləğ</Text>
                    <Text
                        style={{
                            color: "rgba(255,255,255,.5)",
                            fontSize: 17,
                            marginLeft: 5,
                            marginTop: 2,
                        }}>{cards != null ? parseInt(cards.cardInfo.cvc) - parseInt(priceAll) : 0} ₼</Text>
                </View>
                <View style={{marginTop: 5, marginLeft: 5}}>
                    <Text style={{color: "#fff", fontSize: 20, fontWeight: "bold"}}>Ədv %</Text>
                    <Text
                        style={{
                            color: "rgba(255,255,255,.5)",
                            fontSize: 17,
                            marginLeft: 5,
                            marginTop: 2,
                        }}>{cards != null ? parseInt(cards.cardInfo.cvc) - parseInt(priceAll) : 0} ₼</Text>
                </View>
            </View>
        )
    }


    function hideNumb(e) {
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

    return (
        <View style={styles.container}>
            <View style={styles.cardArea}>
                <View style={styles.card}>
                    <View style={styles.cardCotnent}>
                        {renderCardDatas()}
                        {renderRight()}
                    </View>
                </View>
            </View>
        </View>
    )

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