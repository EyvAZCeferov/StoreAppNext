import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {enableScreens} from 'react-native-screens';
import {getLang, t} from './Components/AppFiles/Lang';
import firebase from './Components/AppFiles/Functions/FireBase/firebaseConfig';
import {AntDesign} from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage';

enableScreens();
import {Root} from 'native-base';
//Screnns
import {
    Login,
    Register,
    HomeSc,
    AccSettings,
    Map,
    Check,
    AllCampaigns,
    ForgotPass,
    Histories,
    Contact,
    Setting,
    PayEnd,
    Paying,
    Barcode,
    Notify,
    Bonusy,
    Campaign,
    Cards,
    TermUses,
    ProfileSection,
    BarcodeScanDo,
    Service,
    ProgramLocker
} from "./Components/AppFiles/Screens/CallScreen";

import AppSlider from './Components/AppFiles/Screens/ScreenFolder/AppIntro/AppSlider'

const AuthStack = createStackNavigator();
const AuthStackScreen = (props) => (
    <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen
            name="Login"
            {...props}
            component={Login}
        />
        <AuthStack.Screen
            name="CreateAccount"
            component={Register}
            {...props}
        />
        <AuthStack.Screen
            name="ForgotPass"
            component={ForgotPass}
            {...props}
        />
    </AuthStack.Navigator>
);

const Tabs = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const BarcodeStack = createStackNavigator();
const CampaignStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = (props) => (
    <HomeStack.Navigator headerMode="none">
        <HomeStack.Screen name="Home" {...props} component={HomeSc}/>
    </HomeStack.Navigator>
);
const BarcodeStackScreen = (props) => (
    <BarcodeStack.Navigator headerMode="none">
        <BarcodeStack.Screen name="BarcodeReader" {...props} component={Barcode}/>
    </BarcodeStack.Navigator>
);

const CampaignStackScreen = (props) => (
    <CampaignStack.Navigator headerMode="none">
        <CampaignStack.Screen name="Campaigns" component={AllCampaigns}/>
    </CampaignStack.Navigator>
);

const ProfileStackScreen = (props) => (
    <ProfileStack.Navigator headerMode="none">
        <ProfileStack.Screen name="ProfileSection" component={ProfileSection}/>
    </ProfileStack.Navigator>
);

const OtherStacks = createStackNavigator();

const OtherScreen = () => (
    <OtherStacks.Navigator headerMode="none">
        <OtherStacks.Screen name="AccountSettings" component={AccSettings}/>
        <OtherStacks.Screen name="Bonuses" component={Bonusy}/>
        <OtherStacks.Screen name="Cards" component={Cards}/>
        <OtherStacks.Screen name="Map" component={Map}/>
        <OtherStacks.Screen name="Histories" component={Histories}/>
        <OtherStacks.Screen name="ContactUs" component={Contact}/>
        <OtherStacks.Screen name="Settings" component={Setting}/>
        <OtherStacks.Screen name="TermOfUses" component={TermUses}/>
        <OtherStacks.Screen name="OneCampaign" component={Campaign}/>
        <OtherStacks.Screen name="OneService" component={Service}/>
        <OtherStacks.Screen name="PayPre" component={Paying}/>
        <OtherStacks.Screen name="PayThanks" component={PayEnd}/>
        <OtherStacks.Screen name="OneCheck" component={Check}/>
        <OtherStacks.Screen name="Notification" component={Notify}/>
        <OtherStacks.Screen name="Barcode" options={{animationEnabled: false}} component={BarcodeScanDo}/>
    </OtherStacks.Navigator>
)

const TabsScreen = () => (
    <Tabs.Navigator
        headerMode="none"
        initialRouteName="Home2"
        activeColor="#7c9d32"
        inactiveColor="rgba(0,0,0,.5)"
        barStyle={{backgroundColor: '#fff', borderColor: '#fff', borderWidth: 0, borderRadius: 0}}
        screenOptions={({route}) => ({
            tabBarIcon: ({color}) => {
                const icons = {
                    Home: 'home',
                    Start: 'plus',
                    Campaign: 'paperclip',
                    Profile: 'profile',
                };
                return (
                    <AntDesign
                        name={icons[route.name]}
                        color={color}
                        size={25}
                    />
                )

            },
        })}
    >
        <Tabs.Screen name="Home" options={{tabBarLabel: t('home')}} component={HomeStackScreen}/>
        <Tabs.Screen name="Start" options={{tabBarLabel: t('start')}} component={BarcodeStackScreen}/>
        <Tabs.Screen name="Campaign" options={{tabBarLabel: t('campaigns')}} component={CampaignStackScreen}/>
        <Tabs.Screen name="Profile" options={{tabBarLabel: t('params')}} component={ProfileStackScreen}/>
    </Tabs.Navigator>
);
const NormalScreen = createStackNavigator();

const Screen = (props) => (
    <NormalScreen.Navigator headerMode="none" initialRouteName="Tabs">
        <NormalScreen.Screen name="Tabs" {...props} component={TabsScreen}/>
        <NormalScreen.Screen name="OtherPages" {...props} component={OtherScreen}/>
    </NormalScreen.Navigator>
)

const ProgramLockStack = createStackNavigator();

const ProgramLockScreens = (props) => (
    <ProgramLockStack.Navigator headerMode="none" initialRouteName="ProgramLock">
        <ProgramLockStack.Screen {...props} name="ProgramLock"
                                 component={ProgramLocker}/>
        <ProgramLockStack.Screen {...props} name="Fp" component={ForgotPass}/>
    </ProgramLockStack.Navigator>
)


function NavigateAuth(props) {
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user.uid);
            } else {
                setUser(null);
            }
        });
    }, []);
    return user ? <AuthVerify {...props} /> : <AuthStackScreen {...props}/>;
}

function AuthVerify(props) {
    const [verify, setVerify] = React.useState(false)

    return verify ? <ProgramLockScreens {...props}/> : <Screen {...props} />;
}

function AppIntro(props) {
    var firstOpen = true;
    

    function getfirstOpen() {
        AsyncStorage.getItem('firstOpen').then((a) => {
            firstOpen=a
         });
         console.log(firstOpen)     
         return firstOpen != null ? false : true;
        
    }

    React.useEffect(() => {
        getfirstOpen();
    }, [])

    function changeStat(){
        AsyncStorage.setItem('firstOpen','Ok');
    }

    return firstOpen ? <AppSlider callfunc={()=>changeStat()} {...props} /> : <NavigateAuth {...props} />;
}

export default function (props) {
    React.useEffect(() => {
        getLang();
        console.disableYellowBox = true;
    }, [])
    return (
        <Root>
            <NavigationContainer>
                <AppIntro/>
            </NavigationContainer>
        </Root>

    );
};
