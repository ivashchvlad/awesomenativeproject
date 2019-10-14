import React, {useState, useEffect} from 'react';
import { getStory } from '../services/hnAPI';
import HtmlNativeView from '../components/HtmlNativeView';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

function KidsList({itemId}) {
    const [list, setList] = useState([]);
    useEffect(() => {
        getKids(itemId, 0).then(() => console.log('ok!'));
    }, []);

    const getKids = async (itemId, level) => {
        getStory(itemId).then(item => {
            if (item.kids) {
                item.kids.map(kid => getKids(kid, level+1))
            }
            setList([...list, (<Comment kid={item} level={level}/>)])
        })
    }
    if(!list) return <Text>loading list</Text>
    console.log(list);
    return (
        <View>
            {list}
        </View>
    )
}

export default KidsList

// Recursion function to get all comments and subcomments


const Comment = ({kid, level}) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');
    if (!kid) return <Text>loading Comment</Text>
    return (
        <View
            key={kid.id}
            id={'comment'}
            style={{ 
                paddingLeft: level*20,
                backgroundColor: "white",
                marginBottom: 10,
                paddingBottom: 10, 
            }}
        >
            <View
                style={styles.storyCredential}
            >
                <Text style={styles.storyByText}>By: {kid.by}</Text>
                <Text style={styles.storyTimeText}>
                    {timeAgo.format(kid.time * 1000, 'twitter')}
                </Text>
            </View>
            <HtmlNativeView key={kid.id} html={kid.text} />
        </View>
    )
}

const styles = StyleSheet.create({
    comment: {
        backgroundColor: "white",
        marginBottom: 10,
        paddingBottom: 10,
    },
    storyCredential: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingBottom: 5,
        paddingTop: 5,
        backgroundColor: "white",
    },storyByText: {
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
});