import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  RefreshControl,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { getPopularStoriesId, getLatestStoriesId } from '../services/hnAPI'
import NewsList from '../components/NewsList'

export default function HomeScreen(props) {
  const [latestNewsIds, setLatestNewsIds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeLink, setActiveLink] = useState([true, false])

  useEffect(() => {
    if (activeLink[0]) getPopularStoriesId().then(res => setLatestNewsIds(res));
    else getLatestStoriesId().then(res => setLatestNewsIds(res));
  }, [])
  
  useEffect(()=>{
    if (activeLink[0]) {
      getPopularStoriesId().then(res => {
        setLatestNewsIds(res);
      });
    } else {
      getLatestStoriesId().then(res => {
        setLatestNewsIds(res);
      });
    }
  }, [activeLink])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (activeLink[0]) {
      getPopularStoriesId().then(res => {
        setLatestNewsIds(res);
        setRefreshing(false);
      });
    } else {
      getLatestStoriesId().then(res => {
        setLatestNewsIds(res);
        setRefreshing(false);
      });
    }

  }, [refreshing]);

  const handleOnPressPopular = () => {
    if (!activeLink[0]){
      setActiveLink([true, false])
    }
  }

  const handleOnPressNew = () => {
    if (!activeLink[1]){
      setActiveLink([false, true]);
    }
  }

  const header = (
    <View style={styles.header}>
      <View style={styles.welcomeContainer}>
        <Image
          source={
            __DEV__
              ? require('../assets/images/kylo.jpg')
              : require('../assets/images/robot-prod.png')
          }
          style={styles.welcomeImage}
        />
      </View>
      <View style={styles.getStartedContainer}>
        { /*<DevelopmentModeNotice /> */}

        <Text style={styles.getStartedText}>Hello there! How's it going?</Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <MonoText>(general Kenoby?)</MonoText>
        </View>

        <Text style={styles.getStartedText}>
          This awesome app will save your day!
            </Text>
        <Button
          onPress={() => {
            alert('You are breathtaking!');
          }}
          title="Press Me"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            onPress={handleOnPressPopular}
            color={activeLink[0] ? 'darkblue' : 'blue' }
            title="Popular"
          />
          <Button
            onPress={handleOnPressNew}
            color={activeLink[1] ? 'darkblue' : 'blue' }
            title="New"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <NewsList
          stories={latestNewsIds}
          navigation={props.navigation}
          handleRefreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          header={header}
        />
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
  },
  header: {
    backgroundColor: 'white',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 18,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
