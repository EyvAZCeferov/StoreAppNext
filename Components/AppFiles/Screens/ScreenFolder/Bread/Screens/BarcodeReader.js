import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import RecentOperation from '../Components/PayStart/RecentOperation';
import {StatusBar} from "expo-status-bar";
import PayCards from "../Components/PayStart/Paying";
import DropdownAlert from "react-native-dropdownalert";

const succesImage = require('../../../../../../assets/images/Alert/tick.png');

const {width, height} = Dimensions.get("window");
export default class BarCodeReader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: true,
        }
    }

    componentDidMount() {
        const params = this.props.route.params;
        if (params.checkid != null && params.selectedCard != null) {
            this.setState({refresh: false})
        }
    }

    goBack() {
        this.setState({
            refresh: true,
        })
        this.props.navigation.goBack();
    }

    renderArena() {
        const params = this.props.route.params;
        return (
            <View style={styles.content}>
                {this.state.refresh ? (
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                        <StatusBar backgroundColor="#fff" style="dark"/>
                        <ActivityIndicator size="large" color="#7c9d32"/>
                    </View>
                ) : (
                    <View>
                        <StatusBar backgroundColor="#7c9d32" style="light"/>
                        <DropdownAlert
                            ref={ref => this.dropDownAlertRef = ref}
                            useNativeDriver={true}
                            closeInterval={1000}
                            zIndex={5000}
                            updateStatusBar={true}
                            tapToCloseEnabled={true}
                            showCancel={true}
                            elevation={10}
                            isInteraction={true}
                            successImageSrc={succesImage}
                        />
                        <View style={styles.upperView}>
                            <PayCards checkid={params.checkid} cardNumb={params.selectedCard} {...this.props}/>
                        </View>
                        <View style={styles.downerView}>
                            <RecentOperation checkid={params.checkid} {...this.props} />
                        </View>
                    </View>
                )}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.content}>
                {this.renderArena()}
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
