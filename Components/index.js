import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {enableScreens} from 'react-native-screens';

enableScreens();
import {
    SplashScreen,
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
    TermUses
} from "./AppFiles/Screens/CallScreen/index";
import {List, ListItem} from "native-base";
import customStyle from "../assets/Theme";
import {Text} from "react-native";
import {t} from "./AppFiles/Lang";
import SlidingUpPanel from "rn-sliding-up-panel";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen
            name="SignIn"
            component={Login}
            options={{title: "Sign In"}}
        />
        <AuthStack.Screen
            name="CreateAccount"
            component={Register}
            options={{title: "Create Account"}}
        />
        <AuthStack.Screen
            name="ForgetPass"
            component={ForgotPass}
            options={{title: "Forget Password"}}
        />
    </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const BarcodeStack = createStackNavigator();
const CampaignStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeSc}/>
        <HomeStack.Screen name="OneCheck" options={({route}) => ({
            title: route.params.name
        })} component={Check}/>
        <HomeStack.Screen name="Notification" component={Notify}/>
    </HomeStack.Navigator>
);

const BarcodeStackScreen = () => (
    <BarcodeStack.Navigator>
        <BarcodeStack.Screen name="BarcodeReader" component={Barcode}/>
        <BarcodeStack.Screen name="PayPre" component={Paying}/>
        <BarcodeStack.Screen name="PayThanks" component={PayEnd}/>
        <BarcodeStack.Screen name="TermOfUses" component={TermUses}/>
    </BarcodeStack.Navigator>
);
const CampaignStackScreen = () => (
    <CampaignStack.Navigator>
        <CampaignStack.Screen name="Campaigns" component={AllCampaigns}/>
        <CampaignStack.Screen name="OneCampaign" component={Campaign}/>
    </CampaignStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen name="AccountSettings" component={AccSettings}/>
        <ProfileStack.Screen name="Bonuses" component={Bonusy}/>
        <ProfileStack.Screen name="Cards" component={Cards}/>
        <ProfileStack.Screen name="Map" component={Map}/>
        <ProfileStack.Screen name="Histories" component={Histories}/>
        <ProfileStack.Screen name="Campaigns" component={CampaignStackScreen}/>
        <ProfileStack.Screen name="ContactUs" component={Contact}/>
        <ProfileStack.Screen name="Settings" component={Setting}/>
    </ProfileStack.Navigator>
);

const TabsScreen = () => (
    <Tabs.Navigator>
        <Tabs.Screen name="Home" options={{}} component={HomeStackScreen}/>
        <Tabs.Screen name="Start" component={BarcodeStackScreen}/>
        <Tabs.Screen name="Campaign" component={CampaignStackScreen}/>
        <Tabs.Screen name="Profile" component={ProfileStackScreen}/>
    </Tabs.Navigator>
);

function NavigateAuth() {
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        setTimeout(() => {
            setUser('abs');
        }, 3000);
    }, []);
    return user ? <TabsScreen/> : <AuthStackScreen/>;
}


function Nav() {
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);
    return isLoading ? <SplashScreen/> : <NavigateAuth/>;
}

export default function Screen() {
    return (
        <NavigationContainer>
            <Nav/>
        </NavigationContainer>
    );
};



<List style={customStyle.w100}>
    <ListItem itemHeader first>
        <Text style={styles.seperatorText}>{t('recentoperations')}</Text>
        <Text style={styles.listHeaderText}>{t('today')}</Text>
    </ListItem>
    {this.state.checks == null || this.state.checks === null ? (
        <Text style={styles.notFound}>{t('noResult')}</Text>
    ) : (
        this.renderItem3(this.props.navigation)
    )}
</List>