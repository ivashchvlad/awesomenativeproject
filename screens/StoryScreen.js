import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { MonoText } from '../components/StyledText';
import { getStory } from '../services/hnAPI';
import { createStackNavigator } from 'react-navigation';

export const StoryScreen = ({ navigation, onNavigationStateChange}) => {
    const [story, setStory] = useState();
    const [realContentHeight, setRealContentHeight] = useState(100)
    useEffect(() => {
        let id = JSON.stringify(navigation.getParam('storyId', '0'));
        getStory(id).then(_story => setStory(_story));
    }, []);

    const goBackHome = () => {
        navigation.navigate('Main');
    }

    handleNavigationChange = (navState) => {
        if (navState.title) {
            const _realContentHeight = parseInt(navState.title, 10) || 0; // turn NaN to 0
            setRealContentHeight(_realContentHeight);
        }
        if (typeof onNavigationStateChange === "function") {
            onNavigationStateChange(navState);
        }
    }

    if (!story) return null;
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text
                    key={story.title}
                    style={styles.storyTitleText}
                >
                    {story.title + '  '}
                    {story.url && <Ionicons name='md-open' />}
                </Text>
                <View
                style={styles.storyCredential}
                >
                    <Text style={styles.storyByText}>By: {story.by}</Text>
                    <Text style={styles.storyScoreText}>Score: {story.score}</Text>
                </View>
                <WebView
                    originWhitelist={['*']}
                    source={{ html: story.text+styleForWebView }}
                    scalesPageToFit={false}
                    style={{ 
                        minHeight: 200, 
                        width: Math.round(Dimensions.get('window').width),
                        height: Math.max(realContentHeight, 200),
                        backgroundColor: 'grey' }}
                    scrollEnabled={false}
                    javaScriptEnabled={false}
                    onNavigationStateChange={handleNavigationChange}
                />
            </View>
        </ScrollView>
    );
}

StoryScreen.navigationOptions = ({ navigation }) => ({
    title: "Story",
    goDOIT: () => { console.log('ok') },
    headerLeft: (
        <Button title={"< Back"} onPress={() => { navigation.navigate('Ask') }} />
    ),
});

export default StoryScreen

export const StoryStack = createStackNavigator({
    Story: StoryScreen,
}, {
    web: { headerMode: 'float' },
    default: {}
});

var script = `
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
        font-family: 'system font';
        color: grey;
    }
</style>
<script>
${script}
</script>`;

const styles = StyleSheet.create({
    story: {
        minHeight: 100,
        padding: 5,
        marginBottom: 5,
        backgroundColor: 'white',
    },
    storyCredential: {

        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        marginTop: 3,
    },
    storyByText: {
        fontSize: 13,
        color: '#147EFB',
    },
    storyScoreText: {
        fontSize: 13,
        color: '#FC3158',
    },
    storyTitleText: {
        fontSize: 18,
        color: 'rgba(96,100,109, 1)',
    }
})
