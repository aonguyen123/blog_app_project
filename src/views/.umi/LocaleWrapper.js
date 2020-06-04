import React from 'react';
import {
    _setIntlObject,
    addLocaleData,
    IntlProvider,
    intlShape,
    LangContext,
    _setLocaleContext,
} from 'umi-plugin-locale/lib/locale';

const InjectedWrapper = (() => {
    let sfc = (props, context) => {
        _setIntlObject(context.intl);
        return props.children;
    };
    sfc.contextTypes = {
        intl: intlShape
    };
    return sfc;
})();

import moment from 'moment';
import 'moment/locale/vi';
moment.locale('en');

const baseSeparator = '-';
const useLocalStorage = true;

import { ConfigProvider } from 'antd';

let defaultAntd = require('antd/es/locale/en_US');
defaultAntd = defaultAntd.default || defaultAntd;

const localeInfo = {
    'en-US': {
        messages: {
            ...(locale => (locale.__esModule ? locale.default : locale))(
                require('./../../locales/en-US')
            ),
            ...(locale => (locale.__esModule ? locale.default : locale))(
                require('./../Login/locales/en-US')
            ),
            ...(locale => (locale.__esModule ? locale.default : locale))(
                require('./../Home/locales/en-US')
            ),
        },
        locale: 'en-US',
        antd: require('antd/es/locale/en_US'),
        data: require('@formatjs/intl-pluralrules/dist/locale-data/en'),
        momentLocale: ''
    },
    'vi-VN': {
        messages: {
            ...(locale => (locale.__esModule ? locale.default : locale))(
                require('./../../locales/vi-VN')
            ),
            ...(locale => (locale.__esModule ? locale.default : locale))(
                require('./../Login/locales/vi-VN')
            ),
            ...(locale => (locale.__esModule ? locale.default : locale))(
                require('./../Home/locales/vi-VN')
            ),
        },
        locale: 'en',
        antd: require('antd/es/locale/vi_VN'),
        data: require('@formatjs/intl-pluralrules/dist/locale-data/vi'),
        momentLocale: 'vi-vn'
    },
};

class LocaleWrapper extends React.Component {
    state = {
        locale: 'en'
    };
    getAppLocale() {
        let appLocale = {
            locale: 'en-US',
            messages: {},
            data: require('@formatjs/intl-pluralrules/dist/locale-data/en'),
            momentLocale: 'en-us',
        };
  
        if (
            useLocalStorage &&
            typeof localStorage !== 'undefined' &&
            localStorage.getItem('umi_locale') &&
            localeInfo[localStorage.getItem('umi_locale')]
        ) {
            moment.locale(localeInfo[localStorage.getItem('umi_locale')].momentLocale);
            appLocale = localeInfo[localStorage.getItem('umi_locale')];
        } else {
            moment.locale('en');
            appLocale = localeInfo['en-US'] || appLocale;
        }
        window.g_lang = appLocale.locale;
        window.g_langSeparator = baseSeparator || '-';
        appLocale.data && addLocaleData(appLocale.data);
        return appLocale;
    }
    reloadAppLocale = () => {
        const appLocale = this.getAppLocale();
        this.setState({
            locale: appLocale.locale
        });
    };

    render() {
        const appLocale = this.getAppLocale();
        // react-intl must use `-` separator
        const reactIntlLocale = appLocale.locale.split(baseSeparator).join('-');
        const LangContextValue = {
            locale: reactIntlLocale,
            reloadAppLocale: this.reloadAppLocale
        };
        let ret = this.props.children;
        ret = (
            <IntlProvider
                locale={reactIntlLocale}
                messages={appLocale.messages}
            >
                <InjectedWrapper>
                    <LangContext.Provider value={LangContextValue}>
                        <LangContext.Consumer>
                            {value => {
                                _setLocaleContext(value);
                                return this.props.children;
                            }}
                        </LangContext.Consumer>
                    </LangContext.Provider>
                </InjectedWrapper>
            </IntlProvider>
        );
        
        return (
            <ConfigProvider
                locale={
                    appLocale.antd
                        ? appLocale.antd.default
                        : defaultAntd
                }
            >
                {ret}
            </ConfigProvider>
        );
    }
}
export default LocaleWrapper;
