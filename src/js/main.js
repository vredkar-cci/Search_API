import { searchYouTube } from "./fetchAPI/fetchYouTubeAPI";
import { searchStackOverflow } from "./fetchAPI/fetchStackOverflowAPI";
import { searchGoogle } from "./fetchAPI/fetchGoogleAPI ";
import { searchGitHub } from "./fetchAPI/fetchGitHubAPI";

require('dotenv').config();

// Event listener for Enter key press
document.getElementById('searchField').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    getSearchKeyword();
  }
});

document.getElementById('searchButton').addEventListener('click', function () {
  getSearchKeyword();
});

async function getSearchKeyword() {

  let keyword = document.getElementById("searchField").value;
  if (!keyword) {
    document.getElementById('errorMessage').textContent = 'Please enter a search keyword.';
    return;
  }

  // Clear any previous error message
  document.getElementById('errorMessage').textContent = '';
  document.getElementById('resultsContainer').innerHTML = "";

  // Fetch YouTube results
  await searchYouTube(keyword, 'YouTube');
  // Fetch StackOverflow results
  await searchStackOverflow(keyword, 'Stack Overflow');
  // Fetch Google results
  await searchGoogle(keyword, 'Google');
  // Fetch GitHub results
  await searchGitHub(keyword, 'GitHub');
}

