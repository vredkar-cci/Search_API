import { displayStackOverflowResults } from '../handleResult/StackOverflowResult';
import { displayError } from "../displayUI";

import { maxResults } from "../main";

// Function to fetch data from YouTube API
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

export { searchStackOverflow };
