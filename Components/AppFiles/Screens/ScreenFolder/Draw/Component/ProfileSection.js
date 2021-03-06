import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Thumbnail, List, ListItem, Left, Right, Body} from 'native-base';
import {
    MaterialCommunityIcons,
    FontAwesome5,
    Entypo,
    AntDesign,
    Ionicons,
} from '@expo/vector-icons';
import {Col, Grid} from 'react-native-easy-grid';
import {t} from '../../../../Lang';

const icon = require('../../../../../../assets/icon.png');

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

import firebase from '../../../../Functions/FireBase/firebaseConfig';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import AsyncStorage from "@react-native-community/async-storage";
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";

export default function ProfileSection(props) {
    const [nameSurname, setnameSurname] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [profPic, setprofPic] = useState(null);
    useEffect(() => {
        getInfo();
        setInterval(() => {
            getInfo()
        }, 1000)
    }, []);

    function getInfo() {
        var user = firebase.auth().currentUser;
        if (user != null) {
            firebase
                .database()
                .ref('users/' + user.uid + '/userInfos')
                .on('value', (data) => {
                    var newData = data.toJSON();
                    if (newData.profPic != null) {
                        setprofPic(newData.profPic);
                    } else {
                        setprofPic(null);
                    }
                    setnameSurname('Pay And Win');
                    renderImage();
                    setRefresh(false);
                });
        }
    }

    function renderImage() {
        if (refresh) {
            return (
                <ShimmerPlaceholder
                    visible={false}
                    height={60}
                    width={60}
                    style={{borderRadius: 60}}
                    isInteraction={true}>
                    <View
                        style={styles.logo}
                    />
                </ShimmerPlaceholder>
            )
        } else {
            return (
                <Thumbnail
                    style={styles.logo}
                    source={{
                        uri: profPic,
                    }}
                />
            );
        }
    }

    async function out() {
        await AsyncStorage.setItem('haveFinger', '');
        await AsyncStorage.setItem('localAuthPass', '');
        firebase.auth().signOut()
    }

    return (
        <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
                <ListItem style={styles.listItem}>
                    <Grid>
                        {profPic === null || profPic == null ? (
                            <Col>
                                <Thumbnail
                                    style={styles.logo}
                                    source={icon}
                                />
                            </Col>
                        ) : (
                            <Col>{renderImage()}</Col>
                        )}
                        <Col>
                            <MyText style={styles.title} children={nameSurname}/>
                        </Col>
                    </Grid>
                </ListItem>
            </View>
            <ScrollView style={styles.drawerSection}>
                <List style={styles.drawerSection}>
                    <ListItem style={styles.listItem}
                              onPress={() => props.navigation.navigate('OtherPages', {screen: 'Cards'})}>
                        <Left style={styles.headerLeft}>
                            <AntDesign name="creditcard" size={25} color="#7c9d32"/>
                        </Left>
                        <Body style={styles.headerBody}>
                            <MyText style={styles.headerBodyText}
                                    children={t('cards')}/>
                        </Body>
                        <Right style={styles.headerRight}>
                            <AntDesign name="right" size={19} color="#7c9d32"/>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.listItem}
                              onPress={() => props.navigation.navigate('OtherPages', {screen: 'Bonuses'})}>
                        <Left style={styles.headerLeft}>
                            <Entypo name="price-ribbon" size={25} color="#7c9d32"/>
                        </Left>
                        <Body style={styles.headerBody}>
                            <MyText style={styles.headerBodyText}
                                    children={t('bonuses')}/>
                        </Body>
                        <Right style={styles.headerRight}>
                            <AntDesign name="right" size={19} color="#7c9d32"/>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.listItem}
                              onPress={() => props.navigation.navigate('OtherPages', {screen: 'AccountSettings'})}>
                        <Left style={styles.headerLeft}>
                            <MaterialCommunityIcons
                                name="account-edit"
                                size={25}
                                color="#7c9d32"
                            />
                        </Left>
                        <Body style={styles.headerBody}>
                            <MyText style={styles.headerBodyText}
                                    children={t('accounts')}/>
                        </Body>
                        <Right style={styles.headerRight}>
                            <AntDesign name="right" size={19} color="#7c9d32"/>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.listItem}
                              onPress={() => props.navigation.navigate('OtherPages', {screen: 'Map'})}>
                        <Left style={styles.headerLeft}>
                            <FontAwesome5 name="map-marked-alt" size={25} color="#7c9d32"/>
                        </Left>
                        <Body style={styles.headerBody}>
                            <MyText style={styles.headerBodyText}
                                    children={t('map')}/>
                        </Body>
                        <Right style={styles.headerRight}>
                            <AntDesign name="right" size={19} color="#7c9d32"/>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.listItem}
                              onPress={() => props.navigation.navigate('OtherPages', {screen: 'Histories'})}>
                        <Left style={styles.headerLeft}>
                            <FontAwesome5 name="history" size={25} color="#7c9d32"/>
                        </Left>
                        <Body style={styles.headerBody}>
                            <MyText style={styles.headerBodyText}
                                    children={t('history')}/>
                        </Body>
                        <Right style={styles.headerRight}>
                            <AntDesign name="right" size={19} color="#7c9d32"/>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.listItem}
                              onPress={() => props.navigation.navigate('OtherPages', {screen: 'ContactUs'})}>
                        <Left style={styles.headerLeft}>
                            <Ionicons name="ios-call" size={25} color="#7c9d32"/>
                        </Left>
                        <Body style={styles.headerBody}>
                            <MyText style={styles.headerBodyText}
                                    children={t('contactus')}/>
                        </Body>
                        <Right style={styles.headerRight}>
                            <AntDesign name="right" size={19} color="#7c9d32"/>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.listItem}
                              onPress={() => props.navigation.navigate('OtherPages', {screen: 'Settings'})}>
                        <Left style={styles.headerLeft}>
                            <Ionicons name="md-settings" size={25} color="#7c9d32"/>
                        </Left>
                        <Body style={styles.headerBody}>
                            <MyText style={styles.headerBodyText}
                                    children={t('setting')}/>
                        </Body>
                        <Right style={styles.headerRight}>
                            <AntDesign name="right" size={19} color="#7c9d32"/>
                        </Right>
                    </ListItem>
                    <ListItem style={styles.listItem} onPress={() => out()}>
                        <Left style={styles.headerLeft}>
                            <AntDesign name="logout" size={25} color="#7c9d32"/>
                        </Left>
                        <Body style={styles.headerBody}>
                            <MyText style={styles.headerBodyText}
                                    children={t('exit')}/>
                        </Body>
                        <Right style={styles.headerRight}/>
                    </ListItem>
                </List>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: '#fff'
    },
    userInfoSection: {
        paddingTop: 1,
        paddingHorizontal: 9,
        flexDirection: 'column',
        backgroundColor: "transparent",
        maxHeight: 100
    },
    listItem: {
        borderColor: 'transparent',
        padding: 0,
        margin: 0
    },
    headerLeft: {
        flex: 0.15,
    },
    headerBody: {
        flex: 0.5,
    },
    headerRight: {
        flex: 0.4
    },
    headerBodyText: {
        color: 'rgba(0,0,0,.5)',
        fontSize: 19
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: '-40%',
        marginTop: '15%',
    },
    drawerSection: {
        marginTop: 0,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        padding: 1,
        margin: 0,
        marginLeft: '-5%'
    },
});
