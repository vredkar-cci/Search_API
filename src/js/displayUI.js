import youTubeImg from '../images/icon-youtube.png';
import stackOverflowImg from '../images/icon-stackoverflow.png';
import googleImg from '../images/icon-google.png';
import gitHubImg from '../images/icon-github.png';

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

function displayError(source) {
  const column = createContainer(source);
  column.classList.add("has-error");
  const cardBody = column.querySelector('.card-body');
  const textNode = document.createTextNode('Some Error has Ocurred. Please try again later.');
  cardBody.appendChild(textNode);
}


export { createContainer, displayError }
