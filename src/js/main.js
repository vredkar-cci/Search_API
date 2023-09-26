require('dotenv').config();
import youTubeImg from '../images/icon-youtube.png';
import stackOverflowImg from '../images/icon-stackoverflow.png';
import googleImg from '../images/icon-google.png';
import gitHubImg from '../images/icon-github.png';

const maxResults = 5; //Max number of results

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
  await searchYouTube(keyword);
  // Fetch StackOverflow results
  await searchStackOverflow(keyword);
  // Fetch Google results
  await searchGoogle(keyword);
  // Fetch GitHub results
  await fetchGitHubResults(keyword);

}


// Example function to fetch data from YouTube API
async function searchYouTube(keyword) {

  const YouTubeAPIKey = process.env.YouTube_API_KEY;
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${keyword}&type=video&key=${YouTubeAPIKey}`;

  await fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        displayError('YouTube');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process and use the data
      displayYouTubeResults(data.items, 'YouTube');
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch or data processing
      console.error('Fetch Error:', error);
      displayError('YouTube');
    });
}

async function searchStackOverflow(keyword) {
  const apiUrl = `https://api.stackexchange.com/2.3/search/excerpts?pagesize=${maxResults}&order=desc&sort=relevance&q=${keyword}&site=stackoverflow`;

  await fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        displayError('Stack Overflow');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process and use the data
      displayStackOverflowResults(data.items, 'Stack Overflow');
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch or data processing
      console.error('Fetch Error:', error);
      displayError('Stack Overflow');
    });

}

async function searchGoogle(keyword) {
  const googleApiKey = process.env.Google_API_KEY;
  const googleCx = process.env.Google_ID; // Replace with your Custom Search Engine ID
  const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${keyword}&key=${googleApiKey}&cx=${googleCx}&num=${maxResults}`;

  await fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        displayError('Google');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process and use the data
      if (!data.items)
        data.items = [];
      displayGoogleResults(data.items, 'Google');
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch or data processing
      console.error('Fetch Error:', error);
      displayError('Google');
  });
}

async function fetchGitHubResults(keyword) {
  const githubAccessToken = process.env.GitHub_Access_Token; // Replace with your GitHub Access Token
  const apiUrl = `https://api.github.com/search/repositories?q=${keyword}&per_page=${maxResults}`;


  await fetch(apiUrl, {
    headers: {
      Authorization: `token ${githubAccessToken}`
    }
  })
    .then(response => {
      if (!response.ok) {
        displayError('GitHub');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Process and use the data
      if (!data.items)
        data.items = [];
      displayGitHubResults(data.items, 'GitHub');
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch or data processing
      console.error('Fetch Error:', error);
      displayError('GitHub');
    });
}


function generateCardHeader(headerImg, source) {
  // Create a div, image, and title element
  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';

  const img = document.createElement('img');
  img.src = headerImg;

  const title = document.createElement('h2');
  title.textContent = source;

  cardHeader.appendChild(img);
  cardHeader.appendChild(title);

  return cardHeader;
}

function createContainer(source) {
  const resultsContainer = document.getElementById('resultsContainer');
  const columnClass = source.toLowerCase().replace(/\s/g, '') + '-column';
  const childColumn = resultsContainer.querySelector('.' + columnClass);
  if (childColumn) {
    return (childColumn);   // Return is child already exists
  }
  const column = document.createElement('div');
  column.className = columnClass + ' result-column';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  // console.log(cardBody);

  let headerImg = '';
  switch (source) {
    case 'YouTube':
      headerImg = youTubeImg;
      break;
    case 'Stack Overflow':
      headerImg = stackOverflowImg;
      break;
    case 'Google':
      headerImg = googleImg;
      break;
    case 'GitHub':
      headerImg = gitHubImg;
      break;
    default:
      console.log(source);
  }

  const cardHeader = generateCardHeader(headerImg, source);
  column.appendChild(cardHeader);
  column.appendChild(cardBody);

  resultsContainer.appendChild(column);
  return (column);
}

function displayYouTubeResults(results, source) {
  const column = createContainer(source);
  if (results.length === 0) {
    column.classList.add("has-error");
    const cardBody = column.querySelector('.card-body');
    cardBody.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'result-card';

    let videoURL = `https://www.youtube.com/watch?v=${result.id.videoId}`,
        thumbnailImg = `${result.snippet.thumbnails.default.url}`,
        videoTitle = `${result.snippet.title}`,
        videoDescription = `${result.snippet.description}`;

    card.innerHTML = `<a href='${videoURL}' target="_blank"><img src='${thumbnailImg}'></a>
    <div><h3><a href='${videoURL}' target="_blank">${videoTitle}</a></h3><p>${videoDescription}</p></div>`;

    column.appendChild(card);
  });
}

function displayStackOverflowResults(results, source) {
  const column = createContainer(source);
  if (results.length === 0) {
    column.classList.add("has-error");
    const cardBody = column.querySelector('.card-body');
    cardBody.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'result-card';

    let questionID = result.question_id,
        question = result.title.replace(/[^a-zA-Z0-9\-_ ]/g, '').replace(/\s/g, '-'),
        questionURL = `https://stackoverflow.com/questions/${questionID}/${question}?r=SearchResults`,
        questionScore = result.question_score ? result.question_score + ' votes' : '0 votes',
        answerCount = result.answer_count ? result.answer_count + ' Answers' : 'No Answer';

    card.innerHTML = `<div class="info"><p><small>${questionScore}</small></p><p class='ans-count'>${answerCount}</p></div>
                      <div><h3><a href="${questionURL}" target="_blank">${result.title}</a></h3><p>${result.excerpt}</p></div>`;

    column.appendChild(card);
  });
}

function displayGoogleResults(results, source) {
  const column = createContainer(source);
  if (results.length === 0) {
    column.classList.add("has-error");
    const cardBody = column.querySelector('.card-body');
    cardBody.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'result-card';

    card.innerHTML = `<div><h3><a href='${result.htmlFormattedUrl}' target='_blank'>${result.htmlTitle}</a></h3><p>${result.htmlSnippet}</p><a href='${result.htmlFormattedUrl}' target='_blank'>${result.displayLink}</a></div>`;

    column.appendChild(card);
  });
}

function displayGitHubResults(results, source) {
  const column = createContainer(source);
  if (results.length === 0) {
    column.classList.add("has-error");
    const cardBody = column.querySelector('.card-body');
    cardBody.innerHTML = '<p>No results found.</p>';
    return;
  }

  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'result-card';

    let language = result.language ? 'Language: ' + result.language : '';

    card.innerHTML = `<div><p><a href='${result.html_url}' target='_blank'>${result.full_name}</a></p><p>${result.description}</p><p><small>${language}</small></p></div>`;

    column.appendChild(card);
  });
}

function displayError(source) {
  const column = createContainer(source);
  column.classList.add("has-error");
  const cardBody = column.querySelector('.card-body');
  cardBody.innerHTML = `<p>Some Error has Ocurred. Please try again later.</p>`;
}
