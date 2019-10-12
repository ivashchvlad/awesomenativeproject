import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import NewsList from '../components/NewsList'
import { getAskStories } from '../services/hnAPI'

export default function AskScreen(props) {
  const [askStories, setAskStories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    getAskStories().then(res => setAskStories(res));
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAskStories().then(res => {
      setAskStories(res);
      setRefreshing(false);
    });
  }, [refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <NewsList stories={askStories} navigation={props.navigation}/>  
    </ScrollView>
  );
}

AskScreen.navigationOptions = {
  title: 'Ask',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
