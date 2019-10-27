import React, { useState, useEffect } from 'react';
import Collapsible from 'react-native-collapsible';
import HTMLView from 'react-native-htmlview';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { getStory } from '../services/hnAPI';
import { TouchableWithoutFeedback, FlatList } from 'react-native-gesture-handler';
import { withOrientation } from 'react-navigation';
import axios from 'axios'

const CommentItem = ({ item, level }) => {
    const [comment, setComment] = useState();
    const [open, setOpen] = useState(true);
    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        getStory(item, source.token).then(_story => setComment(_story))
        .catch(err => {
            if(axios.isCancel(err)) console.log('canceled'); else throw err
        });
        return cleanup = () => source.cancel();
    }, [])

    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');

    const handleOnPress = () => {
        setOpen(!open);
    }

    if (!comment) return <Text style={styles.loading}>loading Comment</Text>

    return (
        <View>
            <TouchableWithoutFeedback
                onPress={handleOnPress}
            >
                <View
                    key={comment.id}
                    id={'comment'}
                    style={{
                        paddingHorizontal: 5,
                        paddingLeft: (level * 12) > 100 ? 100 : level == 0 ? 5 : level * 12,
                        borderLeftColor: `rgba(52, 118, 217, ${level*0.2})`,
                        borderLeftWidth: 5*level,
                        backgroundColor: "white",
                        marginBottom: 10,
                        paddingBottom: 10,
                        color: 'grey'
                    }}
                >
                    <View
                        style={styles.storyCredential}
                    >
                        <Text style={styles.storyByText}>By: {comment.by}</Text>
                        <Text style={styles.storyTimeText}>
                            {timeAgo.format(comment.time * 1000, 'twitter')}
                        </Text>
                        <Text style={styles.storyByText}>
                            {comment.kids && (open ? '[-]' : '[+]')}
                        </Text>
                    </View>
                    {comment.deleted ? <Text>comment deleted</Text> :
                        <HTMLView key={comment.id} value={comment.text} />}
                </View>
            </TouchableWithoutFeedback>
            <Collapsible collapsed={!open}>
            <View>
                {comment.kids && 
                    <FlatList
                        data={comment.kids}
                        renderItem={({item}) => 
                            <CommentItem 
                                key={item.id} 
                                item={item} 
                                level={level + 1} 
                            />
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>
            </Collapsible>
        </View>
    )
}

export default CommentItem

const styles = StyleSheet.create({
    loading: {
        height: 100,
        backgroundColor: 'white',
    },
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
    }, storyByText: {
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
