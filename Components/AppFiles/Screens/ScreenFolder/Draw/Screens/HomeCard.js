import React from 'react';
import {StyleSheet, View, Text, FlatList, Animated, Dimensions} from 'react-native'
import firebase from "../../../../Functions/FireBase/firebaseConfig";
import customStyle from "../../../../../../assets/Theme";
import {LinearGradient} from "expo-linear-gradient";
import {Right} from "native-base";
import {Col, Grid} from "react-native-easy-grid";
import {StatusBar} from "expo-status-bar";
import Carousel from "react-native-snap-carousel";

const widths = Dimensions.get('window').width;
const heights = Dimensions.get('window').height;
const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
export default function HomeCard() {
    const [cards, setCards] = React.useState(null)

    async function getInfo() {
        firebase.database().goOnline()
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
                    setCards(datas);
                });
        } else {
            //
        }
    }

    React.useEffect(() => {
        getInfo()
    }, []);

    const RenderItem2 = ({index, item, y}) => {
        const translateY = Animated.add(y, y.interpolate({
            inputRange: [0, 0.00001 + index * 200],
            outputRange: [0, -index * 200],
            extrapolateRight: "clamp",
        }));
        return (
            <Animated.View key={index} style={[styles.slide, customStyle.mHor15, {transform: [{translateY}]}]}>
                <LinearGradient
                    style={styles.cardBg}
                    colors={['rgba(198, 255, 0, 0.9)', 'rgba(51, 105, 30, 0.9)']}>
                    <View style={styles.rightSec}>
                        <Right style={styles.right}>
                            <Text style={styles.rightText}>{item.cardInfo.type}</Text>
                        </Right>
                    </View>
                    <View style={styles.centerCardNum}>
                        <View>
                            <Text style={styles.cardNumbText}>{item.cardInfo.number}</Text>
                        </View>
                        <View>
                            <Text style={[styles.cardNumbText, styles.cardNumbTextUnderText]}>
                                Card number
                            </Text>
                        </View>
                    </View>
                    <View style={styles.cardInfos}>
                        <View>
                            <Grid>
                                <Col style={customStyle.padding5}>
                                    <Text style={styles.gridInfoNameSurnameDynamic}>
                                        John Doe
                                    </Text>
                                    <Text
                                        style={[
                                            styles.gridInfoNameSurnameDynamic,
                                            styles.gridInfoNameSurnameStatic,
                                        ]}>
                                        Name Surname
                                    </Text>
                                </Col>
                                <Col style={[customStyle.padding5, styles.gridInfoMonthYear]}>
                                    <Text style={styles.monthYearText}>
                                        {item.cardInfo.expiry}
                                    </Text>
                                    <Text
                                        style={[styles.monthYearText, styles.monthYearUnderText]}>
                                        valid
                                    </Text>
                                </Col>
                            </Grid>
                        </View>
                    </View>
                </LinearGradient>
            </Animated.View>
        );
    }

    const y = new Animated.Value(0);
    const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {useNativeDriver: true});

    return (
        <View>
            <Carousel
                scrollEventThrottle={15}
                data={cards}
                activeSlideAlignment="center"
                autoplay={true}
                sliderWidth={widths}
                sliderHeight={heights-150}
                inactiveSlideOpacity={1}
                itemHeight={heights/4}
                itemWidth={widths}
                vertical={true}
                enableSnap={true}
                loop={true}
                inactiveSlideScale={0.9}
                shouldOptimizeUpdates={true}
                layout="tinder"

                renderItem={({index, item}) => (
                    <RenderItem2 {...{index, item, y}} />
                )}
                bounces={false}
                keyExtractor={(index) => index}
                {...{onScroll}}
            />
        </View>
    )

}


const styles = StyleSheet.create({
    sliderArena: {
        height: 200,
    },
    slide: {
        width: widths,
        height: 180,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    cardBg: {
        borderRadius: 15,
        height: 150,
        width: widths - 30,
    },
    rightSec: {
        width: widths,
        flex: 1,
        height: 15,
    },
    right: {
        position: 'absolute',
        top: 7,
        padding: 7,
        borderRadius: 6,
        backgroundColor: '#7c9d32',
        right: 50,
    },
    rightText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
    centerCardNum: {
        position: 'absolute',
        top: 38,
        left: 15,
    },
    cardNumbText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 19,
        letterSpacing: 1.5,
    },
    cardNumbTextUnderText: {
        fontSize: 13,
        marginTop: -5,
        paddingLeft: 5,
        fontWeight: 'normal',
    },
    cardInfos: {
        position: 'absolute',
        top: 85,
        left: 10,
        width: widths,
    },
    gridInfoNameSurnameDynamic: {
        position: 'relative',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',

    },
    gridInfoNameSurnameStatic: {
        fontSize: 12,
        paddingLeft: 3,
        fontWeight: 'normal',
        marginTop: -3,
    },
    gridInfoMonthYear: {
        position: 'absolute',
        top: 0,
        right: 50,
        paddingHorizontal: 20,
    },
    monthYearText: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1.5,
        color: '#fff',
        paddingTop: 5,
    },
    monthYearUnderText: {
        fontWeight: 'normal',
        marginTop: -9,
        fontSize: 12,
        marginLeft: 4,
    },
})