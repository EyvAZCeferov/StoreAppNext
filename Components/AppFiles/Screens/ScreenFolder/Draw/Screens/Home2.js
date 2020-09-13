import React from 'react';
import {View, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
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
import {Ionicons} from "@expo/vector-icons";
import RecentOperations from "../Component/Home/RecentOperations";
import SliderCards from '../Component/Home/SliderCards';
import {StatusBar} from "expo-status-bar";

const icon = require('../../../../../../assets/icon.png');

export default class Home2 extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderElement();
    }

    renderElement() {
        return (
            <View style={styles.contentArena}>
                <View>
                    <SafeAreaView>
                        <SliderCards/>
                    </SafeAreaView>
                </View>
                <View>
                    <SafeAreaView>
                        <RecentOperations/>
                    </SafeAreaView>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Container style={{backgroundColor: "#fff"}}>
                <StatusBar style="dark" backgroundColor="#fff"/>
                <Header style={styles.header}>
                    <Left style={[styles.height, styles.iconArena]}>
                        <Thumbnail source={icon} style={styles.icon}/>
                    </Left>
                    <Body/>
                    <Right style={styles.height}>
                        <Button
                            style={{marginBottom: 12}}
                            transparent
                            onPress={() => this.props.navigation.navigate('OtherPages', {screen: "Notification"})}>
                            <Ionicons name="ios-notifications" size={24} color="#7c9d32"/>
                        </Button>
                    </Right>
                </Header>
                {this.renderElement()}
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
            height: heights
        },
        f1: {
            flex: 1,
            width: widths,
            height: 300,
        },
    });
