import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import NumberButtons from './Components/NumberButtons';
import ProgramLockHeader from './Components/ProgramLockHeader';
import FooterBar from './Components/FooterBar';
import CodeField from './Components/CodeField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import firebase from "../../../../../Functions/FireBase/firebaseConfig";

export default class ProgramLock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            userAvatar: null,
            userLogined: false,
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    async getInfo() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        if (user != null) {
            firebase
                .database()
                .ref('users/' + user.uid + '/userInfos')
                .on('value', (data) => {
                    var newData = data.toJSON();
                    this.setState({
                        userAvatar: newData.profPic,
                        userName: newData.email
                    })
                })
        } else {
            alert('Connection Error');
        }
    }

    completed() {
        this.setState({
            userLogined: true,
        })
    }

    render() {
        return (
            <View>
                <KeyboardAwareScrollView>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <ProgramLockHeader
                                {...this.props}
                                userName={this.state.userName}
                                userAvatar={this.state.userAvatar}
                            />
                        </View>
                        <View style={styles.codefieldArena}>
                            <CodeField {...this.props} />
                        </View>
                        <View style={styles.buttons}>
                            <NumberButtons {...this.props} />
                        </View>
                        <View style={styles.footer}>
                            <FooterBar {...this.props} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 160,
        backgroundColor: "#7c9d32",
        width: width,
    },
    codefieldArena: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        width: width,
    },
    buttons: {
        position: 'absolute',
        top: 230,
        left: 9,
        right: 0,
        height: 290,
        width: width,
        backgroundColor: "red",
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        height: 70,
        left: 0,
        right: 0,
        width: width,
    },
});
