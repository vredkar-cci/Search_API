import { displayYouTubeResults, displayStackOverflowResults, displayGoogleResults, displayGitHubResults } from './handleResult.js';
import { displayError } from "./displayUI";

const maxResults = process.env.MaxResults; //Max number of results

// Function to fetch data from YouTube API
async function searchYouTube(keyword, source) {

  const YouTubeAPIKey = process.env.YouTube_API_KEY;
  const YouTubeURL = process.env.YouTube_URL;
  const apiUrl = `${YouTubeURL}&maxResults=${maxResults}&q=${keyword}&key=${YouTubeAPIKey}`;
  await fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process and use the data
      displayYouTubeResults(data.items, source);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch or data processing
      console.error('Fetch Error:', error);
      displayError(source);
    });
}

async function searchStackOverflow(keyword, source) {
  const StackOverflowURL = process.env.StackOverflow_URL;
  const apiUrl = `${StackOverflowURL}&pagesize=${maxResults}&q=${keyword}`;

  await fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process and use the data
      displayStackOverflowResults(data.items, source);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch or data processing
      console.error('Fetch Error:', error);
      displayError(source);
    });

}

async function searchGoogle(keyword, source) {
  const googleApiKey = process.env.Google_API_KEY;
  const googleCx = process.env.Google_ID; // Replace with your Custom Search Engine ID
  const GoogleURL = process.env.Google_URL;
  const apiUrl = `${GoogleURL}q=${keyword}&key=${googleApiKey}&cx=${googleCx}&num=${maxResults}`;

  await fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process and use the data
      if (!data.items)
        data.items = [];
      displayGoogleResults(data.items, source);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch or data processing
      console.error('Fetch Error:', error);
      displayError(source);
    });
}

async function searchGitHub(keyword, source) {
  const GitHubURL = process.env.GitHub_URL;
  const apiUrl = `${GitHubURL}q=${keyword}&per_page=${maxResults}`;

  await fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process and use the data
      if (!data.items)
        data.items = [];
      displayGitHubResults(data.items, source);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch or data processing
      console.error('Fetch Error:', error);
      displayError(source);
    });
}

export { searchYouTube, searchStackOverflow, searchGoogle, searchGitHub };
