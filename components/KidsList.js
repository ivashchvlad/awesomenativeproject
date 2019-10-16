import React, {useState, useEffect} from 'react';
import { getStory } from '../services/hnAPI';
import CommentItem from './CommentItem'
import {
    Text,
    View,
} from 'react-native';

function KidsList({itemId}) {
    const [list, setList] = useState([]);

    useEffect(() => {
        getKids(itemId, 0).then((res) => setList(res));
    }, []);

    //  Recursion function to get all subcomments
    const getKids = async (itemId, level) => {
        return getStory(itemId).then(async item => {
            if (item.kids) {
                let restComments = await Promise.all(item.kids.map(kid => 
                    getKids(kid, level+1)
            ));
                return [(<CommentItem key={item.id} kid={item} level={level}/>), ...restComments];
            }
            return (<CommentItem key={item.id} kid={item} level={level}/>);
        }).catch(() => {
            return <Text>loading failed...</Text>
        })
    }

    if(!list) return <Text style={{heigth: 300, backgroundColor: 'red'}}>loading list</Text>
    return (
        <View>
            {list}
        </View>
    )
}

export default KidsList