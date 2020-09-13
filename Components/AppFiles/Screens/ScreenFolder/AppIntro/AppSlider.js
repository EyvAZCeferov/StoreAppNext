import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import {StatusBar} from "expo-status-bar";

const {width, height} = Dimensions.get('window');
export default class AppSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: null,
            slides: [
                {
                    title: "Pay and Win tətbiqinə xoş gəlmisiniz",
                    image: require('./images/1.png'),
                    desc: null
                },
                {
                    title: "Sürətli alış-veriş",
                    image: require('./images/2.png'),
                    desc: "Növbəsiz və Sürətli alış-veriş yalnız bir toxunuşla"
                },
                {
                    title: "Mağazaların tam kataloqu",
                    image: require('./images/3.png'),
                    desc: null
                },
                {
                    title: null,
                    image: require('./images/4.png'),
                    desc: null
                },
                {
                    title: null,
                    image: require('./images/5.png'),
                    desc: null
                },
            ]
        }
    }

    async _onDone() {
        this.setState({first: 'Ok'})
        alert('Done');
        await AsyncStorage.setItem('firstOpen', 'Ok');
    }

    _renderNextButton() {
        return (
            <View style={styles.button}>
                <AntDesign
                    style={styles.buttonIcon}
                    name="right"
                    size={24}
                    color="#7c9d32"
                />
            </View>
        )
    }

    _renderPrevButton() {
        return (
            <View style={styles.button}>
                <AntDesign
                    style={styles.buttonIcon}
                    name="left"
                    size={24}
                    color="#7c9d32"
                />
            </View>
        )
    }

    _renderDoneButton() {
        return (
            <View style={styles.button}>
                <AntDesign
                    style={styles.buttonIcon}
                    name="check"
                    size={24}
                    color="#7c9d32"
                />
                <Text style={styles.buttonText}>Bitir</Text>
            </View>
        )
    }

    _renderItem({item, index}) {
        return (
            <View style={styles.slide} key={index}>
                <Image source={item.image} resizeMode="cover" style={styles.image}/>
                <View style={styles.slideContent}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.desc}</Text>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" backgroundColor="#fff"/>
                <AppIntroSlider
                    renderItem={this._renderItem}
                    data={this.state.slides}
                    onDone={() => this._onDone()}
                    bottomButton={false}
                    dotStyle={{backgroundColor: "rgba(124,157,50,0.5)"}}
                    activeDotStyle={{backgroundColor: "rgb(124,157,50)"}}
                    dotClickEnabled={true}
                    showNextButton={false}
                    showPrevButton={false}
                    showDoneButton={true}
                    renderDoneButton={this._renderDoneButton}
                    // renderNextButton={this._renderNextButton}
                    // renderPrevButton={this._renderPrevButton}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    button: {
        flexDirection: "row",
        justifyContent: "space-between",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "transparent"
    },
    buttonIcon: {
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        padding: 15,
        color: "#7c9d32"
    },
    buttonText: {
        color: "#7c9d32",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
    },
    slide: {
        width: width,
        height: height - 100,
        justifyContent: "space-around",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#fff"
    },
    image: {
        width: 300,
        height: 300,
    },
    slideContent: {
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "transparent",
        padding: 10
    },
    title: {
        color: "#7c9d32",
        fontSize: 32,
        fontWeight: "bold",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
    },
    desc: {
        color: "rgba(0,0,0,.4)",
        fontSize: 16,
        marginTop: 12,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
    }
})
