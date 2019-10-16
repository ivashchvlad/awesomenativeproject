import React from 'react';
import HTMLView from 'react-native-htmlview';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const CommentItem = ({kid, level}) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');
    if (!kid) return <Text>loading Comment</Text>
    return (
        <View
            key={kid.id}
            id={'comment'}
            style={{ 
                paddingHorizontal: 5,
                paddingLeft: (level*20)>100 ? 100 : level==0 ? 5 : level*20,
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
            <HTMLView key={kid.id} value={kid.text}/>
        </View>
    )
}

export default CommentItem

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
