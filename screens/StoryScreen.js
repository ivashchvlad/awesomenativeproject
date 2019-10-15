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
    PixelRatio,
} from 'react-native';

import { getStory, getKids } from '../services/hnAPI';
import HtmlNativeView from '../components/HtmlNativeView';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import KidsList from '../components/KidsList';


export const StoryScreen = ({ navigation, onNavigationStateChange }) => {
    const [story, setStory] = useState();
    const [kids, setKids] = useState([]);

    useEffect(() => {
        let id = JSON.stringify(navigation.getParam('storyId', '0'));
        getStory(id).then(_story => {
            setStory(_story);
            // Getting array of all comments
            _story.kids && (getKids(_story.kids).then(data => {
                Promise.all(data).then(_kids => {
                    setKids(_kids);
                })
            }));
        });
    }, []);

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    if (!story) return null;

    const list = story.kids.map(kidId => {
        return <KidsList key={kidId} itemId={kidId} />
    });

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <View style={ styles.openingPost }>
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
                        <Text style={styles.storyTimeText}>
                            { timeAgo.format(story.time*1000, 'twitter') }
                        </Text>
                        <Text style={styles.storyScoreText}>Score: {story.score || "0"}</Text>
                    </View>
                <HtmlNativeView html={story.text} />
            </View>
            {list}
        </ScrollView>
    );
}

StoryScreen.navigationOptions = {
    title: "Story",
};

export default StoryScreen

const styles = StyleSheet.create({
    story: {
        minHeight: 100,
        padding: 5,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    storyCredential: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: "white",
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
        fontSize: 18,
        color: 'rgba(96,100,109, 1)',
        backgroundColor: "white",
        paddingBottom: 10
    },
    comment: {
        backgroundColor: "white",
        marginBottom: 10,
        paddingBottom: 10,
    },
    openingPost: {
        flex: 1,
        backgroundColor: "white",
        paddingBottom: 10,
        marginBottom: 10,
    }
})
