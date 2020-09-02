import React from 'react';
import {View, Text, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {
    Body,
    Button,
    Container,
    Header,
    Left,
    Right,
    Thumbnail,
} from 'native-base';

const widths = Dimensions.get('window').width;
const heights = Dimensions.get('window').height;
import customStyle from '../../../../../../assets/Theme';
import {Entypo, Ionicons} from "@expo/vector-icons";
import {Col, Grid} from "react-native-easy-grid";
import firebase from "../../../../Functions/FireBase/firebaseConfig";
import {LinearGradient} from "expo-linear-gradient";
import Carousel from "react-native-snap-carousel";
import RecentOperations from "../Component/Home/RecentOperations";
import SliderCards from '../Component/Home/SliderCards';

const icon = require('../../../../../../assets/images/logo1.png');

export default class Home2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            cards: [],
            cardCount: 1,
        }
    }

    async getInfo() {
        firebase.database().goOnline()
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            var recents = [];
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
            this.props.navigation.navigate('Home2');
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    componentWillUnmount() {
        firebase.database().goOffline();
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
                    <Carousel
                        layout={'tinder'}
                        layoutCardOffset={widths - 150}
                        pagingEnabled={true}
                        loop={true}
                        autoplay={false}
                        pagination={true}
                        backgroundColor="#fff"
                        ref={(ref) => (this.carousel = ref)}
                        data={this.state.cards}
                        sliderWidth={widths - 20}
                        activeIndex={this.state.activeIndex}
                        itemWidth={widths - 20}
                        renderItem={this._renderItem2}
                        onSnapToItem={(index) => this.setState({activeIndex: index})}
                        activeAnimationType={'fade'}
                        inactiveSlideOpacity={0.3}
                        inactiveSlideScale={0.3}
                    />
                </View>
            );
        }
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

    render() {
        return (
            <Container>
                <Header style={styles.header}>
                    <Left style={[styles.height, styles.iconArena]}>
                        <Thumbnail source={icon} style={styles.icon}/>
                    </Left>
                    <Body/>
                    <Right style={styles.height}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('OtherPages', {screen: "Notification"})}>
                            <Ionicons name="ios-notifications" size={24} color="#7c9d32"/>
                        </Button>
                    </Right>
                </Header>
                <View style={styles.contentArena}>
                    <View>
                        <SafeAreaView>
                            <SliderCards/>
                        </SafeAreaView>
                    </View>
                    <View style={{marginTop: 250}}>
                        <SafeAreaView>
                            <RecentOperations/>
                        </SafeAreaView>
                    </View>
                </View>
            </Container>
        )
    }
}

const
    styles = StyleSheet.create({
        header: {
            backgroundColor: '#fff',
            paddingTop: 5,
            paddingBottom: 1,
            minHeight: 70,
            maxHeight: 100,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: widths,
        },
        height: {
            minHeight: 60,
            maxHeight: 80,
            paddingVertical: 7,
        },
        iconArena: {
            width: 50,
            height: 50,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
        },
        icon: {
            marginLeft: 'auto',
            width: 45,
            height: 45,
            ...StyleSheet.absoluteFill,
            padding: 5,

        },
        contentArena: {
            width: widths,
            height: heights - 200,
        },
        f1: {
            flex: 1,
            width: widths,
            height: 300,
        },
    });
