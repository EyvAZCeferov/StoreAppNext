// Libraries
import I18n from 'ex-react-native-i18n';
import * as Localization from 'expo-localization';

// Trasnlations

import en from './en.json';
import az from './az.json';
import ru from './ru.json';
import {AsyncStorage} from 'react-native';


// Bind Translations

I18n.translations = {
    en,
    az,
    ru,
};

// PhoneLocalization

export const getLang = async () => {
    I18n.fallbacks = true;
    try {
        if (await AsyncStorage.getItem('language')) {
            AsyncStorage.getItem('language').then((lang) => {
                I18n.locale = lang;
                Localization.locale = lang;
            })
        } else {
            I18n.locale = 'az';
            Localization.locale = 'az';
        }
        I18n.initAsync();
    } catch (error) {
        console.warn(error.message);
    }
};

getLang();

export const setLang = async (lang) => {
    try {
        AsyncStorage.setItem('language', lang);
        I18n.locale = lang;
        Localization.locale = lang;
        I18n.initAsync();
    } catch (error) {
        console.warn('Dil Seçilmədi.');
    }
};

// Function

export function t(key) {
    return I18n.t(key);
}
