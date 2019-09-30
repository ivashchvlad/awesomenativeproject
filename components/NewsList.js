import React, {useState, useEffect} from 'react'
import { getLatestStoriesId } from '../services/hnAPI';
import StoryItem from '../components/StoryItem' 

import {
    Text
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

function NewsList() {
    const [latestNews, setLatestNews] = useState([]);
    useEffect(() => {
        getLatestStoriesId().then(res => setLatestNews(res));
    },[])
    if(!latestNews) {
        return <Text>Loading latest news...</Text>
    }
    return (
        <FlatList
            data={latestNews}
            renderItem={({item, id}) =>
                <StoryItem storyId={item} />
            }
            keyExtractor={item => item.id}
        />
    )
}

export default NewsList
