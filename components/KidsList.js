import React, { useState, useEffect } from 'react';
import { getStory } from '../services/hnAPI';
import CommentItem from './CommentItem'
import {
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';

function KidsList({ itemId }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        getKids(itemId, 0).then((res) => setList(res));
    }, []);

    //  Recursion function to get all subcomments
    const getKids = async (itemId, level) => {
        return getStory(itemId).then(async item => {
            if (item.kids) {
                let restComments = await Promise.all(item.kids.map(kid =>
                    getKids(kid, level + 1)
                ));
                return [(<CommentItem key={item.id} kid={item} level={level} />), ...restComments];
            }
            return (<CommentItem key={item.id} kid={item} level={level} />);
        }).catch(() => {
            return <Text>loading failed...</Text>
        })
    }

    const handleOnPress = () => {
        if (list.length > 1) {
            setList(list.slice(0, 1));
        }
        else {
            getKids(itemId, 0).then((res) => setList(res));
        }
    }

    if (!list) return <Text style={{ heigth: 300, backgroundColor: 'red' }}>loading list</Text>
    return (
        <TouchableWithoutFeedback onPress={handleOnPress}>
            <View>
                {list}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default KidsList