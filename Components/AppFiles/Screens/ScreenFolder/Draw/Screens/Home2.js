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
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

const icon = require('../../../../../../assets/images/logo1.png');

export default class Home2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
        }
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
