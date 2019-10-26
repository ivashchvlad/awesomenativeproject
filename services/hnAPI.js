import axios from 'axios';

export const baseURL = 'https://hacker-news.firebaseio.com/v0/';
export const latestURL = `${baseURL}newstories.json`;
export const popularURL = `${baseURL}topstories.json`;
export const askURL = `${baseURL}askstories.json`;
export const storyURL = `${baseURL}item/`;


export const getStory = async (storyId, cancelToken) => {
    return await axios.get(`${storyURL + storyId}.json`, { cancelToken: cancelToken})
        .then(({data}) => data);
}

export const getLatestStoriesId = async () => {
    return await axios.get(latestURL).then(({ data }) => data);
}

export const getPopularStoriesId = async () => {
    return await axios.get(popularURL).then(({ data }) => data);
}

export const getAskStories = async () => {
    return await axios.get(askURL).then(({data}) => data);
}

export const getKids = async (kidsId) => {
    return await kidsId.slice(0, 10).map(id => getStory(id));
}