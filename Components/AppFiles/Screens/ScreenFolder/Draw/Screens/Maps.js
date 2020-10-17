import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Tabs, Tab} from 'native-base';
import TabMapsLists from '../Component/Maps/TabMapsLists';
import TabMapsView from '../Component/Maps/TabMapsView';
import ScreensStandart from '../Component/ScreensStandart';
import {t} from '../../../../Lang';
import {StatusBar} from "expo-status-bar";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Maps extends React.Component {
    render() {
        return (
            <View style={styles.f1}>
                <ScreensStandart {...this.props} name={t('map')}/>
                <StatusBar backgroundColor="#fff" style="dark" />
                <Tabs tabStyle={styles.tabsBg} activeTabStyle={styles.activeTab}
                      containerStyle={styles.tabsBg}>
                    <Tab
                        heading={t('mapList')}
                        tabStyle={styles.tabsBg}
                        containerStyle={styles.tabsBg}
                        activeTabStyle={styles.activeTab}
                    >
                        <TabMapsLists/>
                    </Tab>
                    <Tab
                        tabStyle={styles.tabsBg}
                        containerStyle={styles.tabsBg}
                        heading={t('mapView')}
                        activeTabStyle={styles.activeTab}
                    >
                        <TabMapsView/>
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    f1: {
        width: width,
        height: height,
        padding: 0,
        margin: 0,
    },
    tabsBg: {
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
    },
    activeTab: {
        backgroundColor: "#7c9d32",
        padding: 0,
        margin: 0,
    }
});
