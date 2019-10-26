import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    RefreshControl
} from 'react-native';
import axios from 'axios'

import { getStory } from '../services/hnAPI';
import HTMLView from 'react-native-htmlview';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { FlatList } from 'react-native-gesture-handler';
import CommentItem from '../components/CommentItem';

export const StoryScreen = ({ navigation, onNavigationStateChange }) => {
    const [story, setStory] = useState();
    const [comments, setComments] = useState([]);
    const [counter, setCounter] = useState(3);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        let id = JSON.stringify(navigation.getParam('storyId', '0'));
        getStory(id, source.token).then(_story => {
            setStory(_story);
            if (_story.kids) {
                setComments(_story.kids.slice(0, 2));
            }
            else {
                setComments([]);
            }
        }).catch(err => {
            if(axios.isCancel(err)) console.log('canceled'); else throw err
        });

        return cleanup = () => source.cancel();
    }, []);

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const handleLoadMore = () => {
        if (counter < story.kids.length) {
            setComments([...comments, ...story.kids.slice(counter, counter + 2)]);
            setCounter(counter + 2);
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        let id = JSON.stringify(navigation.getParam('storyId', '0'));
        getStory(id).then(_story => {
            setStory(_story);
            if (_story.kids) {
                setComments(_story.kids.slice(0, 2));
            }
            else {
                setComments([]);
            }
            setRefreshing(false);
        });
    }, [refreshing]);

    if (!story) return null;

    const header = (
        <View style={styles.openingPost}>
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
                    {timeAgo.format(story.time * 1000, 'twitter')}
                </Text>
                <Text style={styles.storyScoreText}>Score: {story.score || "0"}</Text>
            </View>
            {story.text &&
                <HTMLView value={story.text} />
            }

        </View>
    );

    return (
        <FlatList
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}
            data={comments}
            renderItem={({ item }) => 
                <CommentItem item={item} level={0}/>
            }
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListHeaderComponent={header}
        />
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
        paddingHorizontal: 6,
        paddingVertical: 10,
        marginBottom: 10,
    }
})

