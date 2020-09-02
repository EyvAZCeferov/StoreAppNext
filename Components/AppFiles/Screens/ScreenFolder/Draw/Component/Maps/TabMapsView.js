import * as React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Permissions from "expo-permissions";
import firebase from '../../../../../Functions/FireBase/firebaseConfig'

const locations = require('../../../../../../../assets/locations.json');
export default class TabMapsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            markers: locations
        }
    }

    async getPerm() {
        const {status} = await Permissions.getAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            const response = await Permissions.askAsync(Permissions.LOCATION);
        }
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) =>
                this.setState({latitude, longitude}),
            (error) => console.log('Error:', error)
        );
    }

    componentDidMount() {
        this.getPerm();
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.mapStyle}
                    followsUserLocation={true}
                    cacheEnabled={true}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    zoomTapEnabled={true}
                    showsScale={true}
                    userLocationAnnotationTitle={firebase.auth().currentUser.email}
                    showsUserLocation={true}
                    showsTraffic={false}
                    showsPointsOfInterest={false}
                    showsCompass={true}
                    loadingEnabled={true}
                    scrollEnabled={true}
                    paddingAdjustmentBehavior="always"
                    pitchEnabled={true}
                    showsBuildings={false}
                    showsIndoors={false}
                    rotateEnabled={true}
                    mapType="hybrid"
                    liteMode={false}
                    loadingIndicatorColor="#7c9d32"
                    provider="google"
                    showsMyLocationButton={true}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    {this.state.markers.map(marker => (
                        <Marker
                            coordinate={marker.coords}
                            title={marker.name}
                            description={marker.address}
                        />
                    ))}

                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
