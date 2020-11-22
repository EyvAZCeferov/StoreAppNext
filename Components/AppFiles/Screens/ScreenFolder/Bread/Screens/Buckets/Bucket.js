import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from 'react-native';
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";
import {Thumbnail} from 'native-base';
import {MaterialIcons} from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar';
import BucketHeader from "../../Components/Bucket/BucketHeader";

const {width, height} = Dimensions.get('window');

function MyText(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });
    if (!fontsLoaded) {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    } else {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                fontFamily: "Poppins_400Regular"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    }
}

const categories = [
    {
        id: 1,
        image: 'https://picsum.photos/50',
        name: 'Category Name 1',
    },
    {
        id: 2,
        image: 'https://picsum.photos/50',
        name: 'Category Name 2',
    },
    {
        id: 3,
        image: 'https://picsum.photos/50',
        name: 'Category Name 3',
    },
    {
        id: 4,
        image: 'https://picsum.photos/50',
        name: 'Category Name 4',
    },
    {
        id: 5,
        image: 'https://picsum.photos/50',
        name: 'Category Name 5',
    },
    {
        id: 6,
        image: 'https://picsum.photos/50',
        name: 'Category Name 6',
    },
    {
        id: 7,
        image: 'https://picsum.photos/50',
        name: 'Category Name 7',
    },
    {
        id: 8,
        image: 'https://picsum.photos/50',
        name: 'Category Name 8',
    },
    {
        id: 9,
        image: 'https://picsum.photos/50',
        name: 'Category Name 9',
    },
    {
        id: 10,
        image: 'https://picsum.photos/50',
        name: 'Category Name 10',
    },
];

const whiteLists = [
    {
        id: 1,
        image: 'https://picsum.photos/50',
        name: 'Product 1',
        price: 20.15,
    },
    {
        id: 2,
        image: 'https://picsum.photos/50',
        name: 'Product 2',
        price: 0.20,
    },
    {
        id: 3,
        image: 'https://picsum.photos/50',
        name: 'Product 3',
        price: 10.10,
    },
    {
        id: 4,
        image: 'https://picsum.photos/50',
        name: 'Product 4',
        price: 0.40,
    },
    {
        id: 5,
        image: 'https://picsum.photos/50',
        name: 'Product 5',
        price: 11.22,
    },
    {
        id: 6,
        image: 'https://picsum.photos/50',
        name: 'Product 6',
        price: 30.33,
    },
];

export default class Bucket extends React.Component {
    constructor(props) {
        super(props)
    }

    renderWhitelists({item, index}) {
        return (
            <TouchableOpacity
                key={index}
                style={{
                    marginHorizontal: 5,
                    width: 90,
                    height: 90,
                    borderRadius: 0,
                    position: "relative",
                }}>
                <Thumbnail
                    source={{uri: item.image}}
                    resizeMode="cover" resizeMethod="resize"
                    style={{
                        borderRadius: 0,
                        width: "100%",
                        height: "100%",
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}/>
                <TouchableOpacity style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    padding: 8,
                    alignContent: "center",
                    textAlign: "center",
                    backgroundColor: "#fff"
                }}>
                    <MaterialIcons name="add-shopping-cart" size={24} color="#7c9d32"/>
                </TouchableOpacity>
                <MyText children={item.name} style={{
                    position: 'absolute',
                    bottom: 0,
                    left: -1,
                    fontSize: 8,
                    backgroundColor: "#fff",
                    padding: 2,
                    borderRadius: 0,
                    zIndex: 15,
                    color: "#7c9d32"
                }}/>
                <MyText
                    style={{
                        position: "absolute",
                        right: 0,
                        borderRadius: 0,
                        backgroundColor: "#1E88E5",
                        padding: 3,
                    }}>
                    <MyText
                        children={item.price + '₼'}
                        style={{
                            textAlign: "right",
                            fontSize: 9,
                            color: '#fff'
                        }}
                    />
                </MyText>
            </TouchableOpacity>
        );
    }

    renderCategories(e) {
        return e.map(element => {
            return (
                <TouchableOpacity
                    key={element.id}
                    style={[styles.center, {
                        width: '48%',
                        height: 150,
                        backgroundColor: "#fff",
                        borderColor: "#7c9d32",
                        borderWidth: 1,
                        marginHorizontal: 1,
                        marginVertical: 1,
                    }]}
                >
                    <ImageBackground style={{
                        width: '100%',
                        height: "100%",
                        zIndex: 4,
                    }} resizeMode="cover" resizeMethod="resize" source={{uri: element.image}}/>
                    <MyText style={{
                        color: "#000",
                        fontSize: 10,
                        position: "absolute",
                        bottom: 3,
                        padding: 4,
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        zIndex: 5
                    }} children={element.name}/>
                </TouchableOpacity>
            );
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#fff" style="dark"/>
                <SafeAreaView>
                    <View style={styles.content}>
                        <BucketHeader/>
                        <View style={styles.contentArena}>
                            <View style={styles.contentHeader}>
                                <View style={styles.contentHeaderBlocks}>
                                    <MyText
                                        style={styles.center}
                                        children='Seçilmişlər'/>
                                    <MyText
                                        style={{color: "#7c9d32"}}
                                        children={0}/>
                                </View>
                                <View>
                                    <FlatList
                                        data={whiteLists}
                                        renderItem={this.renderWhitelists}
                                        renderToHardwareTextureAndroid={true}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={true}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </View>
                            <View style={styles.contentBody}>
                                <ScrollView
                                    style={{
                                        marginTop: '4%',
                                        alignContent: "center",
                                    }}
                                    pointerEvents="box-only"
                                >
                                    <View style={[styles.center, {
                                        height: "100%",
                                        width: width,
                                        flexDirection: "row",
                                        flexWrap: "wrap",
                                        paddingBottom: 100
                                    }]}>
                                        {this.renderCategories(categories)}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: "#fff",
    },
    content: {
        width: width,
        height: height,
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#fff",
    },
    contentArena: {
        width: width,
        height: '90%',
        flexDirection: "column"
    },
    contentHeader: {
        width: width,
        flexDirection: "column",
    },
    contentHeaderBlocks: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    contentBody: {
        width: width,
    },
    center: {
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }
});





