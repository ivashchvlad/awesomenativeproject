import React, {useState, useEffect} from 'react'
import StoryItem from '../components/StoryItem' 

import {
    Text,
    StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const NewsList = ({getStories, navigation}) => {
    const [latestNews, setLatestNews] = useState([]);
    useEffect(() => {
        getStories().then(res => setLatestNews(res));
    },[])
    if(!latestNews) {
        return <Text>Loading latest news...</Text>
    }
    return (
        <FlatList
            data={latestNews}
            renderItem={({item, id}) =>
                <StoryItem key={id} storyId={item} navigation={navigation}/>
            }
            keyExtractor={(item, index) => index.toString()}
            style={styles.flatList}
        />
    )
}

const styles = StyleSheet.create({
    flatList: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingBottom: 20
    }
})

export default NewsList
