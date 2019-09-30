import React, { useState, useEffect} from 'react'
import { getStory } from '../services/hnAPI';

import {
    Text,
    View
} from 'react-native';

const StoryItem = ({storyId}) => {
    const [story, setStory] = useState();
    useEffect(() => {
        getStory(storyId).then(_story => setStory(_story));
    }, [])
    if(!story) return <Text>loading story</Text>;
    return (
        <View style={{paddingBottom: 3}}>
            <Text>{story.title}</Text>
        </View>
    )
}

export default StoryItem
