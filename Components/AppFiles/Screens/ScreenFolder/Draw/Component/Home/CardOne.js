import * as React from 'react';
import {StyleSheet, Dimensions, Text, SafeAreaView, View, FlatList, Animated} from 'react-native';
import {Right, Left} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import {LinearGradient} from 'expo-linear-gradient';
import customStyle from '../../../../../../../assets/Theme';
import {t} from "../../../../../Lang";

const {width, height} = Dimensions.get('window');
export default function CardOne({index, y, item}) {
    const position = Animated.subtract(index * 200, y);
    const isDissappering = -200;
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

    const cardBgColors = [
        [
            'rgb(52,85,255)',
            'rgba(52,85,255,0.85)'
        ],
        [
            'rgb(143,52,255)',
            'rgba(143,52,255,0.85)'
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
        ]
    ]

    return (
        <Animated.View key={index}
                       style={[styles.slide, {opacity, transform: [{translateY}, {scale}]}]}>
            <LinearGradient
                style={styles.cardBg}
                colors={cardBgColors[index]}>
                <View style={styles.rightSec}>
                    <Left style={styles.left}>
                        <View style={[styles.leftPattern, styles.bigPattern]}/>
                        <View style={[styles.leftPattern, styles.littlePattern]}/>
                        <Text style={styles.priceText}>120 ₼</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text style={styles.rightText}>{item.cardInfo.type}</Text>
                    </Right>
                </View>
                <View style={styles.centerCardNum}>
                    <View>
                        <Text style={styles.cardNumbText}>{hideNumb(item.cardInfo.number)}</Text>
                    </View>
                </View>
                <View style={styles.cardInfos}>
                    <View>
                        <Grid>
                            <Col style={customStyle.padding5}>
                                <Text style={styles.gridInfoNameSurnameDynamic}>
                                    John Doe
                                </Text>
                                <Text style={[styles.gridInfoNameSurnameDynamic, styles.gridInfoNameSurnameStatic]}>
                                    {t('namesurname')}
                                </Text>
                            </Col>
                            <Col style={styles.gridInfoMonthYear}>
                                <Text style={styles.monthYearText}>
                                    {item.cardInfo.expiry}
                                </Text>
                                <Text
                                    style={[styles.monthYearText, styles.monthYearUnderText]}>
                                    {t('expiry')}
                                </Text>
                            </Col>
                        </Grid>
                    </View>
                </View>
            </LinearGradient>
        </Animated.View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: width,
        height: 201,
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
        width: 350,
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
        height: '90%',
        flexDirection: "row",
        backgroundColor: 'transparent',
        justifyContent: "space-between",
        borderTopLeftRadius: 19
    },
    leftPattern: {
        borderBottomRightRadius: 70,
        borderTopLeftRadius: 19
    },
    bigPattern: {
        width: '70%',
        height: '90%',
        backgroundColor: "rgb(255,255,255)",
        zIndex: 2
    },
    littlePattern: {
        position: "absolute",
        top: '15%',
        width: '55%',
        height: '45%',
        backgroundColor: "rgba(255,255,255,.8)",
        zIndex: 3,
    },
    priceText: {
        position: "absolute",
        top: '19%',
        width: '55%',
        height: '45%',
        zIndex: 4,
        fontSize: 20,
        color: "#000",
        fontWeight: "bold",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    right: {
        position: 'absolute',
        top: '19%',
        right: '4.5%',
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent',
    },
    rightText: {
        fontSize: 27,
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