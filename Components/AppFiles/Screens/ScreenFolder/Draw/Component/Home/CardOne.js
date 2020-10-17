import * as React from 'react';
import {StyleSheet, Dimensions, Text, View, Animated} from 'react-native';
import {Right, Left} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import {LinearGradient} from 'expo-linear-gradient';
import customStyle from '../../../../../../../assets/Theme';
import {t} from "../../../../../Lang";
import firebase from "../../../../../Functions/FireBase/firebaseConfig";
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";

const {width, height} = Dimensions.get('window');
export default function CardOne({index, y, item}) {
    const position = Animated.subtract(index * 200, y);
    const [cardCount, setCardCount] = React.useState(null)
    const isDissappering = -180;
    const isTop = 0;
    const isBottom = height - 200;
    const isAppering = height;
    const translateY = Animated.add(
        y,
        y.interpolate({
            inputRange: [0, 0.000001 + index * 100],
            outputRange: [0, -index * 180],
            extrapolateRight: 'clamp',
        })
    );

    function getCount() {
        var user = firebase.auth().currentUser;
        if (user) {
            var digit = null;
            firebase
                .database()
                .ref('users/' + user.uid + '/cards')
                .on('value', (data) => {
                    digit = digit + data.numChildren()
                });
            firebase
                .database()
                .ref('users/' + user.uid + '/bonuses')
                .on('value', (data) => {
                    digit = digit + data.numChildren()
                });
            firebase
                .database()
                .ref('users/' + user.uid + '/pinArena')
                .on('value', (data) => {
                    if (data.numChildren() != 0) {
                        digit = digit + 1
                    }
                })
            setCardCount(digit)
            renderCards()
        }
    }

    React.useEffect(() => {
        getCount()
    }, [])

    const scale = position.interpolate({
        inputRange: [isDissappering, isTop, isBottom, isAppering],
        outputRange: [0.95, 0.9, 0.9, 0.95],
        extrapolate: 'clamp',
    });

    const opacity = position.interpolate({
        inputRange: [isDissappering, isTop, isBottom, isAppering],
        outputRange: [0, 1, 1, 0],
    });

    function hideNumb(e) {
        var numb = e;
        //use slice to remove first 12 elements
        let first12 = numb.slice(4, 12);
        //define what char to use to replace numbers
        let char = '*'
        let repeatedChar = ""
        if (numb.length == 16 || numb.length == 12 || numb.length > 12) {
            repeatedChar = char.repeat(numb.length - 14);
        } else {
            repeatedChar = char.repeat(numb.length - 8);
        }
        // replace numbers with repeated char
        first12 = first12.replace(first12, repeatedChar);
        //concat hidden char with last 4 digits of input
        let hiddenNumbers = numb.slice(0, 4) + first12 + numb.slice(numb.length - 4);
        //return
        return hiddenNumbers;
    }

    const cardBgColors = [
        [
            'rgb(52,85,255)',
            'rgba(52,85,255,0.85)'
        ],
        [
            'rgb(130,70,155)',
            'rgba(130,70,155,0.85)'
        ],
        [
            'rgb(143,52,255)',
            'rgba(143,52,255,0.85)'
        ],
        [
            'rgb(103,152,255)',
            'rgba(103,152,255,0.85)'
        ],
        [
            'rgb(255,195,52)',
            'rgba(255,195,52,0.85)',
        ],
        [
            'rgb(191,54,12)',
            'rgba(191,54,12,0.85)'
        ],
        [
            'rgb(234,50,29)',
            'rgba(234,50,29,0.85)'
        ],
        [
            'rgb(78,52,46)',
            'rgba(78,52,46,0.85)'
        ],
        [
            'rgb(66,66,66)',
            'rgba(66,66,66,0.85)'
        ],
        [
            'rgb(49,27,146)',
            'rgba(49,27,146,0.85)'
        ],
        [
            'rgb(240,98,146)',
            'rgba(240,98,146,0.85)'
        ],
        [
            'rgb(130,119,23)',
            'rgba(130,119,23,0.85)'
        ],
        [
            'rgb(0,230,118)',
            'rgba(0,230,118,0.85)'
        ],
        [
            'rgb(255,213,79)',
            'rgba(255,213,79,0.85)'
        ],
        [
            'rgb(129,199,132)',
            'rgba(129,199,132,0.85)'
        ],
        [
            'rgb(103,80,101)',
            'rgba(103,80,101,0.85)'
        ],
        [
            'rgb(1,80,101)',
            'rgba(1,80,101,0.85)'
        ],
        [
            'rgb(2,123,121)',
            'rgba(2,123,121,0.85)'
        ]
    ]

    function bounces() {
        var elements = []
        for (let i = 0; i < cardCount; i++) {
            const clear = index == i ? {
                width: 15,
                height: 7,
                borderRadius: 3,
                backgroundColor: cardBgColors[i][1]
            } : {backgroundColor: cardBgColors[i][1]}
            elements.push(
                <View key={i} style={[styles.cardCount, clear]}/>
            )
        }
        return elements;
    }

    function cardCountBounces() {
        return (
            <View style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 40,
                height: '100%',
                flexDirection: "column",
                justifyContent: "space-around",
                backgroundColor: "transparent",
                alignItems: "center",
                alignContent: "center",
                zIndex: 4
            }}>
                {bounces()}
            </View>
        )
    }

    function renderCards() {
        return (
            <Animated.View
                key={index}
                style={[styles.slide, {opacity, transform: [{translateY}, {scale}]}]}>
                <LinearGradient
                    style={styles.cardBg}
                    colors={cardBgColors[index]}>
                    <View style={styles.rightSec}>
                        <Left style={styles.left}>
                            <View style={[styles.leftPattern, styles.bigPattern]}/>
                            <View
                                style={[styles.leftPattern, styles.littlePattern, {backgroundColor: cardBgColors[index][1]}]}/>
                            <MyText
                                style={styles.priceText}
                                children={item.cardInfo.cvc ? item.cardInfo.cvc + ' ₼' : item.cardInfo.price + ' ₼'}/>
                        </Left>
                        <Right style={styles.right}>
                            <MyText style={styles.rightText} children={item.cardInfo.type}/>
                        </Right>
                    </View>
                    <View style={styles.centerCardNum}>
                        <View>
                            <MyText style={styles.cardNumbText} children={hideNumb(item.cardInfo.number)}/>
                        </View>
                    </View>
                    <View style={styles.cardInfos}>
                        <View>
                            <Grid>
                                <Col style={customStyle.padding5}>
                                    <MyText
                                        style={styles.gridInfoNameSurnameDynamic}
                                        children="John Doe"/>
                                    <MyText
                                        style={[styles.gridInfoNameSurnameDynamic, styles.gridInfoNameSurnameStatic]}
                                        children={t('namesurname')}/>
                                </Col>
                                <Col style={styles.gridInfoMonthYear}>
                                    <MyText style={styles.monthYearText}
                                            children={item.cardInfo.expiry}/>
                                    <MyText
                                        style={[styles.monthYearText, styles.monthYearUnderText]}
                                        children={t('expiry')}/>
                                </Col>
                            </Grid>
                        </View>
                    </View>
                    <View style={{
                        height: "70%",
                        borderColor: "#fff",
                        width: 40,
                        position: "absolute",
                        top: -1,
                        right: 0,
                        backgroundColor: "#fff",
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 15,
                    }}>
                        {cardCountBounces()}
                    </View>
                </LinearGradient>
            </Animated.View>
        )
    }

    return (
        <View>
            {renderCards()}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: width,
        height: 201,
        backgroundColor: "red"
    },
    slide: {
        width: width,
        height: 182,
        justifyContent: 'center',
        alignItems: "center",
        alignContent: "center"
    },
    cardBg: {
        borderRadius: 20,
        height: 190,
        width: 350,
    },
    rightSec: {
        width: 290,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        height: 80,
    },
    left: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 0,
        margin: 0,
        width: '50%',
        height: '80%',
        flexDirection: "row",
        backgroundColor: 'transparent',
        justifyContent: "space-between",
        borderTopLeftRadius: 19
    },
    leftPattern: {
        width: "100%",
        backgroundColor: "transparent",
        borderBottomRightRadius: 70,
        borderTopLeftRadius: 19
    },
    bigPattern: {
        width: '74%',
        height: '80%',
        backgroundColor: "#fff",
        zIndex: 2
    },
    littlePattern: {
        position: "absolute",
        top: '11%',
        width: '64%',
        height: '50%',
        zIndex: 3,
    },
    priceText: {
        position: "absolute",
        top: '19%',
        width: '55%',
        height: '45%',
        zIndex: 4,
        fontSize: 19,
        lineHeight: 19,
        paddingBottom: 0,
        color: "#fff",
        fontWeight: "bold",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    cardCount: {
        width: 10,
        height: 5,
        borderRadius: 2,
        backgroundColor: "transparent",
        marginBottom: 3,
        zIndex: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    right: {
        position: 'absolute',
        top: '19%',
        right: 0,
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent',
    },
    rightText: {
        fontSize: 27,
        lineHeight: 27,
        color: '#fff',
        fontWeight: 'bold',
        fontStyle: "italic",
        textTransform: "uppercase"
    },
    centerCardNum: {
        position: 'absolute',
        top: '40%',
        left: '5%',
    },
    cardNumbText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
        letterSpacing: 1.5,
    },
    cardNumbTextUnderText: {
        fontSize: 13,
        marginTop: 10,
        paddingLeft: 5,
        fontWeight: 'normal',
    },
    cardInfos: {
        position: 'absolute',
        top: '65%',
        left: '4%',
        width: 350,
    },
    gridInfoNameSurnameDynamic: {
        color: '#fff',
        fontSize: 16,
        marginTop: -1,
        fontWeight: 'bold',
    },
    gridInfoNameSurnameStatic: {
        marginTop: 0,
        fontWeight: 'normal',
    },
    gridInfoMonthYear: {
        position: 'absolute',
        top: -3,
        right: '5%',
        paddingHorizontal: 20,
    },
    monthYearText: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#fff',
        paddingTop: 5,
    },
    monthYearUnderText: {
        fontWeight: 'normal',
        marginTop: -5,
        fontSize: 14,
        marginLeft: 4,
    },
});


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
