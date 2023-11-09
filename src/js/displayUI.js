import youTubeImg from '../images/icon-youtube.png';
import stackOverflowImg from '../images/icon-stackoverflow.png';
import googleImg from '../images/icon-google.png';
import gitHubImg from '../images/icon-github.png';

let sites = {
  youtube: {
    name: "YouTube",
    logo: youTubeImg,
    alt: "YouTube logo",
    url: "https://www.youtube.com"
  },
  stackoverflow: {
    name: "Stack Overflow",
    logo: stackOverflowImg,
    alt: "Stack Overflow logo",
    url: "https://stackoverflow.com"
  },
  google: {
    name: "Google",
    logo: googleImg,
    alt: "Google logo",
    url: "https://www.google.com"
  },
  github: {
    name: "GitHub",
    logo: gitHubImg,
    alt: "GitHub logo",
    url: "https://github.com/"
  }
};

function generateCardHeader(source) {
  // Create a div, image, and title element
  const siteName = source.toLowerCase().replace(/\s/g, '');
  let headerImg = "",
      siteURL = "",
      altText = "";
  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';

  // Check if the site with the given name exists in the object
  if (sites.hasOwnProperty(siteName)) {
    headerImg = sites[siteName].logo;
    altText = sites[siteName].alt;
    siteURL = sites[siteName].url;
  }

  const img = document.createElement('img');
  img.src = headerImg;
  img.alt = altText;

  const title = document.createElement('h2');
  title.textContent = source;

  const titleLink = document.createElement('a');
  titleLink.href = siteURL;
  titleLink.target = '_blank';

  titleLink.appendChild(img);
  titleLink.appendChild(title);

  cardHeader.appendChild(titleLink);

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

  const cardHeader = generateCardHeader(source);
  column.appendChild(cardHeader);
  column.appendChild(cardBody);

  resultsContainer.appendChild(column);
  return (column);
}

function displayError(source) {
  const column = createContainer(source);
  column.classList.add("has-error");
  const cardBody = column.querySelector('.card-body');
  const textNode = document.createTextNode('Some Error has Ocurred. Please try again later.');
  cardBody.appendChild(textNode);
}


export { createContainer, displayError }
