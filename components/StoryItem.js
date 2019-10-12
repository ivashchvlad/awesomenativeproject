import React, { useState, useEffect } from 'react'
import { getStory } from '../services/hnAPI';

import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons'
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


const StoryItem = (props) => {
    const [story, setStory] = useState();
    useEffect(() => {
        getStory(props.storyId).then(_story => setStory(_story));
    }, [])

    const handleStoryPress = () => {
        (story.url) ? 
            WebBrowser.openBrowserAsync(story.url) : 
            props.navigation.push("Story", { storyId: props.storyId});
    }

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')


    if (!story) return <Text key={props.storyId + 1}>loading story</Text>;
    return (
        <TouchableWithoutFeedback
            onPress={handleStoryPress}
        >
            <View
                key={props.storyId + story.by}
                style={styles.story}    
            >
                <View
                    style={styles.storyCredential}
                >
                    <Text style={styles.storyByText}>
                        By: {story.by}
                    </Text>
                    <Text style={styles.storyTimeText}>
                        { timeAgo.format(story.time*1000, 'twitter') }
                    </Text>
                    <Text style={styles.storyScoreText}>
                        Score: {story.score}
                    </Text>
                </View>
                <Text 
                    key={story.title} 
                    style={styles.storyTitleText}
                >
                    {(story.title)} {'  '}
                    {story.url && <Ionicons name='md-open'/>}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}



const styles = StyleSheet.create({
    story: {
        minHeight: 100,
        padding: 5,
        marginBottom: 5,
        backgroundColor: 'white',
    },
    storyCredential: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 10,
        marginTop: 3,
    },
    storyByText: {
        fontSize: 13,
        color: '#147EFB',
    },
    storyTimeText: {
        fontSize: 13,
        color: 'rgb(52, 199, 89)',
        paddingLeft: 5,
        paddingRight: 5
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

export default StoryItem
