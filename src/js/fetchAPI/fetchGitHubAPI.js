import { displayGitHubResults } from '../handleResult/GitHubResult';
import { displayError } from "../displayUI";

import { maxResults } from "../main";

// Function to fetch data from YouTube API
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

export { searchGitHub };
