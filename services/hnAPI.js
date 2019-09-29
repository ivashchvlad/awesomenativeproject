import  axios from 'axios';

export const baseURL = 'https://hacker-news.firebaseio.com/v0/';
export const latestURL = `${baseURL}newstories.json`
export const storyURL = `${baseURL}item/`;

export const getLatestStoriesId = async () => {
    let result = await axios.get(latestURL).then(res => res.data.slice(0, 10));
    return result;
}