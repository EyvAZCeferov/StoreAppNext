import * as React from 'react';
import {StyleSheet, Dimensions, SafeAreaView, View, FlatList, Animated} from 'react-native';
import {Text, Right} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import {LinearGradient} from 'expo-linear-gradient';
import customStyle from '../../../../../../../assets/Theme';
import firebase from '../../../../../Functions/FireBase/firebaseConfig';
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

var width = Dimensions.get('window').width;

export default class SliderCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            cards: [],
            cardCount: 1,
            refresh: true
        };
    }

    getInfo() {
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
                        cardCount: data.numChildren(),
                        refresh: false,
                    });
                    this.renderCards();
                });
        } else {
            this.props.navigation.navigate('Home');
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    _renderItem2({item, index}) {
        return (
            <View key={index} style={[styles.slide, customStyle.mHor15]}>
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
            </View>
        );
    }

    renderCards() {
        if (this.state.cards != null) {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <FlatList
                        vertical={true}
                        nestedScrollEnabled={true}
                        inverted={false}
                        zoomScale={3}
                        windowSize={width}
                        snapToStart={true}
                        bouncesZoom={true}
                        bounces={true}
                        refreshing={this.state.refresh}
                        showsVerticalScrollIndicator={false}
                        keyboardDismissMode="on-drag"
                        loop={true}
                        autoplay={false}
                        backgroundColor="#fff"
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.cards}
                        renderItem={this._renderItem2}
                    />
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            paddingTop: 20,
                        }}>
                        {this.state.refresh ? (
                                <View>
                                    <ShimmerPlaceholder
                                        visible={false}
                                        isInteraction={true}
                                        style={{width: width, height: 200}}
                                    />
                                </View>
                            ) :
                            this.renderCards()
                        }
                    </SafeAreaView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 200,
    },
    slide: {
        width: width - 20,
        height: 181,
        justifyContent: 'center',
        alignItems: "center",
        alignContent: "center"
    },
    cardBg: {
        borderRadius: 15,
        height: 170,
        width: width - 20,
    },
    rightSec: {
        width: width,
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
        width: width,
    },
    gridInfoNameSurnameDynamic: {
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
});
