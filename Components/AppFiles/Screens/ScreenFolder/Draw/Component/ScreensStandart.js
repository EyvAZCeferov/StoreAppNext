import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button, Header} from 'native-base';

var width = Dimensions.get('window').width;
import {AntDesign} from '@expo/vector-icons';
import {StatusBar} from "expo-status-bar";
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";

function MyText(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });
    if (!fontsLoaded) {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                textAlign: "center"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    } else {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                textAlign: "center",
                fontFamily: "Poppins_400Regular"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    }
}

export default class ScreenStandart extends React.Component {
    props = this.props;

    render() {
        return (
            <Header style={styles.header}>
                <StatusBar backgroundColor="#fff" style="dark"/>
                <View style={styles.headerComponents}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name="left" size={24} color="#7c9d32"/>
                    </Button>
                    <MyText style={styles.title} children={this.props.name}/>
                    <View/>
                </View>
            </Header>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        minHeight: 60,
        maxHeight: 100,
        width: width,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    headerComponents: {
        width: width - 20,
        backgroundColor: '#fff',
        borderColor: '#fff',
        minHeight: 20,
        maxHeight: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    title: {
        fontSize: 21,
        fontWeight: '700',
        paddingLeft: 0,
        color: '#7c9d32',
        marginLeft: -25
    },
});
