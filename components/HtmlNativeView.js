import React, { useState } from 'react'
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';

import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    PixelRatio,
    Dimensions,
} from 'react-native';


function HtmlNativeView({html}) {
    const [realContentHeight, setRealContentHeight] = useState(100);

    const handleNavigationChange = (navState) => {
        if (navState.title) {
            const _realContentHeight = parseInt(Math.round(navState.title) + 10, 10) || 0; // turn NaN to 0
            setRealContentHeight(_realContentHeight);
        }
        if (typeof onNavigationStateChange === "function") {
            onNavigationStateChange(navState);
        }
    }

    const getWebViewHeight = () => {
        const ratio = (Constants.platform.ios.model.includes('iPhone 5')) ? 
            (PixelRatio.get()) : 
            (PixelRatio.get());
        return Math.max(realContentHeight, 100) / ratio;
    }
    const source = html + styleForWebView;
    return (
        <View>
            <WebView
                originWhitelist={['*']}
                source={{ html: source }}
                scalesPageToFit={false}
                style={{
                    minHeight: 100,
                    width: Math.round(Dimensions.get('window').width),
                    height: getWebViewHeight(),
                    backgroundColor: 'grey'
                }}
                scrollEnabled={false}
                javaScriptEnabled={true}
                onNavigationStateChange={handleNavigationChange}
                injectedJavaScript={INJECTEDJAVASCRIPT}
            />
        </View>
    )
}

const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `

const script = `
;(function() {
var wrapper = document.createElement("div");
wrapper.id = "height-wrapper";
while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
}
document.body.appendChild(wrapper);
var i = 0;
function updateHeight() {
    document.title = wrapper.clientHeight;
    window.location.hash = ++i;
}
updateHeight();
window.addEventListener("load", function() {
    updateHeight();
    setTimeout(updateHeight, 1000);
});
window.addEventListener("resize", updateHeight);
}());
`;

const styleForWebView = `<style>
    * {
        font-size: 30px;
        font-family: 'system font, San Fransico, Roboto, Helvetica';
        color: grey;
    }
</style>
<script>
${script}
</script>`;

export default HtmlNativeView
