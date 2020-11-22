import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";
import {AntDesign} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
import {Button} from "native-base";

const {width, height} = Dimensions.get('window');

export default class BucketHeader extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        <View style={[styles.center, styles.header]}>
            <View style={{width: width / 4, backgroundColor: "black"}}/>
            <MyText
                style={styles.headerTitle}
                children='Səbət'/>
            <View style={[styles.center, styles.headerRight]}>
                <Button transparent large style={styles.center}>
                    <AntDesign name="shoppingcart" size={24} color="#000"/>
                    <MyText style={[styles.center, {
                        color: "#7c9d32",
                        fontSize: 13,
                        fontWeight: "bold",
                        position: "absolute",
                        top: 8,
                        right: -7,
                    }]} children={0}/>
                </Button>
                <Button transparent large style={styles.center}>
                    <AntDesign name="hearto" size={24} color="black"/>
                    <MyText
                        style={[styles.center, {
                            color: "#7c9d32",
                            fontSize: 13,
                            fontWeight: "bold",
                            position: "absolute",
                            top: 8,
                            right: -7,
                        }]}
                        children={0}/>
                </Button>
            </View>
        </View>
    }
}
const styles=StyleSheet.create({
    header: {
        width: width,
        height: "12%",
        marginTop: '5%',
        flexDirection: "row",
        justifyContent: "space-around",
    },
    headerTitle: {
        color: "#7c9d32",
        fontSize: 18,
        fontWeight: "bold",
    },
    headerRight: {
        width: width / 4,
        flexDirection: "row",
        justifyContent: "space-around",
    },
})