import { displayYouTubeResults } from '../handleResult/YouTubeResult';
import { displayError } from "../displayUI";

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
export { searchYouTube };
