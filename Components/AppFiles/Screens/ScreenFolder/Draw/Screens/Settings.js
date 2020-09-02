import React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    View,
    Picker
} from 'react-native';
import {
    Button,
    Left,
    Right,
    ListItem,
    List,
    Body,
    Content,
} from 'native-base';
import {
    Entypo,
    MaterialCommunityIcons,
    Foundation,
} from '@expo/vector-icons';

import ScreensStandart from '../Component/ScreensStandart';
import * as Localization from 'expo-localization';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {setLang, t} from '../../../../Lang';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: Localization.locale,
            haveFinger: true,
        };
    }

    render() {
        return (
            <View>
                <ScreensStandart {...this.props} name={t('setting')}/>
                <ScrollView>
                    <Content style={styles.content}>
                        <View style={[styles.content, styles.ptop]}>
                            <List style={styles.lists}>
                                <ListItem style={styles.listitemDivider} itemDivider>
                                    <Text style={styles.listitemDividerText}>{t('general')}</Text>
                                </ListItem>

                                <ListItem style={styles.listitemDivider} itemDivider>
                                    <Text style={styles.listitemDividerText}>
                                        {t('security')}
                                    </Text>
                                </ListItem>
                                <ListItem
                                    style={[styles.listitem, styles.active]}
                                    icon
                                >
                                    <Left
                                        style={styles.left}
                                    >
                                        <MaterialCommunityIcons
                                            name="textbox-password"
                                            size={24}
                                            color="#6d7587"

                                        />
                                    </Left>
                                    <Body
                                        style={styles.body}
                                    >
                                        <Text
                                            style={styles.text}
                                        >
                                            {t('changetheloginpassword')}
                                        </Text>
                                    </Body>
                                </ListItem>
                                <ListItem style={styles.listitem} icon>
                                    <Left style={styles.left}>
                                        <Entypo name="fingerprint" size={24} color="#6d7587"/>
                                    </Left>
                                    <Body style={styles.body}>
                                        <Text style={styles.text}>{t('fingerprintlogin')}</Text>
                                    </Body>
                                    {this.state.haveFinger ? (
                                        <Right>
                                            <Button danger block full padding>
                                                <Text style={{color: '#fff', padding: 10}}>
                                                    {t('delete')}
                                                </Text>
                                            </Button>
                                        </Right>
                                    ) : <Right>
                                        <Button danger block full padding>
                                            <Text style={{color: '#fff', padding: 10}}>
                                                {t('add')}
                                            </Text>
                                        </Button>
                                    </Right>}
                                </ListItem>
                                <ListItem style={styles.listitemDivider} itemDivider last>
                                    <Text style={styles.listitemDividerText}>
                                        {t('abouttheapplication')}
                                    </Text>
                                </ListItem>
                                <ListItem
                                    style={styles.listitem}
                                    icon
                                    onPress={() => this.props.navigation.navigate('TermOfUses')}>
                                    <Left
                                        style={styles.left}
                                    >
                                        <Foundation name="page-doc" size={24} color="#6d7587"/>
                                    </Left>
                                    <Body
                                        style={styles.body}
                                    >
                                        <Text style={styles.text}>
                                            {t('termsofuseoftheapplication')}
                                        </Text>
                                    </Body>
                                </ListItem>
                                <ListItem
                                    style={styles.listitemDivider}
                                    itemDivider
                                    last
                                    onPress={() => this.props.navigation.navigate('TermOfUses')}>
                                    <Text style={styles.listitemDividerText}>
                                        {t('versionoftheapplication')}
                                    </Text>
                                </ListItem>
                                <ListItem style={styles.listitem} icon>
                                    <Left style={styles.left}>
                                        <MaterialCommunityIcons
                                            name="cloud-print-outline"
                                            size={24}
                                            color="#6d7587"
                                        />
                                    </Left>
                                    <Body style={styles.body}>
                                        <Text style={styles.text}>{t('version')} 1.0.0</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </View>
                    </Content>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        flex: 1,
        width: width,
        height: height,
    },
    ptop: {
        marginTop: 20,
    },
    lists: {
        width: width,
        height: height,
        marginLeft: 0,
        backgroundColor: '#fff',
    },
    listitem: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 0,
        width: width,
        height: 50,
        marginLeft: 0,
    },
    listitemDivider: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 0,
        width: width,
        height: 40,
        marginLeft: 0,
    },
    listitemDividerText: {
        fontSize: 14,
        color: '#6d7587',
        fontWeight: '500',
    },
    left: {
        paddingHorizontal: 15,
        marginRight: 15,
    },
    pickerIcon: {
        position: 'absolute',
        right: -150,
    },
    body: {
        borderColor: 'transparent',
    },
    text: {
        fontSize: 18,
        color: '#7c9d32',
        fontWeight: '600',
    },
    active: {
        backgroundColor: '#fff',
    },
});
