import React from "react";
import {View, StyleSheet} from "react-native";
//Auth
import LoginScreen from '../ScreenFolder/Auth/Screens/LoginScreen';
import CreateAccount from '../ScreenFolder/Auth/Screens/CreateAccount';
import ForgotPassword from '../ScreenFolder/Auth/Screens/ForgotPassword';
//Drawer And Bread
import Home2 from "../ScreenFolder/Draw/Screens/Home2";
import AccountSettings from "../ScreenFolder/Draw/Screens/AccountSettings";
import Bonuses from "../ScreenFolder/Draw/Screens/Bonuses";
import CardsScreen from "../ScreenFolder/Draw/Screens/CardsScreen";
import Campaigns from "../ScreenFolder/Draw/Screens/Campaigns";
import ContactUs from "../ScreenFolder/Draw/Screens/ContactUs";
import History from "../ScreenFolder/Draw/Screens/History";
import Maps from "../ScreenFolder/Draw/Screens/Maps";
import Settings from "../ScreenFolder/Draw/Screens/Settings";
import BarCodeReader from "../ScreenFolder/Bread/Screens/BarcodeReader";
import PayWelcome from "../ScreenFolder/Bread/Components/PayStart/PayWelcome";
import BarCodes from "../ScreenFolder/Bread/Screens/BarCodes";
import Notifications from "../ScreenFolder/Bread/Screens/Notifications";
import OneCampaign from "../ScreenFolder/Bread/Screens/OneCampaign";
import OneService from "../ScreenFolder/Bread/Screens/OneService";
import OneCheck from "../ScreenFolder/Bread/Screens/OneCheck";
import PayThanks from "../ScreenFolder/Bread/Screens/PayThanks";
import TermOfUses from "../ScreenFolder/Bread/Screens/TermOfUses";
import ProfileSectionArena from "../ScreenFolder/Draw/Component/ProfileSection";
import {StatusBar} from "expo-status-bar";
import ProgramLock from "../ScreenFolder/Auth/Screens/LocalAuth/ProgramLock";
import SetFinger from '../ScreenFolder/Auth/Screens/LocalAuth/SetFinger'
import Splash from "../ScreenFolder/Splash/Splash";
import SetPass from "../ScreenFolder/Auth/Screens/LocalAuth/SetPass";
import CardSelector from "../ScreenFolder/Bread/Components/PayStart/CardSelector";
import PinAbout from "../ScreenFolder/Bread/Components/Pin/PinAbout";
import NotifyInform from "../ScreenFolder/Bread/Components/Notify/NotifyInform";
//Keyboard Aware ScrollView
//ScreenContainer
const ScreenContainer = ({children}) => (
    <View style={styles.container}>
        <StatusBar style="dark" backgroundColor="#fff"/>
        {children}
    </View>
);

//Splash Return
export const SplashScreen = () => (
    <ScreenContainer>
        <Splash/>
    </ScreenContainer>
);
//Auth Return
export const Login = (props) => (
    <ScreenContainer>
        <LoginScreen {...props}   />
    </ScreenContainer>
);

export const Register = (props) => (
    <ScreenContainer>
        <CreateAccount {...props}/>
    </ScreenContainer>
);

export const ForgotPass = (props) => (
    <ScreenContainer>
        <ForgotPassword {...props} />
    </ScreenContainer>
);

export const ProgramLocker = (props) => (
    <ScreenContainer>
        <ProgramLock {...props} />
    </ScreenContainer>
);

export const SetFing = (props) => (
    <ScreenContainer>
        <SetFinger {...props} />
    </ScreenContainer>
);

export const SetPassword = (props) => (
    <ScreenContainer>
        <SetPass {...props}/>
    </ScreenContainer>
)

export const HomeSc = (props) => (
    <ScreenContainer>
        <Home2 {...props} />
    </ScreenContainer>
);

export const AccSettings = (props) => (
    <ScreenContainer>
        <AccountSettings {...props} />
    </ScreenContainer>
);

export const Bonusy = (props) => (
    <ScreenContainer>
        <Bonuses {...props} />
    </ScreenContainer>
);

export const PinAbouts = (props) => (
    <ScreenContainer>
        <PinAbout {...props} />
    </ScreenContainer>
);

export const Cards = (props) => (
    <ScreenContainer>
        <CardsScreen {...props} />
    </ScreenContainer>
);

export const AllCampaigns = (props) => (
    <ScreenContainer>
        <Campaigns {...props} />
    </ScreenContainer>
);

export const Contact = (props) => (
    <ScreenContainer>
        <ContactUs {...props} />
    </ScreenContainer>
);

export const Histories = (props) => (
    <ScreenContainer>
        <History {...props} />
    </ScreenContainer>
);

export const Map = (props) => (
    <ScreenContainer>
        <Maps {...props} />
    </ScreenContainer>
);

export const Setting = (props) => (
    <ScreenContainer>
        <Settings {...props} />
    </ScreenContainer>
);

//Bread Return

export const PayWel = (props) => (
    <ScreenContainer>
        <PayWelcome {...props} />
    </ScreenContainer>
);

export const SelectCard = (props) => (
    <ScreenContainer>
        <CardSelector {...props} />
    </ScreenContainer>
);

export const Barcode = (props) => (
    <ScreenContainer>
        <BarCodeReader {...props} />
    </ScreenContainer>
);

export const BarcodeScanDo = (props) => (
    <ScreenContainer>
        <BarCodes {...props} />
    </ScreenContainer>
);

export const PayEnd = (props) => (
    <ScreenContainer>
        <PayThanks {...props} />
    </ScreenContainer>
);

export const Notify = (props) => (
    <ScreenContainer>
        <Notifications {...props} />
    </ScreenContainer>
);

export const NotifyAbout = (props) => (
    <ScreenContainer>
        <NotifyInform {...props} />
    </ScreenContainer>
);

export const Campaign = (props) => (
    <ScreenContainer>
        <OneCampaign {...props} />
    </ScreenContainer>
);

export const Service = (props) => (
    <ScreenContainer>
        <OneService {...props} />
    </ScreenContainer>
);

export const Check = (props) => (
    <ScreenContainer>
        <OneCheck {...props} />
    </ScreenContainer>
);

export const TermUses = (props) => (
    <ScreenContainer>
        <TermOfUses {...props} />
    </ScreenContainer>
);

export const ProfileSection = (props) => (
    <ScreenContainer>
        <ProfileSectionArena {...props} />
    </ScreenContainer>
);


//Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: "center",
        textAlign: "center",
        backgroundColor: "#fff"
    }
});