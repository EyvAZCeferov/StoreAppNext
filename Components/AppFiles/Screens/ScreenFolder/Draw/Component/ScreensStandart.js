import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button, Header, Left, Right, Body} from 'native-base';

var width = Dimensions.get('window').width;
import {AntDesign} from '@expo/vector-icons';
import {StatusBar} from "expo-status-bar";

export default class ScreenStandart extends React.Component {
    props = this.props;

    render() {
        return (
            <Header style={styles.header}>
                <View style={styles.headerComponents}>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name="left" size={24} color="#7c9d32"/>
                    </Button>
                    <Text style={styles.title}>{this.props.name}</Text>
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
