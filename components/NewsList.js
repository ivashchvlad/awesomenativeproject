import React, { useState, useEffect } from 'react'
import StoryItem from '../components/StoryItem'

import {
    Text,
    StyleSheet,
    Platform,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const NewsList = ({ stories, navigation, handleRefreshControl, header }) => {
    const [_stories, setStories] = useState([]);
    const [counter, setCounter] = useState(6);

    useEffect(() => {
        if (stories) setStories(stories.slice(0, 5));
    }, [stories]);

    const handleLoadMore = () => {
        setStories([..._stories, ...stories.slice(counter, counter + 5)]);
        setCounter(counter + 5);
    }

    if (!stories) {
        return <Text>Loading latest news...</Text>
    }
    return (
        <FlatList
            data={_stories}
            renderItem={({ item }) =>
                <StoryItem storyId={item} navigation={navigation} />
            }
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            refreshControl={handleRefreshControl}
            ListHeaderComponent={(header) ? header : null}
        />
    )
}

const styles = StyleSheet.create({
    flatList: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingBottom: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 0,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 18,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
})

export default NewsList
