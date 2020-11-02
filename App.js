import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {enableScreens} from 'react-native-screens';
import {getLang, t} from './Components/AppFiles/Lang';
import firebase from './Components/AppFiles/Functions/FireBase/firebaseConfig';
import {AntDesign} from "@expo/vector-icons";
import AsyncStorage from '@react-native-community/async-storage';
import * as Network from 'expo-network'
import {ProgramLockContext} from './Components/AppFiles/Functions/Hooks/Authentication/Lock/ProgramLockContext';
import {PasswordSetAndFingerSetContext} from "./Components/AppFiles/Functions/Hooks/Authentication/FingerAndSetPass/PasswordSetAndFingerSetContext";

enableScreens();
import {Alert} from 'react-native'
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
    Barcode,
    Notify,
    Bonusy,
    Campaign,
    Cards,
    TermUses,
    ProfileSection,
    BarcodeScanDo,
    Service,
    ProgramLocker,
    SetFing,
    SetPassword,
    SplashScreen,
    PayWel,
    SelectCard,
    PinAbouts, NotifyAbout
} from "./Components/AppFiles/Screens/CallScreen";

import AppSlider from './Components/AppFiles/Screens/ScreenFolder/AppIntro/AppSlider'
import NotifyInform from "./Components/AppFiles/Screens/ScreenFolder/Bread/Components/Notify/NotifyInform";
import * as LocalAuthentication from "expo-local-authentication";

const AuthStack = createStackNavigator();
const LocalAuthStack = createStackNavigator();
const AuthStackScreen = (props) => (
    <AuthStack.Navigator headerMode="none">
        <AuthStack.Screen
            name="Login"
            {...props}
            component={Login}
        />
        <AuthStack.Screen
            name="ForgotPass"
            component={ForgotPass}
            {...props}
        />
        <AuthStack.Screen
            name="Create"
            component={Register}
            {...props}
        />
    </AuthStack.Navigator>
);

const LocalAuthStackScreen = (props) => (
    <LocalAuthStack.Navigator headerMode="SetPass">
        <LocalAuthStack.Screen
            name="SetPass"
            component={SetPassword}
            {...props}
        />
        <LocalAuthStack.Screen
            name="SetFinger"
            component={SetFing}
            {...props}
        />
    </LocalAuthStack.Navigator>
);

const Tabs = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const StartShoppingStack = createStackNavigator();
const CampaignStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = (props) => (
    <HomeStack.Navigator headerMode="none">
        <HomeStack.Screen name="Home" {...props} component={HomeSc}/>
    </HomeStack.Navigator>
);
const StartShoppingScreens = (props) => (
    <StartShoppingStack.Navigator headerMode="none" initialRouteName="PayWelCome">
        <StartShoppingStack.Screen name="PayWelCome" {...props} component={PayWel}/>
    </StartShoppingStack.Navigator>
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
    <OtherStacks.Navigator headerMode="none" screenOptions={{animationEnabled: false}}>
        <OtherStacks.Screen name="AccountSettings" component={AccSettings}/>
        <OtherStacks.Screen name="Bonuses" component={Bonusy}/>
        <OtherStacks.Screen name="PinAbout" component={PinAbouts}/>
        <OtherStacks.Screen name="Cards" component={Cards}/>
        <OtherStacks.Screen name="Map" component={Map}/>
        <OtherStacks.Screen name="Histories" component={Histories}/>
        <OtherStacks.Screen name="ContactUs" component={Contact}/>
        <OtherStacks.Screen name="Settings" component={Setting}/>
        <OtherStacks.Screen name="SettedPass" component={SetPassword}/>
        <OtherStacks.Screen name="TermOfUses" component={TermUses}/>
        <OtherStacks.Screen name="OneCampaign" component={Campaign}/>
        <OtherStacks.Screen name="OneService" component={Service}/>
        <OtherStacks.Screen name="OneCheck" component={Check}/>
        <OtherStacks.Screen name="Notification" component={Notify}/>
        <OtherStacks.Screen name="AboutNotify" component={NotifyAbout}/>
        <OtherStacks.Screen name="SelectCard" component={SelectCard}/>
        <OtherStacks.Screen name="Buy" component={Barcode}/>
        <OtherStacks.Screen name="Barcode" options={{animationEnabled: true, animationTypeForReplac: "pop"}}
                            component={BarcodeScanDo}/>
        <OtherStacks.Screen name="PayThanks" component={PayEnd}
                            options={{animationEnabled: true, animationTypeForReplace: "pop"}}/>
    </OtherStacks.Navigator>
)

