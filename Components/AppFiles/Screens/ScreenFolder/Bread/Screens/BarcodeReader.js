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
            this.renderArena()
            console.log('Barcode Readers')
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
        maxHeight: height / 2,
        minHeight: 250,
        backgroundColor: "#fff"
    },
    downerView: {
        maxHeight: height / 2,
        minHeight: 250,
        backgroundColor: "#fff"
    }
});
