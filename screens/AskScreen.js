import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import NewsList from '../components/NewsList'
import { getAskStories } from '../services/hnAPI'

export default function AskScreen() {
  return (
    <NewsList getStories={getAskStories}/>  
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
