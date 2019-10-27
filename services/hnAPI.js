import axios from 'axios';

export const baseURL = 'https://hacker-news.firebaseio.com/v0/';
export const latestURL = `${baseURL}newstories.json`;
export const popularURL = `${baseURL}topstories.json`;
export const askURL = `${baseURL}askstories.json`;
export const storyURL = `${baseURL}item/`;


export const getStory = async (storyId, cancelToken) => {
    return await axios.get(`${storyURL + storyId}.json`, { cancelToken })
        .then(({data}) => data);
}

export const getLatestStoriesId = async (cancelToken) => {
    return await axios.get(latestURL, { cancelToken }).then(({ data }) => data);
}

export const getPopularStoriesId = async (cancelToken) => {
    return await axios.get(popularURL, { cancelToken }).then(({ data }) => data);
}

export const getAskStories = async (cancelToken) => {
    return await axios.get(askURL, { cancelToken }).then(({data}) => data);
}
