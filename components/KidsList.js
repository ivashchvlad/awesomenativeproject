import React, { useState, useEffect } from 'react';
import { getStory } from '../services/hnAPI';
import CommentItem from './CommentItem'
import {
    Text,
    View,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';

function KidsList({ itemId }) {
    const [list, setList] = useState([]);
    const [maxHeight, setMaxHeight] = useState(200);
    const [expanded, setExpanded] = useState(true)
    const [animVal] = useState(new Animated.Value())

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
    const handleSetMaxHeight = (event) => {
        if(event.nativeEvent.layout.height) {
            setMaxHeight(event.nativeEvent.layout.height);
        }
    }

    const tougleList = () => {
        let initialValue = expanded ? maxHeight : 10,
            finalValue = expanded ? 10 :  maxHeight;
        console.log('ok');
        setExpanded(!expanded);

        animVal.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            animVal,
            {
                toValue: finalValue
            }
        ).start();  //Step 5
    }

    if (!list) return <Text style={{ heigth: 300, backgroundColor: 'red' }}>loading list</Text>
    return (
        <TouchableWithoutFeedback
            onPress={tougleList}
            
        >
            <Animated.View style={{heigth: animVal}}>
                {list}
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

export default KidsList