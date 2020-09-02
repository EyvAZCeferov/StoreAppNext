import * as React from 'react';
import {StyleSheet, Dimensions, SafeAreaView, View, FlatList} from 'react-native';
import {Text, Right, Button} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import {LinearGradient} from 'expo-linear-gradient';


var width = Dimensions.get('window').width;
import customStyle from '../../../../../../../assets/Theme';
import firebase from '../../../../../Functions/FireBase/firebaseConfig';
import {Entypo} from '@expo/vector-icons';

export default class SliderCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            cards: [],
            cardCount: 1,
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
                        cardCount: data.numChildren(),
                    });
                    this.renderCards();
                    this.renderDots();
                });
        } else {
            this.props.navigation.navigate('CreateAccount');
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

    renderDots() {
        var dotes = [];
        for (let i = 0; i < this.state.cardCount; i++) {
            dotes.push(
                <Col style={styles.dot}>
                    <Button style={styles.dot} transparent>
                        <Entypo
                            name="dot-single"
                            size={30}
                            color={i == this.state.activeIndex ? '#1B5E20' : '#7c9d32'}
                        />
                    </Button>
                </Col>
            );
        }
        return dotes;
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
                        loop={true}
                        autoplay={false}
                        backgroundColor="#fff"
                        keyExtractor={(index) => index}
                        data={this.state.cards}
                        renderItem={this._renderItem2}
                    />
                </View>
            );
        }
    }

    render() {
        const cardCounts = this.state.cardCount;
        const dotArenas = cardCounts * 20;
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            paddingTop: 20,
                        }}>
                        {this.renderCards()}
                        <View style={styles.dotsArena}>
                            <View style={[styles.dotarena, {width: dotArenas}]}>
                                <Grid style={[styles.dotarena, {width: dotArenas}]}>
                                    {this.renderDots()}
                                </Grid>
                            </View>
                        </View>
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
        width: width,
        height: 180,
        justifyContent: 'center',
    },
    cardBg: {
        borderRadius: 15,
        height: 150,
        width: width - 30,
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
    dotsArena: {
        position: 'absolute',
        bottom: 15,
        backgroundColor: "transparent",
        left: 0,
        right: 5,
        width: width,
        height: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: "column",
    },
    dotarena: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: 20,
    },
    dot: {
        borderRadius: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});
