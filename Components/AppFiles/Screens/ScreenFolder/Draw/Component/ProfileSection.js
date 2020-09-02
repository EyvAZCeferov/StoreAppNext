import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
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

import firebase from '../../../../Functions/FireBase/firebaseConfig';
import {StatusBar} from "expo-status-bar";

export default function ProfileSection(props) {
    const [nameSurname, setnameSurname] = useState(null);
    const [profPic, setprofPic] = useState(null);
    useEffect(() => {
        getInfo();
        setTimeout(() => {
            getInfo();
        }, 8000);
        setTimeout(() => {
            renderImage();
        }, 5000);
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
                    setnameSurname('Way Way Way Way And Pay');
                });
        }
    }

    function renderImage() {
        return (
            <Thumbnail
                style={styles.image}
                source={{
                    uri: profPic,
                }}
            />
        );
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
                                    source={{
                                        uri:
                                            'https://firebasestorage.googleapis.com/v0/b/storeapp1-ea810.appspot.com/o/WP%2F11111111111111111111111111111111111111111.png?alt=media&token=5f0aa05e-6eaf-4945-a5f4-c9b0f917892f',
                                    }}
                                />
                            </Col>
                        ) : (
                            <Col>{renderImage()}</Col>
                        )}
                        <Col>
                            <Text style={styles.title}>{nameSurname}</Text>
                        </Col>
                    </Grid>
                </ListItem>
            </View>
            <List style={styles.drawerSection}>
                <ListItem style={styles.listItem}
                          onPress={() => props.navigation.navigate('OtherPages', {screen: 'Cards'})}>
                    <Left style={styles.headerLeft}>
                        <AntDesign name="creditcard" size={25} color="#7c9d32"/>
                    </Left>
                    <Body style={styles.headerBody}><Text style={styles.headerBodyText}>{t('cards')}</Text></Body>
                    <Right style={styles.headerRight}>
                        <AntDesign name="right" size={19} color="#7c9d32"/>
                    </Right>
                </ListItem>
                <ListItem style={styles.listItem}
                          onPress={() => props.navigation.navigate('OtherPages', {screen: 'Bonuses'})}>
                    <Left style={styles.headerLeft}>
                        <Entypo name="price-ribbon" size={25} color="#7c9d32"/>
                    </Left>
                    <Body style={styles.headerBody}><Text style={styles.headerBodyText}>{t('bonuses')}</Text></Body>
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
                    <Body style={styles.headerBody}><Text style={styles.headerBodyText}>{t('accounts')}</Text></Body>
                    <Right style={styles.headerRight}>
                        <AntDesign name="right" size={19} color="#7c9d32"/>
                    </Right>
                </ListItem>
                <ListItem style={styles.listItem}
                          onPress={() => props.navigation.navigate('OtherPages', {screen: 'Map'})}>
                    <Left style={styles.headerLeft}>
                        <FontAwesome5 name="map-marked-alt" size={25} color="#7c9d32"/>
                    </Left>
                    <Body style={styles.headerBody}><Text style={styles.headerBodyText}>{t('map')}</Text></Body>
                    <Right style={styles.headerRight}>
                        <AntDesign name="right" size={19} color="#7c9d32"/>
                    </Right>
                </ListItem>
                <ListItem style={styles.listItem}
                          onPress={() => props.navigation.navigate('OtherPages', {screen: 'Histories'})}>
                    <Left style={styles.headerLeft}>
                        <FontAwesome5 name="history" size={25} color="#7c9d32"/>
                    </Left>
                    <Body style={styles.headerBody}><Text style={styles.headerBodyText}>{t('history')}</Text></Body>
                    <Right style={styles.headerRight}>
                        <AntDesign name="right" size={19} color="#7c9d32"/>
                    </Right>
                </ListItem>
                <ListItem style={styles.listItem}
                          onPress={() => props.navigation.navigate('OtherPages', {screen: 'ContactUs'})}>
                    <Left style={styles.headerLeft}>
                        <Ionicons name="ios-call" size={25} color="#7c9d32"/>
                    </Left>
                    <Body style={styles.headerBody}><Text style={styles.headerBodyText}>{t('contactus')}</Text></Body>
                    <Right style={styles.headerRight}>
                        <AntDesign name="right" size={19} color="#7c9d32"/>
                    </Right>
                </ListItem>
                <ListItem style={styles.listItem}
                          onPress={() => props.navigation.navigate('OtherPages', {screen: 'Settings'})}>
                    <Left style={styles.headerLeft}>
                        <Ionicons name="md-settings" size={25} color="#7c9d32"/>
                    </Left>
                    <Body style={styles.headerBody}><Text style={styles.headerBodyText}>{t('setting')}</Text></Body>
                    <Right style={styles.headerRight}>
                        <AntDesign name="right" size={19} color="#7c9d32"/>
                    </Right>
                </ListItem>
                <ListItem style={styles.listItem} onPress={() => firebase.auth().signOut()}>
                    <Left style={styles.headerLeft}>
                        <AntDesign name="logout" size={25} color="#7c9d32"/>
                    </Left>
                    <Body style={styles.headerBody}><Text style={styles.headerBodyText}>{t('exit')}</Text></Body>
                    <Right style={styles.headerRight}/>
                </ListItem>
            </List>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        backgroundColor: '#fff'
    },
    userInfoSection: {
        paddingVertical: 2,
        paddingHorizontal: 9,
        flex: 1,
        flexDirection: 'column',
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
        marginLeft: -70,
        marginTop: 20,
    },
    drawerSection: {
        marginTop: -15,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        padding: 1,
        margin: 0,
        marginLeft: -15
    },
});