const TabsScreen = () => (
    <Tabs.Navigator
        headerMode="none"
        initialRouteName="Home"
        activeColor="#7c9d32"
        inactiveColor="rgba(0,0,0,.5)"
        barStyle={{backgroundColor: '#fff', borderColor: '#fff', borderWidth: 0, borderRadius: 0}}
        screenOptions={({route}) => ({
            tabBarIcon: ({color = "#7c9d32"}) => {
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
            tabBarLabel: () => {
                const names = {
                    Home: t('home'),
                    Start: t('start'),
                    Campaign: t('campaigns'),
                    Profile: t('params'),
                }
                return names[route.name]
            },
            tabBarColor: "#ffffff",
        })}
    >
        <Tabs.Screen name="Home" options={{tabBarLabel: t('home')}} component={HomeStackScreen}/>
        <Tabs.Screen name="Start" options={{tabBarLabel: t('start')}} component={StartShoppingScreens}/>
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

function PreView(props) {
    return <NotifyInform/>
}

export default function (props) {
    const [firstOpenSlider, setfirstOpenSlider] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [haveLocalAuth, sethaveLocalAuth] = React.useState(false)

    async function getNetStat() {
        let status = await Network.getNetworkStateAsync();
        if (!status.isConnected || !status.isInternetReachable) {
            Alert.alert(
                'İnternet Xətası',
                "İnternetə qoşulub təkrar yoxlayın",
                [
                    {
                        text: t('cancel'),
                        style: 'cancel',
                    },
                ],
                {cancelable: true}
            );
        }
    }

    function changeStat() {
        AsyncStorage.setItem('firstOp', 'Ok');
        AsyncStorage.getItem('firstOp').then((a) => {
            setfirstOpenSlider(a)
        });
    }

    function getfirstOpen() {
        AsyncStorage.getItem('firstOp').then((a) => {
            setfirstOpenSlider(a)
        });
    }

    function getFirstOpened(props) {

        return firstOpenSlider == null ? <AppSlider callfunc={() => changeStat()} {...props} /> :
            <NavigateAuth {...props} />;
    }

    function AuthVerify(props) {
        const [notOpen, setNotOpen] = React.useState(true)

        function doorOpen() {
            setNotOpen(false)
        }

        return notOpen ? (
                <ProgramLockContext.Provider value={{notOpen, setNotOpen}}>
                    <ProgramLockScreens {...props}
                                        changeDoor={() => doorOpen()}/>
                </ProgramLockContext.Provider>
            ) :
            <Screen {...props} />;
    }

    let localAuthP = null
    let fingerLock = null

    function StatusFingerPrintSetPass(props) {

        async function hasHardware() {
            let permission = await LocalAuthentication.hasHardwareAsync()
            if (permission) {
                let type = await LocalAuthentication.supportedAuthenticationTypesAsync(1);
                let isFinger = type.includes(1)
                if (isFinger) {
                    return true
                }
            }
        }

        function getStatusFingerAndProgramLock() {
            var fingerStat = hasHardware()
            AsyncStorage.getItem('localAuthPass').then((a) => {
                if (a !== null) {
                    localAuthP = a
                } else {
                    localAuthP = null
                }
                console.log('Password Stat ' + a)
            });
            if (fingerStat) {
                AsyncStorage.getItem('haveFinger').then((b) => {
                    if (b == 'Haved') {
                        fingerLock = 'Haved'
                    } else if (b == 'Not Haved') {
                        fingerLock = 'Not Haved'
                    } else {
                        fingerLock = null
                    }
                    console.log('Finger Stat ' + b)
                });
            } else {
                fingerLock = null
            }
        }

        function getStatusLogin() {
            getStatusFingerAndProgramLock()
            var statHardWare = hasHardware()
            if (statHardWare) {
                if (localAuthP !== null && fingerLock == 'Haved') {
                    sethaveLocalAuth(false)
                } else if (localAuthP !== null && fingerLock == 'Not Haved') {
                    sethaveLocalAuth(false)
                } else {
                    sethaveLocalAuth(true)
                }
            } else {
                AsyncStorage.getItem('localAuthPass').then((a) => {
                    if (a !== null) {
                        sethaveLocalAuth(false)
                    } else {
                        sethaveLocalAuth(true)
                    }
                });
            }
        }

        React.useEffect(() => {
            getStatusLogin()
        }, [])

        return haveLocalAuth ? <AuthVerify {...props} /> :
            (<PasswordSetAndFingerSetContext.Provider value={{haveLocalAuth, sethaveLocalAuth}}>
                    <LocalAuthStackScreen {...props} />
                </PasswordSetAndFingerSetContext.Provider>
            )
    }

    function NavigateAuth(props) {
        return user ? <StatusFingerPrintSetPass {...props}/> : <AuthStackScreen {...props}/>
    }

    React.useEffect(() => {
        getNetStat()
        console.disableYellowBox = true;
        getLang()
        getfirstOpen()
        getFirstOpened()
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setUser(user.uid);
            } else {
                setUser(null);
            }
        });
    }, [])

    function SystemOpen(props) {
        const [isready, setisReady] = React.useState(false)
        React.useEffect(() => {
            setTimeout(() => {
                setisReady(true)
            }, 2500)
        }, [])
        return isready ? <NavigateAuth {...props} /> : <SplashScreen/>
    }

    return (
        <Root>
            <NavigationContainer>
                <SystemOpen {...props}/>
            </NavigationContainer>
        </Root>

    );
};
