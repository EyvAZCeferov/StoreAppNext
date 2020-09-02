import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import RecentOperation from '../Components/PayStart/RecentOperation';
import {StatusBar} from "expo-status-bar";
import PayCards from "../Components/PayStart/Paying";

const {width, height} = Dimensions.get("window");
export default class BarCodeReader extends React.Component {
    render() {
        return (

            <View style={styles.content}>
                <StatusBar backgroundColor="#7c9d32" style="light"/>
                <View style={styles.upperView}>
                    <PayCards/>
                </View>
                <View style={styles.downerView}>
                    <RecentOperation {...this.props} />
                </View>

            </View>

        );
    }

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
    },
    upperView: {
        height: 250,
        backgroundColor: "#f1f1f1"
    },
    downerView: {
        height: height,
        backgroundColor: "red"
    }
});
