import React, { useState, useEffect } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import NewsList from '../components/NewsList'
import { getAskStories } from '../services/hnAPI'
import axios from 'axios'
export default function AskScreen(props) {
  const [askStories, setAskStories] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    //CancelToken cancel HTTTP request after leaving screen
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    getAskStories(source.token).then(res => setAskStories(res));
    return cleanup = () => source.cancel();
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAskStories().then(res => {
      setAskStories(res);
      setRefreshing(false);
    });
  }, [refreshing]);

  return (
      <NewsList 
        stories={askStories} 
        navigation={props.navigation}
        handleRefreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }/> 
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
