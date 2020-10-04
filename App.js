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
import {CreateAccContext} from './Components/AppFiles/Functions/Hooks/Authentication/CreateAccount/CreateAccContext';

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
    ProgramLocker,
    SetFing,
    SetPassword,
    SplashScreen,
    PayWel,
    SelectCard
} from "./Components/AppFiles/Screens/CallScreen";

import AppSlider from './Components/AppFiles/Screens/ScreenFolder/AppIntro/AppSlider'
import PayWelcome from "./Components/AppFiles/Screens/ScreenFolder/Bread/Components/PayStart/PayWelcome";
import CardSelector from "./Components/AppFiles/Screens/ScreenFolder/Bread/Components/PayStart/CardSelector";

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
            {...props}
            component={RegisterStackScreen}
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
const StartShoppingStack = createStackNavigator();
const CampaignStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RegisterStack = createStackNavigator();

function RegisterStackScreen(props) {
    return (
        <RegisterStack.Navigator headerMode="none" initialRouteName="Create">
            <RegisterStack.Screen
                name="Create"
                component={Register}
                {...props}
            />
            <RegisterStack.Screen
                name="SetPass"
                component={SetPassword}
                {...props}
            />
            <RegisterStack.Screen
                name="SetFinger"
                component={SetFing}
                {...props}
            />
        </RegisterStack.Navigator>
    )
}

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
    <OtherStacks.Navigator headerMode="none">
        <OtherStacks.Screen name="AccountSettings" component={AccSettings}/>
        <OtherStacks.Screen name="Bonuses" component={Bonusy}/>
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
        <OtherStacks.Screen name="Barcode" options={{animationEnabled: false}} component={BarcodeScanDo}/>
        <OtherStacks.Screen name="SelectCard" component={SelectCard}/>
        <OtherStacks.Screen name="Buy" component={Barcode}/>
        <OtherStacks.Screen name="PayPre" component={Paying}/>
        <OtherStacks.Screen name="PayThanks" component={PayEnd}/>
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
    return <CardSelector/>
}

export default function (props) {
    const [firstOpenSlider, setfirstOpenSlider] = React.useState(null);
    const [user, setUser] = React.useState(null);

    async function getNetStat() {
        let status = await Network.getNetworkStateAsync();
        if (!status.isConnected && !status.isInternetReachable) {
            Alert.alert(
                'İnternet Xətası',
                "İnternetə qoşulub təkrar yoxlayın",
                [
                    {
                        text: t('cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ],
                {cancelable: true}
            );
        }
    }

    async function getfirstOpen() {
        AsyncStorage.getItem('firstOp').then((a) => {
            setfirstOpenSlider(a)
        });
    }

    function changeStat() {
        AsyncStorage.setItem('firstOp', 'Ok');
        AsyncStorage.getItem('firstOp').then((a) => {
            setfirstOpenSlider(a)
        });
    }

    function getFirstOpened() {
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

    function NavigateAuth(props) {
        const [userData, setUserData] = React.useState(null);
        React.useEffect(() => {
            setInterval(() => {
                if (userData != null) {
                    if (userData.pleaseCreateAcc === "Create") {
                        firebase.auth().createUserWithEmailAndPassword(userData.userInfos.email, userData.cards.cardId.cardPass).then(data => {
                            var user = firebase.auth().currentUser;
                            firebase
                                .database()
                                .ref('users/' + user.uid).set({userData})
                            setUser(userData)
                        })
                    }
                }
            }, 100)
        }, [])
        return user ? <AuthVerify {...props} /> : (
            <CreateAccContext.Provider value={{userData, setUserData}}>
                <AuthStackScreen {...props}/>
            </CreateAccContext.Provider>
        );
    }

    React.useEffect(() => {
        console.disableYellowBox = true;
        getLang()
        getfirstOpen()
        getNetStat()
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
            }, 1900)
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
