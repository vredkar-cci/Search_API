import { createContainer } from "./displayUI";

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

function displayStackOverflowResults(results, source) {
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

    let questionID = result.question_id,
      question = result.title.replace(/[^a-zA-Z0-9\-_ ]/g, '').replace(/\s/g, '-'),
      questionURL = `https://stackoverflow.com/questions/${questionID}/${question}?r=SearchResults`,
      questionScore = result.question_score ? result.question_score + ' votes' : '0 votes',
      answerCount = result.answer_count ? result.answer_count + ' Answers' : 'No Answer';

    // Create the first <div class="info">
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const smallParagraph = document.createElement('p');
    const smallText = document.createElement('small');
    smallText.textContent = questionScore;
    smallParagraph.appendChild(smallText);

    const answerCountParagraph = document.createElement('p');
    answerCountParagraph.classList.add('ans-count');
    answerCountParagraph.textContent = answerCount;

    infoDiv.appendChild(smallParagraph);
    infoDiv.appendChild(answerCountParagraph);

    // Create the second <div> for the title and excerpt
    const mainContentDiv = document.createElement('div');

    const titleHeading = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = questionURL;
    titleLink.target = '_blank';
    titleLink.textContent = result.title;
    titleHeading.appendChild(titleLink);

    const excerptParagraph = document.createElement('p');
    excerptParagraph.textContent = result.excerpt;

    mainContentDiv.appendChild(titleHeading);
    mainContentDiv.appendChild(excerptParagraph);

    card.appendChild(infoDiv);
    card.appendChild(mainContentDiv);

    column.appendChild(card);
  });
}

function displayGoogleResults(results, source) {
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

    // Create a new <div> element
    const cardContent = document.createElement('div');

    // Create an <h3> element for the title
    const titleHeading = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = result.htmlFormattedUrl;
    titleLink.target = '_blank';
    titleLink.textContent = result.htmlTitle;
    titleHeading.appendChild(titleLink);

    // Create a <p> element for the snippet
    const snippetParagraph = document.createElement('p');
    snippetParagraph.textContent = result.htmlSnippet;

    // Create another <a> element
    const link = document.createElement('a');
    link.href = result.htmlFormattedUrl;
    link.target = '_blank';
    link.textContent = result.displayLink;

    // Append the created elements to the cardContent
    cardContent.appendChild(titleHeading);
    cardContent.appendChild(snippetParagraph);
    cardContent.appendChild(link);

    // Append the cardContent to the 'card' element
    card.appendChild(cardContent);

    column.appendChild(card);
  });
}

function displayGitHubResults(results, source) {
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

    let language = result.language ? 'Language: ' + result.language : '';

    // Create a new <div> element
    const cardContent = document.createElement('div');

    // Create the <p> element for the link
    const linkParagraph = document.createElement('p');
    const link = document.createElement('a');
    link.href = result.html_url;
    link.target = '_blank';
    link.textContent = result.full_name;
    linkParagraph.appendChild(link);

    // Create the <p> element for the description
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = result.description;

    // Create the <p> element for the language
    const languageParagraph = document.createElement('p');
    const small = document.createElement('small');
    small.textContent = language;
    languageParagraph.appendChild(small);

    // Append the created elements to the cardContent
    cardContent.appendChild(linkParagraph);
    cardContent.appendChild(descriptionParagraph);
    cardContent.appendChild(languageParagraph);

    // Append the cardContent to the 'card' element
    card.appendChild(cardContent);

    column.appendChild(card);
  });
}


export { displayYouTubeResults, displayStackOverflowResults, displayGoogleResults, displayGitHubResults }

