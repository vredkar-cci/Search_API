import { displayGoogleResults } from '../handleResult/GoogleResult';
import { displayError } from "../displayUI";

const maxResults = process.env.MaxResults; //Max number of results

// Function to fetch data from YouTube API
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

export { searchGoogle };
