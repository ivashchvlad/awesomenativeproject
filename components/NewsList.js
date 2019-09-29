import React, {useState, useEffect} from 'react'
import { getLatestStoriesId } from '../services/hnAPI';

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
import { FlatList } from 'react-native-gesture-handler';

function NewsList() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        getLatestStoriesId().then(res => setNews(res));
    },[])
    if(!news) {
        return <Text>Loading</Text>
    }
    return (
        <FlatList
            data={news}
            renderItem={({item}) =>
                <Text key={item}>{item.toString()}</Text>
            }
        />
    )
}

export default NewsList
