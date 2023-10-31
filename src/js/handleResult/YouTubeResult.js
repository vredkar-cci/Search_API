import { createContainer } from "../displayUI";

function displayYouTubeResults(results, source) {
  const column = createContainer(source);
  if (results.length === 0) {
    column.classList.add("has-error");
    const cardBody = column.querySelector('.card-body');
    const textNode = document.createTextNode('No results found.');
    cardBody.appendChild(textNode);
    return;
  }

  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'result-card';

    let videoURL = `https://www.youtube.com/watch?v=${result.id.videoId}`,
      thumbnailImg = `${result.snippet.thumbnails.default.url}`,
      videoTitle = `${result.snippet.title}`,
      videoDescription = `${result.snippet.description}`;
    const link = document.createElement('a');
    link.href = videoURL;
    link.target = '_blank';
    const image = document.createElement('img');
    image.src = thumbnailImg;

    link.appendChild(image);
    card.appendChild(link);
    const contentDiv = document.createElement('div');
    const titleHeading = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = videoURL;
    titleLink.target = '_blank';
    titleLink.textContent = videoTitle;
    titleHeading.appendChild(titleLink);
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = videoDescription;

    contentDiv.appendChild(titleHeading);
    contentDiv.appendChild(descriptionParagraph);

    card.appendChild(contentDiv);

    column.appendChild(card);
  });
}

export { displayYouTubeResults }

