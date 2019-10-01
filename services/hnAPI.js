import axios from 'axios';

export const baseURL = 'https://hacker-news.firebaseio.com/v0/';
export const latestURL = `${baseURL}newstories.json`
export const storyURL = `${baseURL}item/`;


export const getStory = async (storyId) => {
    return await axios.get(`${storyURL + storyId}.json`).then(({data}) => data);
}

export const getLatestStoriesId = async () => {
    return await axios.get(latestURL).then(({ data }) => data.slice(0, 10));
}
