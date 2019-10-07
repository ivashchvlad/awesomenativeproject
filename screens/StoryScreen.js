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
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { getStory } from '../services/hnAPI';
import { createStackNavigator } from 'react-navigation';

export const StoryScreen = ({ navigation }) => {
    const [story, setStory] = useState();
    useEffect(() => {
        let id = JSON.stringify(navigation.getParam('storyId', '0'));
        getStory(id).then(_story => setStory(_story));
    }, []);

    const goBackHome = () => {
        navigation.navigate('Main');
    }

    if (!story) return (
        <View>
            <Text key={1}>loading story</Text>
            <Button onPress={goBackHome} title={"Go back"} />
        </View>
    );
    return (
        <View>
            <Text
                key={story.title}
                style={styles.storyTitleText}
            >
                {story.title + '  '}
                {story.url && <Ionicons name='md-open' />}
            </Text>
            <Button onPress={goBackHome} title={"Go back"} />
        </View>
    )
}

StoryScreen.navigationOptions = ({navigation}) => ({
    title: "Story",
    goDOIT: () => {console.log('ok')},
    headerLeft: (
        <Button  title={"< Back"} onPress={() => {navigation.navigate('Ask')}}/>
    ),
});

export default StoryScreen

export const StoryStack = createStackNavigator({
        Story: StoryScreen,
    }, {
        web: { headerMode: 'float' },
        default: {}
    });

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
            fontSize: 17,
            color: 'rgba(96,100,109, 1)',
        }
    })
