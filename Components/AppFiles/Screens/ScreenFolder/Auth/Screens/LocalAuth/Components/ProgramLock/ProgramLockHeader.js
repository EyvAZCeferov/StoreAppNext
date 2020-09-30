import * as React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {Thumbnail} from 'native-base';

var width = Dimensions.get('window').width;
const icon = require('../../../../../../../../../assets/icon.png');
import customStyle from '../../../../../../../../../assets/Theme';
import {StatusBar} from "expo-status-bar";
import {t} from "../../../../../../../Lang";

export default class ProgramLockHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            pp: null
        }
    }

    componentDidMount() {
        this.getInfo();
        setInterval(() => {
            this.getInfo();
        }, 0)
    }

    getInfo() {
        const name = this.props.userName;
        const pp = this.props.userAvatar;
        this.setState({name, pp})
        this.renderElements();
    }

    renderElements() {
        if (this.state.name != null || this.state.pp != null) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Thumbnail
                            rounded
                            source={{
                                uri: this.state.pp,
                            }}
                        />
                        <Text style={styles.title}>{this.state.name}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Thumbnail
                            rounded
                            source={icon}
                        />
                        <Text style={styles.title}>{t('namesurname')}</Text>
                    </View>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" backgroundColor="#fff"/>
                {this.renderElements()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: "transparent",
        textAlign: 'center',
    },
    header: {
        width: width,
        height: "100%",
        paddingTop: '15%',
        backgroundColor: 'transparent',
        borderColor: "transparent",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    title: {
        color: 'rgba(0,0,0,.6)',
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 4,
        lineHeight: 18,
        backgroundColor: "transparent",
        textAlign: 'center',
        marginTop: 18,
    },
});
