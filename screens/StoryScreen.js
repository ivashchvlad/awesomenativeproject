import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { getPopularStories } from '../services/hnAPI'
import NewsList from '../components/NewsList'
import { createStackNavigator } from 'react-navigation';

export const StoryScreen = ({navigation}) => {

    const goBackHome = () => {
        navigation.navigate('Main');
    }

    return (
        <View>
            <Button onPress={goBackHome} title={"Go back"} />
        </View>
    )
}

StoryScreen.navigationOption = {
    header: null,
};



export default StoryScreen



export const StoryStack = createStackNavigator({
    Story: StoryScreen,
}, {
    web: { headerMOde: 'screen'},
    default: {}
});
